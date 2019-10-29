import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import TopMenuBar from './TopMenuBar';
import styles from '../assets/js/Styles';
import { AsyncStorage } from "react-native";
import * as DBUtil from './DBUtil';


export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    navigateToScreen = (route) => (
        () => {
            // const navigateAction = NavigationActions.navigate({
            //     routeName: route,
            //     params: params
            // });
            // this.props.navigation.dispatch(navigateAction);
            this.props.navigation.navigate(route)
        }
    )

    sair = () => {
        Alert.alert(
            'Aviso',
            'Todos os dados locais serão removidos, deseja prosseguir?',
            [
                { text: 'Cancelar', style: 'cancel'},
                { text: 'OK', onPress: () => this.clear() },
            ],
            { cancelable: true }
        );
    }

    clear = async () => {

        await AsyncStorage.clear()
        await DBUtil.deleteNotas();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFF'
            }}>
                <TopMenuBar version={true}/>

                <View style={{
                    ...styles.defaultPadding,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingTop: 30,

                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.navigateToScreen('Notas')}>
                            <Text style={styles.menu}>Notas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.navigateToScreen('Sincronismo')}>
                            <Text style={styles.menu}>Sincronização</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',

                        paddingBottom: 30,
                    }}>
                        <Text style={styles.menuEquipe}>{global.equipe}</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.sair}>
                            <Text style={styles.menu}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}