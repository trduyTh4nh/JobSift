import React from 'react'
import { Text, View } from "react-native";
import { useFonts } from "expo-font"

const Header = (props) => {

    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View>
                <Text>Loading..........</Text>
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