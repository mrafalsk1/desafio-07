import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { AsyncStorage } from "react-native";
import { AppLoading } from 'expo';
import Login from './views/Login';
import Home from './views/Home';
import Sincronismo from './views/Sincronismo';
import CustomDrawer from './components/CustomDrawer';
import * as Font from 'expo-font';
import 'react-native-gesture-handler'

class App extends Component {

  constructor(props) {
    super(props);

    global.screenStack = [];

    // this.clearStorage()

    let navigatorRef
    this.state = {
      appContainer: null,
      loading: true,
    }
  }

  componentDidMount() {

  }

  clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
    }
  }

  checkData = async () => {
    await Font.loadAsync({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    console.log('>>>> CHECK LOGIN')
    let login = await AsyncStorage.getItem('login')

    let initial = 'Login'
    if (login) {
      login = JSON.parse(login)
      if (login.equipe && login.senha) {
        initial = 'Home'
      }
    }

    this.setState({
      appContainer: this.createDrawer(initial),
      loading: false
    })
  }

  createDrawer = (initial) => {
    const drawer = createDrawerNavigator({
      Login: {
        screen: Login,
        navigationOptions: {
          drawerLockMode: 'locked-closed'
        }
      },
      Home: { screen: Home },
      Sincronismo: { screen: Sincronismo }
    },
      {
        initialRouteName: initial,
        // initialRouteParams: params,
        contentComponent: CustomDrawer,
        // drawerWidth: width,
        drawerBackgroundColor: "transparent",
        backBehavior: 'none'
      }
    );

    return createAppContainer(drawer)
  }

  render() {
    if (this.state.loading || !this.state.appContainer) {
      return <AppLoading
        startAsync={this.checkData}
        onFinish={() => this.setState({ loading: false })}
      />
    } 

    return <this.state.appContainer ref={ref => this.navigatorRef = ref} />;
  }

}

export default App;

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Home: Home,
//     Login: Login,
//   },
//   {
//     hideStatusBar: true,
//     drawerBackgroundColor: 'rgba(255,255,255,.9)',
//     overlayColor: '#6b52ae',
//     contentOptions: {
//       activeTintColor: '#fff',
//       activeBackgroundColor: '#6b52ae',
//     },
//   }
// );

// export default createAppContainer(DrawerNavigator);
