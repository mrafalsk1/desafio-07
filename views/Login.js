import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Titulo from '../components/Titulo';
import DefaultInput from '../components/DefaultInput';
import DefaultButtonGrP from '../components/DefaultButtonGrP';

import * as Server from '../components/ServerConfig';

import styles from '../assets/js/Styles';

import { EventRegister } from 'react-native-event-listeners'
import NetInfo from '@react-native-community/netinfo';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipe: '',
            password: '',
            erro: false,
            loading: false
        }
    }
    componentDidMount = () => {
    }
    login = async () => {

        await NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    'Erro',
                    'É necessária a conexão com interet para fazer o login',
                    [
                        { text: 'Cancelar', style: 'cancel' }
                    ],
                    { cancelable: true }
                );
                return;
            } else {
                this.setState({
                    erro: false,

                    loading: true
                })
                Server.post('auth/app',
                    { equipe: this.state.equipe, password: this.state.password })
                    .then(json => {
                        if (json.token) {
                            this.saveLogin(json.equipe, json.equipe._id, json.token).then(() => {
                                this.setState({
                                    equipe: '',
                                    password: '',
                                    loading: false
                                })
                                this.props.navigation.navigate('Items')
                            })
                        } else {
                            this.setState({
                                erro: true,
                                loading: false
                            })
                        }
                    })
            }
        })

    }

    saveLogin = async (equipe, id, token) => {
        try {
            user = {
                equipe: equipe,
                password: this.state.password,
                id: id,
            }
            AsyncStorage.setItem('responsavel', equipe.responsavel)
            AsyncStorage.setItem('descricao', equipe.descricao)
            AsyncStorage.setItem('token', token)
            AsyncStorage.setItem('equipeId', id)
            EventRegister.emit('login')
            return;
        } catch (e) { }
    }

    onFocus = () => {
        this.setState({
            equipe: '',
            password: '',
            erro: false,
            loading: false
        })
    }
    render() {

        return (
            <ScrollView
                contentContainerStyle={{
                    ...styles.defaultPadding,
                    ...styles.defaultBgColor,
                    flexGrow: 1,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }
                }
                keyboardShouldPersistTaps={'handled'}
                minimumZoomScale={2}
                keyboardDismissMode={'on-drag'}

            >


                <Titulo style={{ marginTop: 100 }}>Login</Titulo>

                <View style={{
                    marginTop: 30,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: 25
                }}>
                    <View style={{
                        alignItems: 'center',
                        width: '100%',
                        marginVertical: 50
                    }}>
                        <Image
                            style={{ height: 30, width: 200, margin: 'auto' }}
                            source={require('../assets/images/logo.png')}
                        />
                    </View>

                    <Text style={{
                        fontFamily: 'OpenSans',
                        fontSize: 18,
                        color: '#4B4B46',
                    }}>Equipe</Text>
                    <DefaultInput
                        style={{
                            marginVertical: 5
                        }}
                        value={this.state.equipe}
                        autoCapitalize='characters'
                        onChangeText={text => {
                            this.setState({
                                equipe: text
                            })
                        }}
                    />

                    <Text style={{
                        fontFamily: 'OpenSans',
                        fontSize: 18,
                        color: '#4B4B46',
                        marginTop: 20
                    }}>Senha</Text>
                    <DefaultInput
                        secureTextEntry={true}
                        style={{
                            marginVertical: 5
                        }}
                        value={this.state.password}
                        onChangeText={text => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    {
                        this.state.erro ?
                            <Text style={{
                                fontFamily: 'OpenSans',
                                fontSize: 18,
                                color: 'red',
                                marginTop: 20
                            }}>Equipe ou senha incorretos</Text>
                            : null
                    }

                    <View style={{ alignItems: 'center' }}>
                        <DefaultButtonGrP
                            title='Fazer Login'
                            onPress={this.login}
                            loading={this.state.loading}
                            style={{
                                marginVertical: 30,
                                width: '80%'
                            }} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default Login;