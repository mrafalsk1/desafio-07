import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DefaultButton from './DefaultButton';
import styles from '../assets/js/Styles';


class DefaultButtonFlC extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
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
                        paddingHorizontal: 35,
                        paddingVertical: 15,
                        alignItems: 'center',
                        backgroundColor: '#93E1D8'
                    }}>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </View>
            </DefaultButton>

        )
    }
}

export default DefaultButtonFlC