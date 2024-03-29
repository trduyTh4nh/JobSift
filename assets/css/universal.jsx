import React from "react";
import { StyleSheet } from "react-native";
const STYLE = StyleSheet.create({
    selectIOS: { borderColor: '#B0B0B0', borderWidth: 2, borderRadius: 16 },
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
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    textBold: {
        fontFamily: 'Rubik'
    },
    textNormal: {
        fontSize: 20
    },

    textTitle: {
        fontFamily: "Rubik",
        fontSize: 18,
        color: "#000"

    },
    item: {
        padding: 16,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 16
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
        backgroundColor: '#fff',
    },
    modalChild: {
        maxHeight: '75vh',
        padding: 24,
        paddingBottom: 0,
        gap: 16
    },
})
export default STYLE