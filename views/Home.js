import React, { Component } from 'react';
import { Text, View, Image, Animated, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <DefaultView titulo='Obras'>
                <Text>Homer</Text>
                <DefaultButtonFlP title='Leite Quente'/>
            </DefaultView>
        );
    }
}

export default withNavigation(Home);