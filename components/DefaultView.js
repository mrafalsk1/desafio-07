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

    render() {
        return (
            <View style={{
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                backgroundColor: '#FFF',
                ...this.props.style,
            }}>
                <NavigationEvents
                    onDidFocus={this.props.onFocus}
                    onWillBlur={this.props.onBlur}
                />

                {/* <TopMenuBar /> */}

                <View style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    paddingTop: 15,
                    ...styles.defaultPadding,
                }}>
                    <Titulo voltar={this.props.voltar}>{this.props.titulo}</Titulo>

                    <View style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        // paddingTop: 20,
                        alignItems: 'center',
                        ...this.props.containerStyle,
                    }}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    };
}

export default withNavigation(DefaultView);