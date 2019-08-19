import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import Titulo from '../components/Titulo';
import DefaultInput from '../components/DefaultInput';
import DefaultButtonGrP from '../components/DefaultButtonGrP';
import * as Server from '../components/ServerConfig';
import styles from '../assets/js/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from "react-native"

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipe: '',
            senha: '',
            erro: false,
            loading: false
        }
    }

    login = () => {
        console.log('logando')
        this.setState({
            erro: false,
            loading: true
        })
        Server.post('equipe/login',
            { equipe: this.state.equipe, senha: this.state.senha })
            .then(json => {
                this.setState({
                    loading: false
                })

                if (json.status) {
                    console.log('LOGOU')
                    this.saveLogin().then(() => {
                        this.props.navigation.navigate('Home')
                    })

                } else {
                    this.setState({
                        erro: true
                    })
                }
            })
    }

    saveLogin = async () => {
        try {
            login = {
                equipe: this.state.equipe,
                senha: this.state.senha
            }

            return AsyncStorage.setItem('login', JSON.stringify(login))
        } catch (e) { }
    }

    onFocus = () => {
        this.setState({
            equipe: '',
            senha: '',
            erro: false,
            loading: false
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid scrollEnabled
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={50}
                contentContainerStyle={{
                    ...styles.defaultPadding,
                    ...styles.defaultBgColor,
                    flexGrow: 1,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}>

                <NavigationEvents
                    onDidFocus={this.onFocus}
                />

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
                        value={this.state.senha}
                        onChangeText={text => {
                            this.setState({
                                senha: text
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
            </KeyboardAwareScrollView>
        );
    }
}

export default withNavigation(Login);