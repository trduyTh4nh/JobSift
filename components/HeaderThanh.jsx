import React from 'react'
import { Text, View } from "react-native";
import { useFonts } from "expo-font"
import { ActivityIndicator } from 'react-native-paper';

const Header = (props) => {

    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View>
                <ActivityIndicator/>
            </View>
        )
    }
    return (
        <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: "Rubik" }}>

            </Text>
        </View>
    )
}

export default Header