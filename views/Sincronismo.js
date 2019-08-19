import React, { Component } from 'react';
import { Text, View, Image, Animated, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import * as SyncUtil from '../components/SyncUtil';


class Sincronismo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enviar: false,
            receber: false,
            unc: false
        }
    }

    enviar = () => {
        this.setState({
            enviar: true
        })
        SyncUtil.sync().then(() => {
            this.setState({
                enviar: false
            })
        })
    }

    receber = () => {
        this.setState({
            receber: true
        })
        SyncUtil.sync().then(() => {
            this.setState({
                receber: false
            })
        })
    }

    unc = () => {
        this.setState({
            unc: true
        })
        SyncUtil.sync().then(() => {
            this.setState({
                unc: false
            })
        })
    }

    render() {
        return (
            <DefaultView titulo='Sincronização'>
                <DefaultButtonFlP
                    title='Enviar Dados'
                    style={{
                        width: '80%',
                        marginVertical: 10
                    }}
                    onPress={this.enviar}
                    loading={this.state.enviar}
                />
                <DefaultButtonFlP
                    title='Receber Dados'
                    style={{
                        width: '80%',
                        marginVertical: 10
                    }}
                    onPress={this.receber}
                    loading={this.state.receber}
                />

                <DefaultButtonFlP
                    title='Atualizar UNCs'
                    style={{
                        width: '80%',
                        marginVertical: 10
                    }}
                    onPress={this.unc}
                    loading={this.state.unc}
                />
            </DefaultView>
        );
    }
}

export default withNavigation(Sincronismo);