import React from "react";
import { StyleSheet } from "react-native";
const STYLE = StyleSheet.create({
    tabBarStyle: {
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
    },
    chatTabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingBottom: 0,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    body: {
        padding: 16,
        paddingTop: 0,
        gap: 16,
        height: '100%'
    },
    headerWrap: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
    },
    textBold: {
        fontFamily: 'Rubik'
    },
    textNormal: {
        fontSize: 20
    }
})
export default STYLE