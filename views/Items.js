import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View, Keyboard, Text, TouchableOpacity, TouchableHighlight, Animated, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';

import DefaultButtonSearch from '../components/DefaultButtonSearch';
import DefaultInput from '../components/DefaultInput';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import Item from '../components/Item';

import * as DBUtil from '../components/DBUtil'
import * as Server from '../components/ServerConfig'


import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { Provider } from 'react-redux'
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
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        //     console.log('a');
        //     AsyncStorage.getItem('token').then((token) => {
        // NetInfo.fetch().then(state => {
        //     if (state.isConnected) {
        //         //baixar os itens do banco
        //         Server.get('item', token).then(response => {
        //             console.log('server');
        //             DBUtil.saveItens(response).then(response => {
        //                 console.log(response);


        //             })
        //         });
        //             } else {
        //                 DBUtil.getItens().then((itens) => {
        //                     this.setState({
        //                         itens: itens,
        //                         todosItens: itens,
        //                         loading: false
        //                     })
        //                 })
        //             }
        //         })
        //     })
        // })
        console.log('r');
        let a = false
        this.listener = EventRegister.addEventListener('login', () => {
            this.setState({
                pesquisa: '',
            })
            console.log('aaa');
            a = true;
            NetInfo.fetch().then(state => {
                this.setState({
                    loading: true
                })
                console.log('?dsa');
                AsyncStorage.getItem('equipeId').then(equipeId => {
                    console.log('?');
                    console.log(equipeId);
                    if (state) {
                        if (this.props.route.params) {
                            console.log('aqul pelo login');
                            this.setState({
                                itens: this.props.route.params.itens,
                                todosItens: this.props.route.params.itens,
                                loading: false
                            })
                            console.log('passo');
                        } else {
                            AsyncStorage.getItem('token').then(token => {
                                Server.get('item', token).then(response => {
                                    var data = {
                                        itens: response,
                                        equipeId: equipeId
                                    }
                                    DBUtil.saveItens(data).then(response => {
                                        console.log(response);
                                        DBUtil.getItens(equipeId).then((itens) => {
                                            console.log(itens[0]);
                                            this.setState({
                                                itens: itens,
                                                todosItens: itens,
                                                loading: false,
                                            })
                                        })
                                    })
                                });
                            })
                        }
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
        console.log('kowalski relatório');
        console.log(a);
        NetInfo.fetch().then(state => {
            this.setState({
                loading: true
            })
            console.log('?dsa');
            AsyncStorage.getItem('equipeId').then(equipeId => {
                console.log('?');
                console.log(equipeId);
                if (state) {
                    if (this.props.route.params) {
                        console.log('aqul pelo login');
                        this.setState({
                            itens: this.props.route.params.itens,
                            todosItens: this.props.route.params.itens,
                            loading: false
                        })
                        console.log('passo');
                    } else {
                        AsyncStorage.getItem('token').then(token => {
                            Server.get('item', token).then(response => {
                                var data = {
                                    itens: response,
                                    equipeId: equipeId
                                }
                                DBUtil.saveItens(data).then(response => {
                                    console.log(response);
                                    DBUtil.getItens(equipeId).then((itens) => {
                                        console.log(itens[0]);
                                        this.setState({
                                            itens: itens,
                                            todosItens: itens,
                                            loading: false,
                                        })
                                    })
                                })
                            });
                        })
                    }
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

        // NetInfo.fetch().then(state => {
        //     this.setState({
        //         loading: true
        //     })
        //     console.log('?dsa');
        //     AsyncStorage.getItem('equipeId').then(equipeId => {
        //         console.log('?');
        //         console.log(equipeId);
        //         if (state) {
        //             if (this.props.route.params) {
        //                 console.log('aqul pelo login');
        //                 this.setState({
        //                     itens: this.props.route.params.itens,
        //                     todosItens: this.props.route.params.itens,
        //                     loading: false
        //                 })
        //                 console.log('passo');
        //             } else {
        //                 AsyncStorage.getItem('token').then(token => {
        //                     Server.get('item', token).then(response => {
        //                         var data = {
        //                             itens: response,
        //                             equipeId: equipeId
        //                         }
        //                         console.log(response);
        //                         DBUtil.saveItens(data).then(response => {
        //                             console.log('aa');
        //                             DBUtil.getItens(equipeId).then((itens) => {
        //                                 this.setState({
        //                                     itens: itens,
        //                                     todosItens: itens,
        //                                     loading: false,
        //                                 })
        //                             })
        //                         })
        //                     });
        //                 })
        //             }
        //         } else {
        //             DBUtil.getItens(equipeId).then((itens) => {
        //                 this.setState({
        //                     itens: itens,
        //                     todosItens: itens,
        //                     loading: false,
        //                 })
        //             })
        //         }
        //     })
        // })





        // console.log(this.props.route.params.itens);
        //  this.setState({
        //      itens: this.props.route.params.itens,
        //      todosItens: this.props.route.params.itens,
        //      loading: false
        //  })

    }

    // DBUtil.getQuantidades().then((itens) => {
    //     console.log(itens[0]);
    //     this.setState({
    //         itens: itens
    //     })

    // })

    enviar = async () => {
        // sincronizar com o server
        this.setState({
            loading: true
        })
        await AsyncStorage.multiGet(['equipeId', 'token']).then(response => {
            console.log(response[0][1] + '  -----------------------');
            const equipeId = response[0][1]
            let dataToSend = {
                'team': equipeId,
                'items': []
            }
            console.log('enviar');

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
                        console.log(data);
                        dataToSend.items.push(data)
                    }
                });
                // if (dataToSend.itens.length === 0) {
                //     console.log('bom dia e cia');
                //     Alert.alert(
                //         'Erro',
                //         'Por favor insira algum dado antes de enviar.',
                //         [
                //             { text: 'Cancelar', style: 'cancel' }
                //         ],
                //         { cancelable: true }
                //     );
                //     DBUtil.getItens(equipeId).then((itens) => {
                //         console.log(itens[0]);
                //         this.setState({
                //             itens: itens,
                //             todosItens: itens,
                //             loading: false,
                //         })
                //     })
                //     return;
                // }
                console.log('+++++++++++++++');
                console.log(dataToSend);
                Server.postWithToken('activity', dataToSend, response[1][1]).then(response => {
                    console.log(':)');
                    console.log(response);
                    DBUtil.resetQuantidades(equipeId).then(response => {
                        console.log(response);
                        DBUtil.getItens(equipeId).then((itens) => {
                            console.log(itens[0]);
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


        Alert.alert(
            'Aviso',
            'Todos os dados serão enviados, deseja prosseguir?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Continuar', onPress: () => this.enviar() },
            ],
            { cancelable: true }
        );

    };
    handleClick = async (id) => {
        // console.log('jidsajdiajosd');
        // let { item, index } = await this.state.itens.find((item, index, a) => {
        //     if (item.it_id === id) {
        //         console.log(index);
        //         console.log(item);
        //         return { item, index };
        //     }
        // })
        // console.log(item);
        // console.log(index);

        this.setState({
            idExpanded: id
        })
        if (this.state.idExpanded === id) {
            this.setState({
                idExpanded: null
            })
        }
        // this.state.itens.forEach(item => {
        //     if (item.it_id === id) {
        //         console.log(item.quantidade_instalada);
        //         item.expanded = !item.expanded;
        //         this.setState({
        //             item: item
        //         })
        //     } else {
        //         item.expanded = false;
        //     }

        // });

    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState);
    //     console.log(this.state);
    //     if (this.state.loading !== nextState.loading) {
    //         return true
    //     }
    //     if (this.state.itens.length !== nextState.itens.length) {
    //         return true
    //     }
    //     if (this.state.pesquisa !== nextState.pesquisa) {
    //         return true
    //     }
    //     for (let i = 0; i < this.state.itens.length; i++) {
    //         let item = this.state.itens[i];
    //         let nextItem = nextState.itens[i]
    //         if (item.quantidade_instalada !== nextItem.quantidade_instalada || item.quantidade_retirada !== nextItem.quantidade_retirada || item.quantidade_substituida !== nextItem.quantidade_substituida) {
    //             return true
    //         }
    //     }
    //     if (this.state.itens !== nextState.itens) {
    //         return true
    //     }
    //     if (this.state.idExpanded !== nextState.idExpanded) {
    //         return true
    //     }

    //     return false
    // }

    // onFocus = () => {
    //     console.log(this.state.itens.length);
    //     if (this.state.itens.length === 0) {
    //         this.setState({ loading: true })

    //         DBUtil.getItens().then((itens) => {
    //             console.log(itens[0]);
    //             this.setState({
    //                 itens: itens,
    //                 todosItens: itens,
    //                 loading: false,
    //             })
    //         })
    //     }
    // }

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
                    {/* <DefaultButtonSearch
                        style={{
                            marginLeft: '5%',
                        }}
                        onPress={this.buscar}
                    /> */}
                </View>
                {/* <MateriaElCommunityIcons name="logout-variant" size={40} color="#EF8F3B" /> */}

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
                            renderItem={({ item, index }) => <Item item={item} idExpanded={this.state.idExpanded} index={index} onPress={() => this.handleClick(item.it_id)} />}
                            keyExtractor={item => item.it_id + ''}
                            // getItemLayout={(data, index) => (
                            //     { length: 60, offset: 100 * index, index }
                            // )}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={4
                            }
                            windowSize={4}
                            initialNumToRender={4}
                            ListFooterComponent={<View style={{ height: 100 }}></View>}
                        />
                    }
                </View>
            </View>

        );
    }


    // buscaDB() {
    //     DBUtil.getItensPonto(this.props.navigation.getParam('ponto').ap_id).then((itens) => {
    //         itens.forEach(i => {
    //             i.key = i.id + '' + i.operacao
    //         });

    //         this.setState({ itens: itens })
    //     })
    // }

    clearSearchButton = async () => {
        this.setState({
            itens: this.state.todosItens,
            pesquisa: ''
        })
    }

    buscar = async (text) => {
        var data = this.state.todosItens;
        console.log(this.state.pesquisa);
        console.log(text);
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