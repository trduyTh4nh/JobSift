import Home from '../components/Home';
import Chat from '../components/Chat';
import FavoriteJob from '../components/FavoriteJob';
import Job from '../components/Job';
import Profile from '../components/Profile';
import Icon from 'react-native-remix-icon';
import { StyleSheet, TouchableOpacity } from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobDetail from '../Job/JobDetail';

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator()

const Tabs = () => {
    var sizeIcon = 26

    const HomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='JobDetail' component={JobDetail} options={{  }}></Stack.Screen>
        </Stack.Navigator>
    );

    const JobStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Job" component={Job} options={{  }} />

        </Stack.Navigator>
    );

    const ChatStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={Chat} options={{  }} />

        </Stack.Navigator>
    );


     const FavoriteJobStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="FavoriteJob" component={FavoriteJob} options={{  }} />

        </Stack.Navigator>
    );

    const ProfileJobStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="ProfileJob" component={Profile} options={{  }} />

        </Stack.Navigator>
    );


    return (


        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 15,
                left: 20,
                right: 20,
                elevation: 5,
                backgroundColor: '#232323',
                borderRadius: 30,
                height: 60,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

            },

        }}>

            <Tab.Screen
                name='HomeTab'
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'home-fill' : 'home-line'}
                            color={focused ? '#E2F367' : '#ffff'}
                            size={sizeIcon}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen name='JobTab' component={JobStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'briefcase-4-fill' : 'briefcase-4-line'}
                            color={focused ? '#E2F367' : '#ffff'}
                            size={sizeIcon}
                        />
                    ),
                }}></Tab.Screen>

            <Tab.Screen name='ChatTab' component={ChatStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'chat-3-fill' : 'chat-3-line'}
                            color={focused ? '#E2F367' : '#ffff'}
                            size={sizeIcon}
                        />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='FavoriteJobTab' component={FavoriteJobStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'heart-fill' : 'heart-line'}
                            color={focused ? '#E2F367' : '#ffff'}
                            size={sizeIcon}
                        />
                    ),
                }}></Tab.Screen>

            <Tab.Screen name='ProfileTab' component={ProfileJobStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'user-fill' : 'user-line'}
                            color={focused ? '#E2F367' : '#ffff'}
                            size={sizeIcon}
                        />
                    ),
                }}></Tab.Screen>
        </Tab.Navigator>
    )
}



export default Tabs

const styles = StyleSheet.create({

})