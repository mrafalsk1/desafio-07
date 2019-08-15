import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class DefaultButtonGrP extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    ...this.props.style,
                    overflow: 'hidden',
                    borderRadius: 30,
                    backgroundColor: 'blue'
                }}
                onPress={this.props.onPress}
            >
                <LinearGradient
                    colors={['#EF8F3B', '#D04B3E']}
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 35,
                        paddingVertical: 15
                    }}
                    start={[1, 0]} end={[0, 1]}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 22,
                        color: '#fff'
                    }}>{this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>


        )
    }
}

export default DefaultButtonGrP