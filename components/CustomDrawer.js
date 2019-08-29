import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import TopMenuBar from './TopMenuBar';
import styles from '../assets/js/Styles';
import { AsyncStorage } from "react-native";


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

    sair = async () => {
        await AsyncStorage.clear().then(() => {
            console.log('CLEARED')
            // this.navigateToScreen('Login')
            this.props.navigation.navigate('Login')
        })

    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFF'
            }}>
                <TopMenuBar />

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
                        flex: 2,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        width: '100%',

                        paddingBottom: 30
                    }}>
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