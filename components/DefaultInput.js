import React, { Component } from 'react';
import { TextInput} from 'react-native';

class DefaultInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
                <TextInput style={{
                    ...this.props.style,
                    fontFamily: 'OpenSans',
                    fontSize: 16,
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#E4DFDA',
                    backgroundColor: '#fff'
                }}
                keyboardType={this.props.keyboardType}
                autoCapitalize={this.props.autoCapitalize}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                secureTextEntry={this.props.secureTextEntry}/>
        )
    }
}

export default DefaultInput