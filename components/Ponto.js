import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../assets/js/Styles';
import * as DBUtil from '../components/DBUtil'


class Ponto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trabalhando: false,
            idTempo: this.props.ponto.tempo_id
        }
    }

    handlePress = () => {
        this.props.navigation.navigate('Items', { ponto: this.props.ponto })
    }

    tempo = () => {
        if (!this.state.idTempo) {
            DBUtil.startTempo(this.props.ponto.ap_id).then((id) => {
                this.setState({
                    idTempo: id
                })
            })
        } else {
            DBUtil.fechaTempo(this.state.idTempo).then((res) => {
                this.setState({
                    idTempo: null
                })
            })
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#E4DFDA',
                    overflow: 'hidden'
                }}
            >

                <TouchableHighlight
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: 25,
                        height: '100%'
                    }}
                    activeOpacity={0.5}
                    underlayColor='#FAFAFA'
                    onPress={this.handlePress}
                >
                    <Text
                        style={{
                            fontFamily: 'OpenSans',
                            fontSize: 18,
                            color: '#4B4B46'
                        }}
                    >
                        {this.props.ponto.descricao}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 15
                    }}
                    activeOpacity={0.5}
                    underlayColor='#FAFAFA'
                    onPress={this.tempo}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                height: 15,
                                borderLeftWidth: 1,
                                borderColor: '#E4DFDA',
                            }}
                        />
                        <View
                            style={{
                                marginHorizontal: 18
                            }}
                        >
                            {this.state.idTempo ?
                                <MaterialIcons name='pause-circle-filled' size={28} color={'#93E1D8'} />
                                :
                                <MaterialIcons name='play-circle-filled' size={28} color={'#93E1D8'} />
                            }
                        </View>
                    </View>

                </TouchableHighlight>
            </View>

        )
    };
}

export default withNavigation(Ponto);