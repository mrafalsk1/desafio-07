import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners'

import * as RootNavigation from '../assets/js/RootNavigation'
import styles from '../assets/js/Styles';

import { SimpleLineIcons } from '@expo/vector-icons';
import Constants from "expo-constants"




export default class CustomDrawer extends Component {



    constructor(props) {
        super(props);

        this.state = {
            descricao: '',
            responsavel: '',
        }
    }
    componentDidMount = () => {
        this.listener = EventRegister.addEventListener('login', () => {
            AsyncStorage.multiGet(['descricao', 'responsavel']).then(response => {
                var descricao = response[0][1]
                var responsavel = response[1][1]
                this.setState({
                    descricao: descricao,
                    responsavel: responsavel
                })
            })
        })
        AsyncStorage.multiGet(['descricao', 'responsavel']).then(response => {
            var descricao = response[0][1]
            var responsavel = response[1][1]
            this.setState({
                descricao: descricao,
                responsavel: responsavel
            })
        })
    }
    componentWillUnmount = () => {
        this.listener = EventRegister.removeEventListener(this.listener)
    }

    sair = () => {
        Alert.alert(
            'Aviso',
            'Todos os dados locais serão removidos, deseja prosseguir?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'OK', onPress: () => this.clear() },
            ],
            { cancelable: true }
        );
    }

    clear = async () => {

        await AsyncStorage.clear()
        RootNavigation.navigate('Login')



    }

    render() {
        const version = Constants.manifest.version
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFF'
                }}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Text style={styles.menuEquipe}>Equipe</Text>
                    <Text style={styles.menuEquipeName}>{this.state.descricao ? this.state.descricao : null}</Text>
                    <Text style={styles.menuEquipeResp}>{this.state.responsavel ? this.state.responsavel : null}</Text>
                </View>
                <View style={{
                    ...styles.defaultPadding,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',

                }}>

                    <View style={{
                        flex: 1,
                    }}>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',

                        paddingBottom: 30,
                    }}>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.clear}
                        >
                            <SimpleLineIcons name="logout" size={24} color="black" style={{
                                marginRight: -10
                            }} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress=

                            {this.clear}>
                            <Text style={styles.menu}>Sair</Text>

                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flexDirection: 'column',
                        margin: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Text style={styles.menuVersion}>Versão {version}</Text>
                    </View>
                </View>
            </View>
        )
    }
}