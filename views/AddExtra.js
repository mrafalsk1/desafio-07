import React, { Component } from 'react';
import { Text, View, FlatList, Keyboard, TouchableHighlight, Alert } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import * as SyncUtil from '../components/SyncUtil';
import DefaultInput from '../components/DefaultInput';
import DefaultButtonSearch from '../components/DefaultButtonSearch';
import * as DBUtil from '../components/DBUtil'


class AddExtra extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ponto: props.navigation.getParam('ponto'),
            pesquisa: '',
            itens: []
        }
    }

    buscar = async () => {
        Keyboard.dismiss()
        const itens = await DBUtil.buscaItens(this.state.pesquisa)
        this.setState({
            itens: itens
        })
    }

    add = async (item) => {
        const exists = await DBUtil.checkItem(item.id, this.state.ponto.ap_id)
        if (exists) {
            Alert.alert(
                'Item duplicado',
                'Este item já existe neste ponto!',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    }
                ],
                { cancelable: true }
            );
        } else {
            item.qt = 0
            item.qtr = 0
            item.operacao = null
            item.realizado = 1
            item.ponto_id = this.state.ponto.ponto_id
            item.ap_id = this.state.ponto.ap_id
            console.log("here")
            this.props.navigation.navigate('EditItem', { item: item, novo: true })
        }
    }

    render() {
        return (
            
            <DefaultView titulo='Adicionar Extra' voltar={true}>
            {// tela de adicionar
            }

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
                <FlatList
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                    showsVerticalScrollIndicator={false}
                    data={this.state.itens}
                    
                    renderItem={({ item }) =>
                    
                        <TouchableHighlight
                            activeOpacity={0.5}
                            underlayColor='#FAFAFA'
                            onPress={() => this.add(item)}
                        >
                            <Text style={{ fontFamily: 'OpenSans', fontSize: 16, color: '#4B4B46', marginVertical: 5 }}>
                                {item.descricao}
                            </Text>
                        </TouchableHighlight>}
                
                />
                
            </DefaultView>
        );
    }
}

export default withNavigation(AddExtra);