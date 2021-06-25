import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View, TouchableOpacity, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';

import DefaultInput from '../components/DefaultInput';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import Item from '../components/Item';

import * as DBUtil from '../components/DBUtil'
import * as Server from '../components/ServerConfig'


import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import { EventRegister } from 'react-native-event-listeners';


class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itens: [],
            todosItens: [],
            pesquisa: '',
            loading: false,
            expanded: false,
            refreshing: true,
            fakeData: [],
            idExpanded: null
        }
    }




    componentDidMount = async () => {
        this.listener = EventRegister.addEventListener('login', () => {
            this.setState({
                pesquisa: '',
            })
            a = true;
            NetInfo.fetch().then(state => {
                this.setState({
                    loading: true
                })
                AsyncStorage.getItem('equipeId').then(equipeId => {
                    if (state.isConnected) {
                        AsyncStorage.getItem('token').then(token => {
                            Server.get('item', token).then(response => {
                                var data = {
                                    itens: response,
                                    equipeId: equipeId
                                }
                                DBUtil.saveItens(data).then(response => {
                                    DBUtil.getItens(equipeId).then((itens) => {
                                        this.setState({
                                            itens: itens,
                                            todosItens: itens,
                                            loading: false,
                                        })
                                    })
                                })
                            });
                        })

                    } else {
                        DBUtil.getItens(equipeId).then((itens) => {
                            this.setState({
                                itens: itens,
                                todosItens: itens,
                                loading: false,
                            })
                        })
                    }
                })
            })
        })
        NetInfo.fetch().then(state => {
            this.setState({
                loading: true
            })
            AsyncStorage.getItem('equipeId').then(equipeId => {
                if (state.isConnected) {
                    AsyncStorage.getItem('token').then(token => {
                        Server.get('item', token).then(response => {
                            var data = {
                                itens: response,
                                equipeId: equipeId
                            }
                            DBUtil.saveItens(data).then(response => {
                                DBUtil.getItens(equipeId).then((itens) => {
                                    this.setState({
                                        itens: itens,
                                        todosItens: itens,
                                        loading: false,
                                    })
                                })
                            })
                        });
                    })

                } else {
                    DBUtil.getItens(equipeId).then((itens) => {
                        this.setState({
                            itens: itens,
                            todosItens: itens,
                            loading: false,
                        })
                    })
                }
            })
        })
    }

    enviar = async () => {
        // sincronizar com o server
        this.setState({
            loading: true
        })
        await AsyncStorage.multiGet(['equipeId', 'token']).then(response => {
            const equipeId = response[0][1]
            let dataToSend = {
                'team': equipeId,
                'items': []
            }

            DBUtil.getItens(equipeId).then(itens => {
                itens.forEach(item => {
                    if (item.quantidade_instalada != 0 || item.quantidade_retirada != 0 || item.quantidade_substituida != 0) {
                        let data = {
                            'item': item.it_id,
                            'quantidades': {
                                'instalar': item.quantidade_instalada,
                                'retirar': item.quantidade_retirada,
                                'substituir': item.quantidade_substituida
                            }
                        }
                        dataToSend.items.push(data)
                    }
                });
                if (dataToSend.items.length === 0) {
                    Alert.alert(
                        'Erro',
                        'Por favor insira algum dado antes de enviar.',
                        [
                            { text: 'Cancelar', style: 'cancel' }
                        ],
                        { cancelable: true }
                    );
                    DBUtil.getItens(equipeId).then((itens) => {
                        this.setState({
                            itens: itens,
                            todosItens: itens,
                            loading: false,
                        })
                    })
                    return;
                }

                Server.postWithToken('activity', dataToSend, response[1][1]).then(response => {
                    DBUtil.resetQuantidades(equipeId).then(response => {
                        DBUtil.getItens(equipeId).then((itens) => {
                            this.setState({
                                itens: itens,
                                todosItens: itens,
                                loading: false,
                            })
                        })
                    })
                })
            })
        })
    }
    componentWillUnmount = () => {
        this.listener = EventRegister.removeEventListener(this.listener)
    }
    handlePressButtonEnviar = async () => {
        await NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    'Erro',
                    'É necessária a conexão com internet para enviar os dados.',
                    [
                        { text: 'Cancelar', style: 'cancel' }
                    ],
                    { cancelable: true }
                );
                return;
            } else {
                Alert.alert(
                    'Aviso',
                    'Todos os dados serão enviados, deseja prosseguir?',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Continuar', onPress: () => this.enviar() },
                    ],
                    { cancelable: true }
                );
            }
        })


    };
    handleClick = async (id) => {
        this.setState({
            idExpanded: id
        })
        if (this.state.idExpanded === id) {
            this.setState({
                idExpanded: null
            })
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.loading !== nextState.loading) {
            return true
        }
        if (this.state.itens.length !== nextState.itens.length) {
            return true
        }
        if (this.state.pesquisa !== nextState.pesquisa) {
            return true
        }
        for (let i = 0; i < this.state.itens.length; i++) {
            let item = this.state.itens[i];
            let nextItem = nextState.itens[i]
            if (item.quantidade_instalada !== nextItem.quantidade_instalada || item.quantidade_retirada !== nextItem.quantidade_retirada || item.quantidade_substituida !== nextItem.quantidade_substituida) {
                return true
            }
        }
        if (this.state.itens !== nextState.itens) {
            return true
        }
        if (this.state.idExpanded !== nextState.idExpanded) {
            return true
        }

        return false
    }
    render() {

        return (
            <View
                voltar={true}
                onFocus={this.onFocus}
                style={{
                    padding: 20
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 20
                    }}

                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{

                        }}>
                        <Feather
                            name="menu"
                            size={44}
                            color="black"
                            style={{
                                paddingRight: 185,
                            }}
                        />
                    </TouchableOpacity>
                    <DefaultButtonFlP
                        title='Enviar'
                        onPress={() => this.handlePressButtonEnviar()}
                    />


                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,

                    }}
                >

                    <DefaultInput
                        style={{
                            width: '100%',
                            height: 40,
                            paddingRight: 30

                        }}
                        value={this.state.pesquisa}
                        onChangeText={text => {
                            this.setState({
                                pesquisa: text
                            })
                            setTimeout(() => {
                                this.buscar(text)
                            }, 200)

                        }
                        }
                        placeholder={'Pesquisar...'}
                    />


                    <TouchableOpacity style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginLeft: -30,
                    }}
                        onPress={() => this.clearSearchButton()}
                    >
                        <EvilIcons name="close" size={26} color="#C4CAD0" />
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 20,
                    marginBottom: 200
                }}>
                    {this.state.loading ? <ActivityIndicator size="large" color="#EF8F3B" /> :
                        <FlatList
                            style={{
                                width: '100%',
                                marginBottom: 50,
                            }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.itens}
                            renderItem={({ item, index }) => <Item item={item} idExpanded={this.state.idExpanded} onPress={() => this.handleClick(item.it_id)} />}
                            keyExtractor={item => item.it_id + ''}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={1}
                            updateCellsBatchingPeriod={10}
                            windowSize={6}
                            initialNumToRender={4}
                            ListFooterComponent={<View style={{ height: 100 }}></View>}
                        />
                    }
                </View>
            </View>

        );
    }

    clearSearchButton = async () => {
        this.setState({
            itens: this.state.todosItens,
            pesquisa: ''
        })
    }

    buscar = async (text) => {
        var data = this.state.todosItens;
        function filterItems(query) {
            return data.filter(function (el) {
                return el.descricao.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
        }
        if (this.state.pesquisa != '') {
            var itens = filterItems(this.state.pesquisa)
            this.setState({
                itens: itens,
            })

        } else {
            this.setState({ loading: true })
            AsyncStorage.getItem('equipeId').then(equipeId => {
                DBUtil.getItens(equipeId).then((itens) => {
                    this.setState({
                        itens: itens,
                        loading: false
                    })
                })
            })
        }
    }
}


export default Items;