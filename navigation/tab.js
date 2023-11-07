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
import { StyleSheet, TouchableOpacity, View, Text, Image, Button, ActivityIndicator, SafeAreaView } from 'react-native';

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
import CV from '../components/CV';
import { HeaderCVs } from '../components/HeaderCVs';
import CreateCV from '../components/CreateCV';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import PrivacyAndProlicy from '../components/PrivacyAndPolicy'
import Transaction from '../components/Transaction';

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
        )
    };

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
                        headerShown: false
                    }
                    )}
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
            <Stack.Screen name="Notification" component={FavoriteJob} options={{
                headerStyle: {
                    fontFamily: "Rukbik",
                    color: "#000",
                },
                headerTintColor: "#000",
            }} />

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
            <Stack.Screen name="ProfileJob" component={Profile} options={{}} />
            <Stack.Screen name="Edit Profile Info" component={EditProfile} options={{

            }}
            />
            <Stack.Screen name='Favorite Page' component={FavoritePage} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <Header navigation={navigation} title={"Favorite Job"} LeftButton={back}></Header>
                    )
                }
            }} ></Stack.Screen>
            <Stack.Screen name="Salary Calculator" component={SalaryCalculator} options={{
                header:
                    ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name)
                        return (
                            <Header navigation={navigation} title={title} LeftButton={back}></Header>
                        )
                    }
            }} />
            <Stack.Screen name='CV' component={CV} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <View>
                            <SafeAreaView style={{ backgroundColor: "rgba(255,255,255,1)" }}>
                                <View style={styles.wrap_welcome}>
                                    <View style={styles.Xuongdong} >
                                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                            <Icon name='arrow-left-s-line'></Icon>
                                        </TouchableOpacity>
                                        <Text style={styles.userName}>CVs</Text>
                                    </View>
                                    <View>

                                    </View>
                                    <View style={styles.wrapinFo}>
                                        <Text style={styles.welcomeMessage}>💎 231 </Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    )
                }
            }} >

            </Stack.Screen>

            <Stack.Screen name="CreateCV" component={CreateCV} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <View>
                            <SafeAreaView style={{ backgroundColor: "rgba(255,255,255,1)" }}>
                                <View style={styles.wrap_welcome}>
                                    <View style={styles.Xuongdong} >
                                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                            <Icon name='arrow-left-s-line'></Icon>
                                        </TouchableOpacity>
                                        <Text style={styles.userName}>Create CV</Text>
                                    </View>
                                    <View>

                                    </View>
                                    <View style={styles.wrapinFo}>
                                        <Text style={styles.welcomeMessage}>💎 231 </Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    )
                }
            }} />
            <Stack.Screen name="PrivacyAndPrivacy" component={PrivacyAndProlicy} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <View>
                            <SafeAreaView style={{ backgroundColor: "rgba(255,255,255,1)" }}>
                                <View style={styles.wrap_welcome}>
                                    <View style={styles.Xuongdong} >
                                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                            <Icon name='arrow-left-s-line'></Icon>
                                        </TouchableOpacity>
                                        <Text style={styles.userName}>Policies</Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    )
                }
            }} />


            <Stack.Screen name="Transaction" component={Transaction} options={{
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <View>
                            <SafeAreaView style={{ backgroundColor: "rgba(255,255,255,1)" }}>
                                <View style={styles.wrap_welcome}>
                                    <View style={styles.Xuongdong} >
                                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                            <Icon name='arrow-left-s-line'></Icon>
                                        </TouchableOpacity>
                                        <Text style={styles.userName}>Transaction</Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    )
                }
            }} />



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
    },
    wrap_info: {
        flexDirection: 'row',
        gap: 15,
        maxWidth: '65%',
        alignItems: 'center'
    },
    wrap: {
        paddingTop: 24,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        paddingBottom: 100,
    },
    container: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // fontFamily: 'Raleway-Bold'
        },

        text: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginTop: 30,
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
        },

    },
    userName: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000',

        // fontFamily: 'Rubik',
    },
    Xuongdong: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
    },
    welcomeMessage: {
        // fontFamily: 'RukbikNormal',
        fontSize: 24,
        color: '#000',
        alignContent: "center",
        fontWeight: '900'

    },
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        gap: 10,
        padding: 16
    },
    wrapinFo: {
        display: 'flex',
        flexDirection: 'row',
    },
    sayhi: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400'

        // fontFamily: 'RukbikNormal',
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        marginTop: 16
    },
    inputSearch: {
        color: '#ABABAB',
        width: "78%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 16,
        // fontFamily: 'RukbikNormal'

    },
    searchBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 30 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4
    },
    wrapSearchBtn: {

    },

    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "#F3F4F8",
    }
    ,
    titleHomeJob: {
        // fontFamily: "RukbikNormal",
        fontWeight: "700",
        fontSize: 16
    },
    wrapTitle: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10
    },
    titleHomeShowMore: {
        // fontFamily: "RukbikNormal",
        fontWeight: "500",
        color: "rgba(171,171,171,1)"
    },
    nearByJobContainer: {
        marginTop: 10
    },
    vien: {
        display: "flex",
        flexDirection: "row",
        gap: 45,
        alignItems: "center",
        borderColor: "#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 24,
        padding: 10,
        justifyContent: 'space-evenly'

    },
    Xuongdong1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    chutrongvien: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000'
    },
    chutrongvien2: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },
    daugach: {
        marginTop: 24,
        borderColor: "#B0B0B0",
        borderWidth: 1.5,

    },
    chucuaslart: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    dongngang: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 24,

    },
    dongngang1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",

    }
})