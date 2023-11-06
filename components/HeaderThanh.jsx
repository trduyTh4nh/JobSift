import React from 'react'
import { Text, View } from "react-native";
import { useFonts } from "expo-font"
import { ActivityIndicator } from 'react-native-paper';

const Header = (props) => {
    return (
        <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: "Rubik" }}>

            </Text>
        </View>
    )
}

export default Header