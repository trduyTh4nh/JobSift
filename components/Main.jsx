import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DefaultTheme} from '@react-navigation/native'
import { useEffect, useState } from 'react';
import Tabs from '../navigation/tab';

const Stack = createNativeStackNavigator();

const Main = () => {
    const THEME = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#FBFBFB'
        },
    }
    return (

        <NavigationContainer theme={THEME}>
            <Tabs></Tabs>
        </NavigationContainer>
    );
}

export default Main
