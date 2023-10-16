
import { View, SafeAreaView, Text, Pressable, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React from "react";
import Icon from 'react-native-remix-icon'
import { BlurView } from "expo-blur";
import STYLE from "../assets/css/universal";
export function Header({navigation, title, LeftButton}) {
    const back = () => {
        navigation.goBack()
    }
    
    const button = LeftButton ? (<TouchableOpacity onPress={back}>
        <Icon name="arrow-left-s-line" size={24}></Icon> 
    </TouchableOpacity>) : undefined
    return (
        <View style={STYLE.headerWrap}>
            <SafeAreaView style={{backgroundColor: "rgba(255,255,255,1)"}}>
                <View style={style.header}>
                    {button}
                    <Text style={style.text}>{title}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}
const style = StyleSheet.create({
    header: {
        padding: 16,
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
 
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Rubik'
    }
})

