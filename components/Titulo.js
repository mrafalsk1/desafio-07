import React, { Component } from 'react';
import { Text} from 'react-native';

class Titulo extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
                <Text style={{
                    ...this.props.style,
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 28
                }}>
                {this.props.children}
                </Text>
        )
    }
}

export default Titulo