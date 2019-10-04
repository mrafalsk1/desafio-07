import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DefaultButton from './DefaultButton';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



class DefaultButtonSearch extends Component {

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
                style={{ ...this.props.style,  height: 40, maxHeight: 40,}}
            >
                <LinearGradient
                    colors={['#93E1D8', '#48A9A6']}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    start={[1, 0]} end={[0, 1]}>
                    <FontAwesome name='search' size={22} color='white' />
                </LinearGradient>
            </DefaultButton>

        )
    }
}

export default DefaultButtonSearch