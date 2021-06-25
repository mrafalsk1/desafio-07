import 'react-native-gesture-handler'
import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { navigationRef } from './assets/js/RootNavigation';


import Items from './views/Items';
import Login from './views/Login';

import CustomDrawer from './components/CustomDrawer';
import * as DBUtil from './components/DBUtil';
import { EventRegister } from 'react-native-event-listeners';







class App extends Component {

  constructor(props) {
    super(props);

    const rc = Constants.manifest.releaseChannel
    // global.server = rc && rc.indexOf('prod') !== -1 ? 'http://procel.nuvoni.com.br/app/' : 'http://192.168.0.82:3000/'
    global.server = rc && rc.indexOf('prod') !== -1 ? 'http://192.168.0.82:3000/' : 'http://192.168.0.82:3000/'

    // this.clearStorage()

    this.state = {
      loading: true,
      initial: '',
    }
  }

  componentDidMount() {

  }

  clearStorage = async () => {
    try {
      console.log('CLEARING XXXXXXXXXXXXXXXXXX')
      await AsyncStorage.clear()
      await DBUtil.dropTables()
    } catch (e) {
    }
  }

  checkData = async () => {
    await Font.loadAsync({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    });
    console.log('Preparando banco...')
    await DBUtil.prepareDB().then((res) => {
      if (res === true) {
        console.log('DB OK!!!')
      }
    }).catch((e) => {
      console.error(e)
    })
    console.log('>>>> CHECK LOGIN')
    await AsyncStorage.getItem('token').then((values) => {
      this.setState({
        initial: 'Login'
      })
      if (values) {
        this.setState({
          initial: 'Items',
        })
        EventRegister.emit('login')
      }
    })

    this.setState({
      loading: false
    })
  }


  render() {
    if (this.state.loading) {
      return <AppLoading
        startAsync={this.checkData}
        onFinish={() => this.setState({ loading: false })}
        onError={() => console.warn}
      />
    }
    const { Navigator, Screen } = createDrawerNavigator();
    return (
      <NavigationContainer ref={navigationRef}>
        <Navigator initialRouteName={this.state.initial} screenOptions={{ headerShown: false }} drawerContent={() => <CustomDrawer />}>
          <Screen name="Login" component={Login}></Screen>
          <Screen name="Items" component={Items}></Screen>
        </Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
