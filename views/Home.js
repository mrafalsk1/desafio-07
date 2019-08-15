import React, { Component } from 'react';
import { Text, View, Image, Animated, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <View>
                <Text>HOMER</Text>
            </View>
        );
    }
}

export default withNavigation(Home);