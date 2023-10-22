import STYLE from "../assets/css/universal"
const { View, Text, StyleSheet } = require("react-native")
import Icon from "react-native-remix-icon"
import { SIZES } from "../constants"
const Error = ({style, icon, title, message}) => {
    return (
        <View style={!style ? styleDef.body : style}>
            <Icon name={icon} size={52}/>
            <Text style={styleDef.textLarge}>{title}</Text>
            <Text>{message}</Text>
        </View>
    )
}
const styleDef = StyleSheet.create({
    textLarge: {
        ...STYLE.textBold,
        fontSize: SIZES.xLarge
    },
    body: {
        paddingTop: 0,
        paddding: 0,
        gap: 5
    }
})
export default Error