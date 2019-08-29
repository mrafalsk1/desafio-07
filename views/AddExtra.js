import React, { Component } from 'react';
import { Text, View, Image, Animated, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import DefaultView from '../components/DefaultView';
import DefaultButtonFlP from '../components/DefaultButtonFlP';
import * as SyncUtil from '../components/SyncUtil';


class AddExtra extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    

    render() {
        return (
            <DefaultView titulo='Adicionar Extra' voltar={true}>
                
            </DefaultView>
        );
    }
}

export default withNavigation(AddExtra);