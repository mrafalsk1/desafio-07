import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DefaultLabelQuantidade extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                maxWidth: '35%',
                ...this.props.style
            }}>
                <Text numberOfLines={1} style={{
                    //paddingVertical: 8,
                    fontSize: 12,
                    padding: 10,
                    paddingHorizontal: 20
                    //paddingHorizontal: 20,
                }}>{this.props.operation}{this.props.title}</Text>
            </View>
        )
    }
}
export default DefaultLabelQuantidade