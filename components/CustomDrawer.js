import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import TopMenuBar from './TopMenuBar';


export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    navigateToScreen = (route, params) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route,
                params: params
            });
            this.props.navigation.dispatch(navigateAction);
        })

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <TopMenuBar color='#FFFFFF' />

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Início</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', maxHeight: 150, padding: 20, paddingBottom: 20 }}>
                    <View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.navigateToScreen('CadCli', { semMenu: false })}>
                            <Text>Sair</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {this.state.empresa.facebook ? <View>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(this.state.empresa.facebook)}>
                                <AntDesign name='facebook-square' size={45} color='#FFFFFF' />
                            </TouchableOpacity>
                        </View>
                            : null}
                        {this.state.empresa.instagram ? <View style={{ paddingLeft: 20 }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(this.state.empresa.instagram)}>
                                <AntDesign name='instagram' size={45} color='#FFFFFF' />
                            </TouchableOpacity>
                        </View>
                            : null}
                    </View> */}
                </View>
            </View>
        )
    }
}