import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

class Titulo extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    goBack = () =>{
        let len = global.screenStack.length
        if (len > 1) {
            global.screenStack.splice(len - 1, 1);
            let last = global.screenStack[len - 2];
            this.props.navigation.navigate(last, { goingBack: true })
        }
    }

    render() {
        if (this.props.voltar) {
            return (
                <View
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            padding: 10,
                            zIndex: 2,
                            left: -10
                        }}
                    onPress={this.goBack}
                    >
                        <AntDesign
                            name='arrowleft'
                            size={30}
                            color={'#000'}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        ...this.props.style,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 28,
                        width: '100%',
                        position: 'absolute',
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
                    ...this.props.style,
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 28
                }}>
                    {this.props.children}
                </Text>

            )
        }
    }
}

export default withNavigation(Titulo)