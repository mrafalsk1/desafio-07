import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlC from '../components/DefaultButtonFlC';
import * as SyncUtil from '../components/SyncUtil';
import DefaultInput from '../components/DefaultInput';
import * as DBUtil from '../components/DBUtil'
import SwitchSelector from "react-native-switch-selector"


class EditItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.navigation.getParam('item'),
            novo: this.props.navigation.getParam('novo')
        }
    }

    save = async () => {
        if (this.state.item.qtr > 0) {
            if (!this.state.novo) {
                await DBUtil.setItemRealizado(this.state.item)
                this.props.navigation.goBack()
            } else {
                await DBUtil.addItemRealizado(this.state.item)
                this.props.navigation.pop(1)
                // adicionar notificação que foi adicionado ou não limpar a tela
            }
        }
    }

    render() {
        return (
            <DefaultView
                titulo='Editar Item'
                voltar={true}
            >
                <View style={{ flex: 1, alignItems: 'stretch', width: '100%' }}>
                    <Text
                        style={{
                            fontFamily: 'OpenSans-Bold',
                            fontSize: 18,
                            color: '#4B4B46',
                            textAlign: 'left',
                            marginBottom: 10
                        }}
                    >
                        {this.state.item.descricao}
                    </Text>

                    {this.state.item.qt ?
                        <Text style={{
                            fontFamily: 'OpenSans',
                            fontSize: 18,
                            color: '#4B4B46',
                            marginVertical: 10
                        }}>Previsto {this.state.item.operacao}: {this.state.item.qt}</Text> : null}

                    < Text style={{
                        fontFamily: 'OpenSans',
                        fontSize: 18,
                        color: '#4B4B46',
                    }}>{this.state.item.qt ? 'Realizado' : 'Quantidade'}</Text>

                    <DefaultInput
                        style={{
                            marginVertical: 10
                        }}
                        keyboardType='numeric'
                        // value={ String(this.state.item.qtr ? this.state.item.qtr : this.state.item.qt) }
                        value={this.state.item.qtr ? String(this.state.item.qtr) : null}
                        onChangeText={text => {
                            item = this.state.item
                            item.qtr = Number(text)
                            this.setState({
                                item: item
                            })
                        }}
                    />

                    {this.state.novo ?
                        <SwitchSelector
                            style={{
                                marginVertical: 5
                            }}
                            hasPadding
                            buttonColor='#EF8F3B'
                            borderColor='#E4DFDA'
                            textStyle={{ fontFamily: 'OpenSans', fontSize: 16 }}
                            selectedTextStyle={{ fontFamily: 'OpenSans', fontSize: 16 }}
                            initial={this.state.item.operacao == 'RETIRAR' ? 1 : 0}
                            options={[
                                { label: "Instalar", value: "INSTALAR" },
                                { label: "Retirar", value: "RETIRAR" }
                            ]}
                            onPress={value => {
                                item = this.state.item
                                item.operacao = value
                                this.setState({
                                    item: item
                                })
                            }}
                        />
                        : null}
                </View>

                <DefaultButtonFlC
                    title='Confirmar'
                    style={{
                        width: '80%',
                        marginVertical: 'auto',
                        marginBottom: 20
                    }}
                    onPress={this.save}
                />
            </DefaultView >
        );
    }
}

export default withNavigation(EditItem);