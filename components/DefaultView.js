import React, { Component } from 'react';

import { View, BackHandler } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import styles from '../assets/js/Styles';
import Titulo from './Titulo';
import TopMenuBar from './TopMenuBar';

class DefaultView extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleBackPress = () => {
        let len = global.screenStack.length
        if (len > 1) {
            global.screenStack.splice(len - 1, 1);
            let last = global.screenStack[len - 2];
            this.props.navigation.navigate(last, { goingBack: true })
        }
        return true
    }

    onFocus = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

        if (!this.props.navigation.state.params || !this.props.navigation.state.params.goingBack) {
            global.screenStack.push(this.props.navigation.state.routeName)
        }

        if (this.props.onFocus)
            this.props.onFocus()
    }

    onBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

        if (this.props.onBlur)
            this.props.onBlur()
    }

    render() {
        return (
            <View style={{
                ...this.props.style,
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                backgroundColor: '#FFF'
            }}>
                <NavigationEvents
                    onDidFocus={this.onFocus}
                    onWillBlur={this.onBlur}
                />

                <TopMenuBar />

                <View style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    paddingTop: 15,
                    ...styles.defaultPadding,
                }}>
                    <Titulo style={{}} voltar={this.props.voltar}>{this.props.titulo}</Titulo>

                    <View style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        paddingTop: 20,
                        alignItems: 'center'
                    }}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    };
}

export default withNavigation(DefaultView);