import React, { Component } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

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
                    flex:1,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    borderRadius: 30,
                    backgroundColor: '#B5B0AA',
                    height: 60,
                    maxHeight: 60,
                    alignContent:"center",
                    alignSelf:"center",
                    alignItems:"stretch",
                    ...this.props.style,
                }}
                activeOpacity={0.5}
                onPress={this.props.loading ? null : this.props.onPress}
            >
                {this.props.loading ?
                    <ActivityIndicator size="small" color="#fff"
                        style={{
                            width: '100%',
                            paddingHorizontal: 35,
                            // paddingVertical: 18,
                        }} />
                    :
                    this.props.children
                }
            </TouchableOpacity>
        )
    }
}

export default DefaultButtonGrP