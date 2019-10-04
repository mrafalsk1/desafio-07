import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import styles from '../assets/js/Styles';

class Nota extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handlePress = () => {
        this.props.navigation.navigate('Pontos', { nota: this.props.nota })
    }


    render() {
        return (
            <TouchableOpacity
                style={{
                    // flex: 1,
                    // flexDirection: 'row',
                    alignItems: 'center',
                    // alignContent: 'center',
                    // width: '100%',
                    // height: 50,
                    paddingVertical: 15,
                    marginVertical: 10,
                    backgroundColor: '#FFF',
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#EF8F3B',
                    overflow: 'hidden'
                    // backgroundColor: 'blue'
                }}
                activeOpacity={0.5}
                onPress={this.handlePress}
            >

                <Text
                    style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 22,
                        color: '#EF8F3B',
                        textAlign: 'center',
                    }}
                >{this.props.nota.nota_id}</Text>
                {/* {this.props.nota.nota_id + ' ' + (this.props.nota.manha && this.props.nota.tarde ? 'Manhã/Tarde' :
                        ((this.props.nota.manha ? 'Manhã' : '') + (this.props.nota.tarde ? 'Tarde' : '')))}</Text> */}
            </TouchableOpacity>

        )
    };
}

export default withNavigation(Nota);