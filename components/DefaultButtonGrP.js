import React, { Component } from 'react';
import { Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import DefaultButton from './DefaultButton';

import styles from '../assets/js/Styles';


class DefaultButtonGrP extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <DefaultButton
                loading={this.props.loading}
                style={{ ...this.props.style }}
                onPress={this.props.onPress}
            >
                <LinearGradient
                    colors={['#EF8F3B', '#D04B3E']}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // paddingHorizontal: 35,
                        // paddingVertical: 15
                    }}
                    start={[1, 0]} end={[0, 1]}>

                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </LinearGradient>

            </DefaultButton>

        )
    }
}

export default DefaultButtonGrP