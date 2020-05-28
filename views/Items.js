import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View, Keyboard } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import Item from '../components/Item';
import styles from '../assets/js/Styles';
import * as DBUtil from '../components/DBUtil'
import DefaultButtonSearch from '../components/DefaultButtonSearch';
import DefaultInput from '../components/DefaultInput';



class Notas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itens: [],
            todosItens: [],
            pesquisa: '',
            loading: false
        }
    }


    onFocus = () => {
        this.setState({ loading: true })

        DBUtil.getItensPonto(this.props.navigation.getParam('ponto').ap_id).then((itens) => {
            itens.forEach(i => {
                i.key = i.id + '' + i.operacao
            });

            this.setState({ itens: itens, loading: false, todosItens: itens })
        })
    }


    render() {
        return (
            <DefaultView
                titulo={this.props.navigation.getParam('ponto').descricao}
                voltar={true}
                onFocus={this.onFocus}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 10
                    }}
                >
                    <DefaultInput
                        style={{
                            width: '70%',
                            marginRight: '5%'
                        }}
                        value={this.state.pesquisa}
                        onChangeText={text => this.setState({
                            pesquisa: text
                        })}

                    />
                    <DefaultButtonSearch
                        style={{
                            width: '25%'
                        }}
                        onPress={this.buscar}
                    />
                </View>
                {this.state.loading ?
                    <ActivityIndicator size="large" color="#EF8F3B" /> :
                    <FlatList
                        style={{
                            width: '100%',
                        }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.itens}
                        renderItem={({ item }) => <Item item={item} />}
                        ListFooterComponent={<View style={{ height: 100 }}></View>}
                    />
                }
                <DefaultButtonFlP
                    title='Adicionar Extra'
                    style={{
                        width: '80%',
                        position: 'absolute',
                        bottom: 0,
                        marginBottom: 20
                    }}
                    onPress={() => this.props.navigation.navigate('AddExtra', { ponto: this.props.navigation.getParam('ponto') })}
                />



            </DefaultView>
        );
    }


    buscaDB () {
        DBUtil.getItensPonto(this.props.navigation.getParam('ponto').ap_id).then((itens) => {
            itens.forEach(i => {
                i.key = i.id + '' + i.operacao
            });

            this.setState({ itens: itens})
        })
    }

    buscar = async () => {
        Keyboard.dismiss()
        data = this.state.todosItens
        function filterItems(query) {
            return data.filter(function (el) {
                return el.descricao.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
        }
        if (this.state.pesquisa != '') {
            itens = filterItems(this.state.pesquisa.toString())
            console.log(this.state.pesquisa.toString())

            this.setState({
                itens: itens
            })
            console.log(itens.toString())

        } else {
            this.setState({ loading: true })
            console.log(this.state.pesquisa.toString() + "aa")
            DBUtil.getItensPonto(this.props.navigation.getParam('ponto').ap_id).then((itens) => {
                itens.forEach(i => {
                    i.key = i.id + '' + i.operacao
                });
    
                this.setState({ itens: itens, loading: false})
            })
        }

    }
}

export default withNavigation(Notas);