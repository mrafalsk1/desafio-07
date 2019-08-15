import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { withNavigation, DrawerActions } from 'react-navigation'

class TopMenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View style={{
                height: 80,
                maxHeight: 90,
                padding: 10,
                paddingLeft: 15,
                paddingRight: 25,
                paddingTop: 30,
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <TouchableOpacity activeOpacity={0.5} style={{ padding: 10, textAlign: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', maxWidth: 50, width: 50, minWidth: 50 }}
                    onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Entypo name='bar-graph' size={35} color={'#000'} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(TopMenuBar)