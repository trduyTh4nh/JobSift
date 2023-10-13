import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useState } from 'react';
import Tabs from '../navigation/tab';

const Stack = createNativeStackNavigator();

const Main = () => {
    return (

        <Tabs></Tabs>
    );
}

export default Main
