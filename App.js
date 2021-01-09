import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import StartingScreen from './screens/StartingScreen';
import HomeScreen from './screens/HomeScreen';
import AddingPasswordScreen from './screens/AddingPasswordScreen';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

var switchNavigator = createSwitchNavigator({
  StartingScreen:StartingScreen,
  HomeScreen:HomeScreen,
  AddingPasswordScreen:AddingPasswordScreen
})

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
