import Home from '../components/Home';
import Chat from '../components/Chat';
import FavoriteJob from '../components/FavoriteJob';
import Job from '../components/Job';
import Profile from '../components/Profile';
import Icon from 'react-native-remix-icon';
import { getHeaderTitle } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobDetail from '../Job/JobDetail';
import HeaderThanh from '../components/HeaderThanh'

import { useNavigation, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image, Button, ActivityIndicator } from 'react-native';

import LoginForm from '../src/LoginForm';
import FormSignup from '../src/FormSignup';
import { Form } from 'react-hook-form';

import { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from '../components/Header';

import ChatDetails from '../components/ChatDetails';
import STYLE from '../assets/css/universal';
import { HeaderProfile } from '../components/HeaderProfile';
import EditProfile from '../components/EditProfile';
import SalaryCalculator from '../components/SalaryCalculator';
import FavoritePage from '../components/Favorite';
import { useIsFocused } from '@react-navigation/native';
import { Animated } from 'react-native';
import BuyDiamond from '../components/BuyDiamond';
import ApplicationStatus from '../components/ApplicationStatus';


const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator()

const Tabs = () => {
    const isFocused = useIsFocused();
    const THEME = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#fff'
        }
    }
    // const [fontLoaded] = useFonts({
    //     'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    // })
    // if (!fontLoaded) {
    //     return (
    //         <View>
    //             <ActivityIndicator></ActivityIndicator>
    //         </View>
    //     )
    // }

    var sizeIcon = 26
    const navigation = useNavigation();
    // const animationValue = useRef(new Animated.Value(1)).current;


    // const handleTabPress = () => {
    //     // Animate the tab when it's pressed
    //     Animated.sequence([
    //       Animated.timing(animationValue, {
    //         toValue: 0.8,
    //         duration: 100,
    //         useNativeDriver: true,
    //       }),
    //       Animated.timing(animationValue, {
    //         toValue: 1,
    //         duration: 100,
    //         useNativeDriver: true,
    //       }),
    //     ]).start();

    //     // Navigate to the respective screen
    //     navigation.navigate('FavoriteJobTab'); // Change the tab name as per your need
    //   };

    //   const animatedStyle = {
    //     transform: [{ scale: animationValue }],
    //   };



    const HomeStack = () => {
        const [initRoute, setRoute] = useState('LoginForm')
        useEffect(() => setRoute('Home'), [global.user])
        return (

        <Stack.Navigator initialRouteName='Home' theme={THEME} options={{

        }}>
            <Stack.Screen name='LoginForm' component={LoginForm} options={{ headerShown: false, headerLeft: null }}></Stack.Screen>
            <Stack.Screen name='FormSignup' component={FormSignup} options={{ headerShown: false, headerLeft: null }} />
            <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false, headerShown: false, headerLeft: null }} />
            <Stack.Screen name="Chat Details" component={ChatDetails}
                options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    },
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name='JobDetail'
                component={JobDetail}
                options={{
                    headerTitle: () => (
                        <HeaderThanh name="JobDetail"></HeaderThanh>
                    ),
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='arrow-left-s-line' size={24} color='#000' />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={styles.wrapHeaderLeft}>
                            <Image
                                source={require('../assets/diamond_pro.png')}
                                style={{ width: 22, height: 22 }}
                            />
                            <Text style={styles.quantityDiamond}>499</Text>
                            <TouchableOpacity>
                                <Icon name='add-fill' style={{ fontWeight: "700" }} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: {
                        height: 150,
                        backgroundColor: '#fff',
                        elevation: 0,
                    },
                }}
            ></Stack.Screen>

        </Stack.Navigator>
    )};

    const JobStack = ({ navigation }) => {

        return (
            <Stack.Navigator screenOptions={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <Header navigation={navigation} title={title} LeftButton={back}></Header>
                    )
                }
            }}>
                <Stack.Screen
                    component={Job}
                    name='Search'
                    options={({ navigation, route }) => ({
                        header: ({ options, route, back }) => {
                            const title = getHeaderTitle(options, route.name);
                            return (
                                <Header navigation={navigation} title={title} LeftButton={back}></Header>
                            );
                        },
                        headerTitleStyle: {
                            color: "red",
                            fontFamily: "Rubik",
                            
                        },
                    })}
                />
            </Stack.Navigator>
        )
    };

    const ChatStack = () => (
        <Stack.Navigator screenOptions={{
            headerTransparent: true,
            headerBlurEffect: 'regular'
        }} headerMode="screen">
            <Stack.Screen name="Chat" component={Chat} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <Header navigation={navigation} title={title} LeftButton={back}></Header>
                    )
                }
            }} />
            <Stack.Screen name="Chat Details" component={ChatDetails}
                options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    );


    const FavoriteJobStack = () => (
        <Stack.Navigator screenOptions={{
            header: ({ navigation, route, options, back }) => {
                const title = getHeaderTitle(options, route.name)
                return (
                    <Header title={title} LeftButton={back}></Header>
                )
            }
        }}>
            <Stack.Screen name="FavoriteJob" component={FavoriteJob} options={{}} />

        </Stack.Navigator>
    );

    const ProfileJobStack = () => (
        <Stack.Navigator screenOptions={{
            header: ({ navigation, route, options, back }) => {
                const title = getHeaderTitle(options, route.name)
                return (
                    <HeaderProfile navigation={navigation} title={title} LeftButton={back}></HeaderProfile>
                )
            }
        }}>
        <Stack.Screen name="Chat Details" component={ChatDetails}
                options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    },
                    headerTransparent: true
                }}
            />
            <Stack.Screen name="ProfileJob" component={Profile} options={{}} />
            <Stack.Screen name="Edit Profile Info" component={EditProfile} options={{

            }}
            />
            <Stack.Screen name="Tình trạng ứng tuyển" component={ApplicationStatus} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <Header navigation={navigation} title={title} LeftButton={back}></Header>
                    )
                }
            }}/>
            <Stack.Screen name='Favorite Page' component={FavoritePage} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <Header navigation={navigation} title={"Bài đăng yêu thích"} LeftButton={back}></Header>
                    )
                }
            }} ></Stack.Screen>
            <Stack.Screen name="Công cụ tính lương" component={SalaryCalculator} options={{
                header:
                    ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    }
            }} />
            <Stack.Screen name="Mua KC" component={BuyDiamond} options={{
                header:
                    ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    }
            }}/>
        </Stack.Navigator>
    );


    return (


        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: STYLE.tabBarStyle,


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
                            style={{ opacity: isFocused ? 1 : 0.5 }}
                        />
                    ),
                    headerLeft: null
                }}
            ></Tab.Screen>
            <Tab.Screen name='JobTab' component={JobStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? 'search-fill' : 'search-line'}
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
    wrapHeaderLeft: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    quantityDiamond: {
        fontSize: 24,
        color: '#000',
        fontFamily: "Rubik"
    }
})