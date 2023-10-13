import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Chat from './components/Chat';
import FavoriteJob from './components/FavoriteJob';
import Job from './components/Job';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import Tabs from './navigation/tab';
  

export default function App() {
  var sizeIcon = 26
  const [active, setActive] = useState(false)


  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
    
    
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNavigation: {
    height: 10
  },
  navCustom: {
    position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 5,
                backgroundColor: '#232323',
                borderRadius: 30,
                paddingBottom: 0,
                height: 60,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
  }
});
