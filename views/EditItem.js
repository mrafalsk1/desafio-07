import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlC from '../components/DefaultButtonFlC';
import * as SyncUtil from '../components/SyncUtil';
import DefaultInput from '../components/DefaultInput';


class EditItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.navigation.getParam('item')
        }
    }

    save = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        return (
            <DefaultView
                titulo='Editar Item'
                voltar={true}
            >
                <View style={{flex:1, alignItems: 'stretch', width: '100%' }}>
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

                    <Text style={{
                        fontFamily: 'OpenSans',
                        fontSize: 18,
                        color: '#4B4B46',
                        marginVertical: 10
                    }}>Previsto: {this.state.item.previsto}</Text>

                    <Text style={{
                        fontFamily: 'OpenSans',
                        fontSize: 18,
                        color: '#4B4B46',
                    }}>Realizado</Text>
                    <DefaultInput
                        style={{
                            marginVertical: 5
                        }}
                        keyboardType='numeric'
                        value={ String(this.state.item.realizado ? this.state.item.realizado : this.state.item.previsto) }
                        onChangeText={text => {
                            item = this.state.item
                            item.realizado = Number(text)
                            this.setState({
                                item: item
                            })
                        }}
                    />
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
            </DefaultView>
        );
    }
}

export default withNavigation(EditItem);