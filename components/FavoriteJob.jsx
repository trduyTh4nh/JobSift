import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import NotifiChat from "../src/NotifiChat";
import NotifiChild from "../src/NotifiChild";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-remix-icon";
const FavoriteJob = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <View style={styles.notifi}>
            <View style={styles.bodyJobDetail}>
                <Tab.Navigator style={styles.tabInFoJob}
                    screenOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                        tabBarPressColor: 'lightgray',
                        tabBarPressOpacity: 0.5,
                        indicatorStyle: {
                            backgroundColor: '#BACF21',
                            height: 4,
                            width: 100
                        },
                        style: { backgroundColor: 'white' },
                    }}
                >
                    <Tab.Screen
                        style={styles.tabInFoJob_test}
                        name="NotifiChild"
                        component={NotifiChild}
                        options={{
                            title: "Notification",
                            tabBarLabel: ({ focused, color }) => (
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                    backgroundColor: focused ? "#E2F367" : 'white',
                                    padding: 10,
                                    borderRadius: 20,
                                    justifyContent: "center"
                                }}>
                                    <Icon size={22} name={focused ? 'notification-2-fill' : 'notification-2-line'}
                                        // color={focused ? 'black' : '#A3BA00'}
                                    ></Icon>
                                    <Text style={{
                                        color: focused ? 'black' : '#A3BA00',
                                        fontSize: 16,
                                        fontFamily: "Rubik",
                                        marginLeft: 4,
                                        marginRight: 4
                                    }}>
                                        Notification
                                    </Text>
                                </View>


                           
                            ),bBarIndicatorStyle: {
                                width: 30,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 30) / 2),
                                backgroundColor: '#000',
                                display: "none"
                            },
                            tabBarIndicatorContainerStyle: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',

                            },

                            tabBarIconStyle: {

                            },

                        }}
                    />




                    <Tab.Screen name="NotifiChat" component={NotifiChat}
                        options={{
                            title: "Chat",
                            tabBarLabel: ({ focused, color }) => (
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                    backgroundColor: focused ? "#E2F367" : 'white',
                                    padding: 10,
                                    borderRadius: 20,
                                    justifyContent: "center"
                                }}>
                                    <Icon size={22} name={focused ? 'message-3-fill' : 'message-3-line'}
                                    
                                    // color={focused ? "black" : "#A3BA00"}
                                    
                                    ></Icon>
                                    <Text style={{
                                        color: focused ? 'black' : '#A3BA00',
                                        fontSize: 16,
                                        fontFamily: "Rubik",
                                        marginLeft: 4,
                                        marginRight: 4
                                    }}>
                                        Chat
                                    </Text>
                                </View>
                            ),

                            tabBarIndicatorStyle: {
                                width: 80,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 80) / 2),
                                backgroundColor: '#000',
                                display: "none"
                            },

                        }}
                    />
                </Tab.Navigator>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    notifi: {

    },
    bodyJobDetail: {
        height: 900
    },
    tabInFoJob: {
        fontFamily: "Rubik",
    },
    tabInFoJob_test: {
        fontFamily: "Rubik"

    }
})


export default FavoriteJob