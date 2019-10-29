import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import DefaultButtonOK from '../components/DefaultButtonOK';
import * as SyncUtil from '../components/SyncUtil';
import { AsyncStorage } from "react-native"
import * as DBUtil from '../components/DBUtil'
import { MaterialCommunityIcons } from '@expo/vector-icons';



class Sincronismo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enviar: false,
            receber: false,
            unc: false,
            erro: null,
            sucesso: null,
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
            enviar: true,
            erro: null
        })
        SyncUtil.enviar(this.state.idEquipe).then(() => {
            this.setState({
                enviar: false,
                sucesso: 'Dados enviados com sucesso!'
            })
        }).catch(e => this.setState({ enviar: false, erro: 'Não foi possível enviar os dados, tente novamente mais tarde.' }))
    }


    receber = async () => {
        this.setState({
            receber: true,
            erro: null
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
                receber: false,
                sucesso: 'Dados atualizados!'
            })
        }).catch(e => {console.error(e); this.setState({ receber: false, erro: 'Não foi possível atualizar as informações.' })})
    }

    unc = () => {
        this.setState({
            unc: true,
            erro: null
        })
        SyncUtil.itensUnc().then((res) => {
            this.setState({
                unc: false,
                sucesso: 'Tabela de UNCs atualizada!'
            })
        }).catch(e => this.setState({ unc: false, erro: 'Não foi possível atualizar as UNCs.' }))
    }

    render() {
        if (!this.state.erro && !this.state.sucesso) {
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
            )
        } else {
            const color = this.state.erro ? '#D04B3E' : '#48A9A6'

            const font = {
                width: '100%',
                fontFamily: 'OpenSans',
                fontSize: 20,
                color: color,
                textAlign: 'center',
                marginTop: '10%',
                marginBottom: '15%',
            }

            return (
                <DefaultView titulo='Sincronização'>
                    <MaterialCommunityIcons
                        name={this.state.erro ? 'alert-circle-outline' : 'checkbox-marked-circle-outline'}
                        size={80} color={color}
                        style={{
                            marginTop: '15%'
                        }} />

                    <Text style={font}>{this.state.erro ? this.state.erro : this.state.sucesso}</Text>

                    <DefaultButtonOK
                        style={{
                            width: '80%',
                            marginVertical: 10
                        }}
                        onPress={()=>this.setState({
                            erro: null,
                            sucesso: null
                        })}
                    />
                </DefaultView>
            )
        }
    }
}

export default withNavigation(Sincronismo);