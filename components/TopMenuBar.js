import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { withNavigation, DrawerActions } from 'react-navigation'
import Constants from 'expo-constants';
import styles from '../assets/js/Styles';


class TopMenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sync: false
        }
    }

    sync = () => {
        // this.setState({
        //     sync: true
        // })
        // SyncUtil.sync().then(() => {
        //     this.setState({
        //         sync: false
        //     })
        // })

        this.props.navigation.navigate('Sincronismo')
    }

    render() {
        return (
            <View style={{
                height: 80,
                maxHeight: 90,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 30,
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            padding: 10
                        }}
                        onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Entypo name='bar-graph' size={25} color={'#000'}
                            style={{
                                transform: [{ rotate: '-90deg' }]
                            }}
                        />
                    </TouchableOpacity>

                    {this.props.version ?
                        <Text style={styles.menuVersion}>{Constants.manifest.version}</Text>
                        : null}
                </View>

                {/* <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',

                    }}
                >
                    {
                        this.state.sync ?
                            <Animatable.View
                                animation="rotate"
                                easing="linear"
                                iterationCount="infinite"
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Foundation name='refresh' size={25} color={'#000'} />
                            </Animatable.View>
                            : <TouchableOpacity
                                activeOpacity={0.5}
                                style={{
                                    padding: 10,
                                }}
                                onPress={this.sync}>
                                <Foundation name='refresh' size={25} color={'#000'} />
                            </TouchableOpacity>
                    }
                </View> */}
            </View>
        )
    }
}

export default withNavigation(TopMenuBar)