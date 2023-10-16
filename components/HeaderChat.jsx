import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Header } from "./Header";
import Icon from "react-native-remix-icon";
import STYLE from "../assets/css/universal";
const HeaderChat = ({navigation, title, LeftButton, image, name}) => {
    const back = () => {
        navigation.goBack()
    }
    const button = LeftButton ? (<TouchableOpacity onPress={back}>
        <Icon name="arrow-left-s-line" size={24}></Icon> 
    </TouchableOpacity>) : undefined
    return (
        <View style={STYLE.headerWrap}>
                <SafeAreaView style={{backgroundColor: "rgba(255,255,255, 1)"}}>
                    <View style={style.header}>
                        {button}
                        <View style={style.headerTitle}>
                            <Image style={{borderRadius: 50}} width={46} height={46} source={{uri: 'https://images-ext-2.discordapp.net/external/J0CmYBrUaclT-rSO1X80iEkJ-Sp39yEPnqdiokPwfaU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/515061888258670602/9e4b204e2b74d3264f42fbb933b1e18b.png?width=512&height=512'}}/>
                            <Text style={style.text}>{title}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
    )
}
const style = StyleSheet.create({
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    header: {
        padding: 16,
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})
export default HeaderChat