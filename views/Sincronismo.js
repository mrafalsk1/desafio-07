import React, { Component } from 'react';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import * as SyncUtil from '../components/SyncUtil';
import { AsyncStorage } from "react-native"
import * as DBUtil from '../components/DBUtil'



class Sincronismo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enviar: false,
            receber: false,
            unc: false,
            idEquipe: null
        }
    }

    componentDidMount = async () => {
        let login = await AsyncStorage.getItem('login')
        if (login) {
            login = JSON.parse(login)
            this.setState({
                idEquipe: login.id
            })
        }
    }


    enviarCheck = async () => {
        const temposAbertos = await DBUtil.hasTemposAbertos()
        if (temposAbertos) {
            Alert.alert(
                'Alerta de Tempos Abertos',
                'Existem tempos em aberto. Eles serão automaticamente encerrados e enviados, deseja prosseguir?',
                [
                    { text: 'Cancelar', style: 'cancel', onPress: () => this.setState({ enviar: false }) },
                    { text: 'OK', onPress: () => this.enviar() },
                ],
                { cancelable: true }
            );
        } else {
            this.enviar()
        }
    }

    enviar = () => {
        this.setState({
            enviar: true
        })
        SyncUtil.enviar(this.state.idEquipe).then(() => {
            this.setState({
                enviar: false
            })
        })
    }


    receber = async () => {
        this.setState({
            receber: true
        })
        const dadosNaoSincronizados = await DBUtil.hasItensSinc()
        if (dadosNaoSincronizados) {
            Alert.alert(
                'Alerta',
                'Existem dados locais NÃO ENVIADOS que serão perdidos, deseja prosseguir?',
                [
                    {
                        text: 'Cancelar', style: 'cancel', onPress: () => this.setState({ receber: false })
                    },
                    { text: 'OK', onPress: () => this.receberMESMO() },
                ],
                { cancelable: true }
            );
        } else {
            this.receberMESMO()
        }
    }

    receberMESMO = () => {
        SyncUtil.receber(this.state.idEquipe).then(() => {
            this.setState({
                receber: false
            })
        })
    }

    unc = () => {
        this.setState({
            unc: true
        })
        SyncUtil.itensUnc().then((res) => {
            this.setState({
                unc: false
            })
        })
    }

    render() {
        return (
            <DefaultView titulo='Sincronização'>
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
                    title='Enviar Dados'
                    style={{
                        width: '80%',
                        marginVertical: 10
                    }}
                    onPress={this.enviarCheck}
                    loading={this.state.enviar}
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