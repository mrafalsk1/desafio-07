import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DefaultButton from './DefaultButton';
import styles from '../assets/js/Styles';


class DefaultButtonFlP extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <DefaultButton
                loading={this.props.loading}
                onPress={this.props.onPress}
                style={{ ...this.props.style, height:40, maxHeight:40}}
            >
                <View
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#EF8F3B',
                    }}>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </View>
            </DefaultButton>

        )
    }
}

export default DefaultButtonFlP