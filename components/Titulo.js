import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class Titulo extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    goBack = () => {
          this.props.navigation.goBack(null)
    }

    render() {
        if (this.props.voltar) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            padding: 10,
                            zIndex: 2,
                            left: -10,
                            position: 'absolute',
                        }}
                        onPress={this.goBack}
                    >
                        <AntDesign
                            name='arrowleft'
                            size={33}
                            color={'#000'}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        ...this.props.style,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 28,
                        width: '100%',
                        marginTop: 10,
                        marginBottom: 20,
                        zIndex: 1,
                        textAlign: 'center',
                    }}>
                        {this.props.children}
                    </Text>
                </View>
            )
        } else {
            return (

                <Text style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 28,
                    marginTop: 10,
                    marginBottom: 20,
                    ...this.props.style,
                }}>
                    {this.props.children}
                </Text>
            )
        }
    }
}

export default Titulo;