import STYLE from "../assets/css/universal"
const { View, Text, StyleSheet } = require("react-native")
import Icon from "react-native-remix-icon"
import { SIZES } from "../constants"
const Error = ({icon, title, message}) => {
    return (
        <View style={style.body}>
            <Icon name={icon} size={52}/>
            <Text style={style.textLarge}>{title}</Text>
            <Text>{message}</Text>
        </View>
    )
}
const style = StyleSheet.create({
    textLarge: {
        ...STYLE.textBold,
        fontSize: SIZES.xLarge
    },
    body: {
        ...STYLE.body,
        paddingTop: 0,
        gap: 5
    }
})
export default Error