import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../assets/js/Styles';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            feito: false
        }
    }


    feito = () => {
        this.setState({
            feito: !this.state.feito
        })
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    // alignItems: 'center',
                    alignItems: 'stretch',
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
                        paddingRight: 10,
                        height: '100%'
                    }}
                    activeOpacity={0.5}
                    underlayColor='#FAFAFA'
                    onPress={() => this.props.navigation.navigate('EditItem', { item: this.props.item })}
                >
                    <View style={{ paddingVertical: 10 }}>
                        <Text
                            style={{
                                fontFamily: 'OpenSans',
                                fontSize: 16,
                                color: '#4B4B46'
                            }}
                        >
                            {this.props.item.descricao}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'OpenSans-Bold',
                                    fontSize: 16,
                                    color: '#4B4B46'
                                }}
                            >
                                {'Prev/Realizado: '}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'OpenSans',
                                    fontSize: 16,
                                    color: '#4B4B46'
                                }}
                            >
                                {this.props.item.previsto + '/' + (this.props.item.realizado ? this.props.item.realizado : '**')}
                            </Text>
                        </View>

                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 15,
                    }}
                    activeOpacity={0.5}
                    underlayColor='#FAFAFA'
                    onPress={this.feito}
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
                            <MaterialIcons name='check-circle' size={28} color={this.state.feito ? '#93E1D8' : '#E4DFDA'} />
                        </View>
                    </View>

                </TouchableHighlight>
            </View>

        )
    };
}

export default withNavigation(Item);