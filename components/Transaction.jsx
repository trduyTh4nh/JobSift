import { useIsFocused, useRoute } from "@react-navigation/native";
import React from "react";
import { uploadFile } from "../firebase/storage";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Animated, Easing, ActivityIndicator, SafeAreaView, Pressable } from "react-native";
import Icon from 'react-native-remix-icon';
import { COLORS, FONT } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ChildInFoJob from "../src/childJob";
// import ChildCompany from "../src/childJobCompany";

import TransactionConsume from "../src/TransactionConsuma";
import TransactionHistory from "../src/TransactionHisoty";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from 'expo-font'
import BottomPopup from "../navigation/bottomPopUp";
import { useState, useEffect } from "react";
import axios from "axios";
import storage from '@react-native-firebase/storage'
import { API_URL } from "../ipConfig"
import Modal from 'react-native-modal'
import STYLE from "../assets/css/universal";
import * as DocumentPicker from 'expo-document-picker';
import { ProgressBar } from "react-native-paper";
const IPcuaQuang = "192.168.1.113"
const IPlD = "192.168.116.1"
// const Tab = createBottomTabNavigator();
import { API_URL as URL } from "../constants/etc";
const Tab = createMaterialTopTabNavigator();

const Transaction = () => {

    return (
        <View style={styles.mainPolicy}>
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
                        name="TransactionConsume"
                        component={TransactionConsume}
                        options={{
                            title: "TransactionConsume",
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{
                                    color: focused ? 'black' : 'gray',
                                    fontSize: 16,
                                    fontFamily: "Rubik"
                                }}>
                                    Mua KC
                                </Text>
                            ),
                            tabBarIndicatorStyle: {
                                width: 30,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 30) / 2),
                                backgroundColor: '#000',
                            },
                            tabBarIndicatorContainerStyle: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />

                    <Tab.Screen name="TransactionHistory" component={TransactionHistory}
                        options={{
                            title: "TransactionHistory",
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{ color: focused ? 'black' : 'gray', fontSize: 16, fontFamily: "Rubik" }}>
                                    Lịch sử giao dịch
                                </Text>
                            ),

                            tabBarIndicatorStyle: {
                                width: 80,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 80) / 2),
                                backgroundColor: '#000',
                            },
                        }} />
                </Tab.Navigator>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E2F367',
        borderRadius: 50
    },
    priceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    wrapModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        borderRadius: 16,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: '#fff'
    },
    modalChild: {
        padding: 24,
        paddingBottom: 0,
        gap: 16
    },
    wrapMain: {
        backgroundColor: "#fff"
    },
    containerJobDetail: {
        padding: 16
    },
    headerJobDetail: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerJobInFo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    wrapInfoJob: {
        width: "50%",
        display: 'flex',
        gap: 10
    },
    wrapFeartureJob: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'flex-end'
    },
    wrapCompany: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    buttonApplyJob: {
        backgroundColor: '#E2F367',
        width: 58,
        height: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 1)',
        elevation: 10,
    },
    wrapDiamond: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameJob: {
        fontSize: 28,
        color: '#323232',
        fontFamily: "Rubik"
    },
    nameCompany: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "Rubik"
    },
    datePost: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "RukbikNormal"

    },
    wrapDiamond: {
        display: "flex",

        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    headerJobInFoWrap: {
        gap: 5
    },
    headerRate: {
    }
    ,
    quantityStart: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    rateStar: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center"

    },
    textStartDetail: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Rubik"
    },
    rateReviewDetal: {
        marginTop: 8,
        color: "#000",
        fontFamily: "RukbikNormal"

    },
    bodyJobDetail: {
        height: 900
    },
    tabInFoJob: {
        fontFamily: "Rubik"

    },
    tabInFoJob_test: {
        fontFamily: "Rubik"

    },
    numberOfDiamond: {
        fontSize: 16,
        fontFamily: "RukbikNormal"
    },
    JobRankNumber: {
        display: "flex",
        flexDirection: "row",

    },
    wrapNumberStartUp: {
        fontFamily: "Rubik",
        fontSize: 30,
        color: "#000"
    },
    JobWrapRankStar: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }, wrapNumberStart: {
        fontFamily: "RubikNormal",
        fontSize: 16
    },
    menuPopUp: {
        width: 100,
        height: 100
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuItem: {
        fontSize: 20,
        padding: 15,
        backgroundColor: 'white',
    },
    popUpBottomMenu: {
    },
    wrapPopMenu: {
        elevation: 4
    },
    wrapMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        elevation: 5,
        backgroundColor: "red"
    }, optionOnMenu: {
        backgroundColor: "#ccc"
    },
    applicationStatus: {
        flexDirection: 'row',
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 10,
        borderRadius: 16,
        alignItems: "center"
    },
    CVDetails: {
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 20,
        borderRadius: 16,
        gap: 10
    },
    CVDetailsSection: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})

export default Transaction