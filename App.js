import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions, createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { AsyncStorage } from "react-native";
import { AppLoading } from 'expo';
import Login from './views/Login';
import Notas from './views/Notas';
import Pontos from './views/Pontos';
import Items from './views/Items';
import AddExtra from './views/AddExtra';
import EditItem from './views/EditItem';
import Sincronismo from './views/Sincronismo';
import CustomDrawer from './components/CustomDrawer';
import TopMenuBar from './components/TopMenuBar';
import * as Font from 'expo-font';
import 'react-native-gesture-handler'
import * as DBUtil from './components/DBUtil';

const db = DBUtil.getDB();


class App extends Component {

  constructor(props) {
    super(props);

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
    let login = await AsyncStorage.getItem('login')

    let initial = 'Login'
    if (login) {
      login = JSON.parse(login)
      if (login.equipe && login.senha) {
        initial = 'Recent'
      }
    }

    this.setState({
      appContainer: this.createDrawer(initial),
      loading: false
    })
  }

  createDrawer = (initial) => {
    const stack = createStackNavigator({
      Notas: { screen: Notas },
      Pontos: { screen: Pontos },
      Items: { screen: Items },
      Sincronismo: { screen: Sincronismo },
      AddExtra: { screen: AddExtra },
      EditItem: { screen: EditItem }
    },
      {
        initialRouteName: 'Notas',
        headerMode: 'float',
        // mode: 'modal',
        cardShadowEnabled: false,

        cardStyle: {
          shadowColor: 'transparent',
        },
        defaultNavigationOptions: {
          headerLeft: <TopMenuBar />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0
          }
        }
      });


    const drawer = createDrawerNavigator({
      Login: {
        screen: Login,
        navigationOptions: {
          drawerLockMode: 'locked-closed'
        }
      },
      Recent: {
        screen: stack
      }
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
