import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DefaultButton from './DefaultButton';
import styles from '../assets/js/Styles';


class DefaultButtonOK extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <DefaultButton
                loading={this.props.loading}
                onPress={this.props.onPress}
                style={{ ...this.props.style }}
            >
                <View
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#759FBC'
                    }}>
                    <Text style={styles.buttonText}>OK</Text>
                </View>
            </DefaultButton>

        )
    }
}

export default DefaultButtonOK