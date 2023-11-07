import React from "react"
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native"
import { useFonts } from "expo-font"
const NotifiChat = () => {

    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }

    return (
        <View style={styles.notifiChild}>
            <View style={styles.itemNotifi}>
                <View style={styles.contentNotifi}>

                    <View style={styles.contentNotifiLeft}>
                        <View style={{
                            display: "flex",
                            alignItems: "center",
                            padding: 6
                        }}>
                            <Image source={require('../assets/favicon.png')}></Image>
                            <Text style={styles.notifiName}>Viettel</Text>
                        </View>
                    </View>

                    <View style={styles.contentNotifiRight}>
                        <Text style={styles.scriptNotifi}>
                            Chúc mừng bạn ứng đã ứng tuyển thành công vài vị trí Full Stack - Developer của công ty Viettel. Hẹn gặp bạn ở vòng phỏng vấn nhé!
                        </Text>
                    </View>

                </View>

                <View style={styles.timeNotifi}>
                    <Text style={{
                        fontFamily: "RukbikNormal",
                        marginTop: 4
                    }}>2 hours</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notifiChild: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        paddingTop: 20
    },
    contentNotifiLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        gap: 10
    },
    notifiName: {
        fontFamily: "Rubik",
        fontSize: 16,
        color: "#000",
        marginTop: 10
    },
    contentNotifiRight: {
        width: "60%"
    },
    contentNotifi: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        width: "100%"
    },
    itemNotifi: {
        borderWidth: 2,
        borderColor: "#000",
        width: "85%",
        borderRadius: 16,
        padding: 10
    },
    scriptNotifi: {
        fontSize: 16,
        fontFamily: "RukbikNormal",
        color: "#000"
    },
    timeNotifi: {
        display: "flex",
        alignItems: "flex-end",
        marginRight: 10,


    }
})


export default NotifiChat