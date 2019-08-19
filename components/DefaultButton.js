import React, { Component } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
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
                    backgroundColor: '#B5B0AA'
                }}
                activeOpacity={0.5}
                onPress={this.props.loading ? null : this.props.onPress}
            >
                {this.props.loading ?
                    <ActivityIndicator size="small" color="#fff"
                        style={{
                            paddingHorizontal: 35,
                            paddingVertical: 18,
                        }} />
                    :
                    this.props.children
                }
            </TouchableOpacity>
        )
    }
}

export default DefaultButtonGrP