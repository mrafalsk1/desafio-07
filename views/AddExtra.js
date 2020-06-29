import React, { Component, useState } from 'react';
import { Text, View, FlatList, Keyboard, TouchableHighlight, Alert, Picker } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import * as SyncUtil from '../components/SyncUtil';
import DefaultInput from '../components/DefaultInput';
import DefaultButtonSearch from '../components/DefaultButtonSearch';
import * as DBUtil from '../components/DBUtil';


class AddExtra extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ponto: props.navigation.getParam('ponto'),
            pesquisa: '',
            itens: [],
            selectedValue: '',
            itensTemp: [],
            selectedList: [],

        }
    }

    buscar = async () => {
        Keyboard.dismiss()
        this.buscarCategorias()
        if (this.state.selectedValue === 'TODAS') {
            const itens = await DBUtil.buscaItens(this.state.pesquisa)
            this.setState({
                itens: itens
            })
        } else if (this.state.selectedValue != 'TODAS' & this.state.pesquisa != '') {
            const itens = await DBUtil.buscaPorCategoriasFiltro(this.state.pesquisa, this.state.selectedValue)
            this.setState({
                itens: itens
            })
        }
        else {
            const itens = await DBUtil.buscaPorCategorias(this.state.selectedValue)
            this.setState({
                itens: itens
            })
        }
        /// Adidionar busca por categoria e tipo de item
    }

    onFocus = () => {
        console.log(this.state.selectedValue)
        if (this.state.selectedValue === '' ) { 
            console.log("this.state.selectedValue")
        this.buscarCategorias()
    }
}

    buscarCategorias = async () => {
        const itens = await DBUtil.buscaCategorias()
        const distinctCat = Array.from(new Set(itens.map(x => x.categoria)));
        //console.log(distinctCat)
        //distinctCat.sort();
        this.setState({
            selectedList: distinctCat,
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
            this.props.navigation.navigate('EditItem', { item: item, novo: true })
        }
    }

    render() {
        return (
            <DefaultView titulo='Adicionar Extra'
                voltar={true}
                onFocus={this.onFocus}
            >
                <View style={{
                    flexDirection: "row",
                    marginBottom: 10
                }}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        style={{ height: 40, width: 300 }}
                        onValueChange={(itemValue) =>
                            this.setState({
                                selectedValue: itemValue
                            })
                        } >
                        {this.state.selectedList.map((item, index) => {
                            if (item != null) {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            } else {
                                return (<Picker.Item label="TODAS CATEGORIAS" value="TODAS" key={index} />)
                            }
                        })}
                    </Picker>

                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 10
                    }}
                >
                    <DefaultInput value="Submit"
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