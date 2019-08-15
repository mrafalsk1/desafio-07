import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { AsyncStorage } from "react-native";
import { AppLoading } from 'expo';
import Login from './views/Login';
import Home from './views/Home';
import CustomDrawer from './components/CustomDrawer';
import * as Font from 'expo-font';
import 'react-native-gesture-handler'

class App extends Component {

  constructor(props) {
    super(props);
    // global.config = empresas[Constants.manifest.extra.empresa];
    // if (!global.config.server) {
    //   global.config.server = Constants.manifest.releaseChannel ? 'https://agenda.nuvoni.com.br' : 'http://10.20.30.134'
    // }

    // global.screenStack = [];

    // StatusBar.setBarStyle(global.config.colors.statusBarContent + '-content', true);
    // this.clearStorage()

    let navigatorRef
    this.state = {
      appContainer: null,
      loading: true,
      fontsLoaded: false
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
    console.log('Fonts...')
    await Font.loadAsync({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    console.log('>>>> CHECK LOGIN')
    // const validation = await AsyncStorage.getItem('@validation')
    // let usuario = await AsyncStorage.getItem('@usuario')
    // let empresa = await AsyncStorage.getItem('@empresa')

    // if (empresa) {
    //   empresa = JSON.parse(empresa)
    // }

    // if (usuario) {
    //   usuario = JSON.parse(usuario)
    // }

    // fetch(global.config.server + '/api/empcli/' + global.config.empresa_id
    //   + (usuario ? ('?cliente=' + usuario.id) : ''))
    //   .then((response) => {
    //     return response.json()
    //   }).then((responseJson) => {
    //     if (responseJson.empresa) {
    //       this.saveEmpresa(responseJson.empresa)
    let initial = 'Login'
    //       let initialParams = null
    //       if (responseJson.empresa.agendamentos) {
    //         initial = 'Agendamentos'
    //       } else if (responseJson.empresa.pedidos) {
    //         initial = 'Produtos'
    //       }

    //       // initial = 'Produtos'
    //       global.home = initial

    //       if (responseJson.usuario) {
    //         this.saveUsuario(responseJson.usuario)
    //         registerForPushNotificationsAsync(responseJson.usuario.id);
    //       } else if (validation) {
    //         // this.props.navigation.navigate('CadCli', { semMenu: true, cel: validation })
    //         initial = 'CadCli'
    //         initialParams = { semMenu: true, cel: validation }
    //       } else {
    //         // this.props.navigation.navigate('Login')
    //         initial = 'Login'
    //       }

    this.setState({
      appContainer: this.createDrawer(initial),
      loading: false
    })
    //     }
    //   })
  }

  createDrawer = (initial) => {
    const drawer = createDrawerNavigator({
      Login: {
        screen: Login,
        navigationOptions: {
          drawerLockMode: 'locked-closed'
        }
      },
      Home: { screen: Home }
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
