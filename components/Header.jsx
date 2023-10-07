import { View, SafeAreaView, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Icon from 'react-native-remix-icon'
export function Header({navigation, title, LeftButton}) {
    const button = LeftButton ? (<Pressable>
        <Icon name="arrow-left-s-line" size={24}></Icon> 
    </Pressable>) : undefined
    
    const back = () => {
        
    }
    
    return (
        <SafeAreaView>
            <View style={style.header}>
                {button}
                <Text style={style.text}>{title}</Text>
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
        padding: 16,
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        
        backgroundColor: 'rgb(242,242,242)'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})