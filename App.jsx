import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import Tabs from './navigation/tab';
import { createStackNavigator } from '@react-navigation/stack';


import FormSignup from './src/FormSignup'
import LoginForm from './src/LoginForm';
import Main from './components/Main';

const Stack = createStackNavigator();


export default function App() {

  return (
    <Main></Main>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  headerNavigation: {
    height: 10
  },
  navCustom: {

  },
  inputBox: {
    borderWidth: 2,
    borderColor: '#000'
  },
  btnSignup: {
    backgroundColor: '#cccc',
    width: 200,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }

});
