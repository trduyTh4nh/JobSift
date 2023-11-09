import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-remix-icon';



const NearbyJob = (props) => {
    const { dataNearby } = props
    const navigation = useNavigation();

    const goToJobDetailScreen = () => {
        navigation.navigate("JobDetail", { postData: dataNearby });
    };


    // console.log("POPULAR JOBS In Nearby: " + JSON.stringify(dataNearby))

    // const [fontsLoaded] = useFonts({
    //     Rubik: require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     RukbikNormal: require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),

    // });

    // if (!fontsLoaded) {
    //     return null; // Return null or a loading indicator while fonts are loading
    // }

    return (
        <View style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity style={styles.nearbyContainer} onPress={goToJobDetailScreen}>

                <View style={styles.nearByBody}>

                    <View style={styles.wrapHeaderNearby}>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"

                        }} >

                            <Image
                                style={styles.jobImage}
                                source={{
                                    uri: dataNearby ? dataNearby.logo_dn : 'https://cdn-icons-png.flaticon.com/512/306/306424.png'
                                }}
                                width={40}
                                height={40}
                            />

                            <Text style={styles.nearByJobName}>{dataNearby.tieu_de}</Text>
                        </View>


                        <View style={styles.wrapIcon}>
                            <TouchableOpacity style={{
                                backgroundColor: '#E2F367',
                                padding: 10,
                                borderRadius: 12,
                                elevation: 10,
                                shadowColor: '#A6BD00',
                                shadowOpacity: 1

                            }}>
                                <Icon name="heart-line"></Icon>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View
                        style={{
                            width: "100%",
                        }}
                    >
                        <View style={{
                            borderWidth: 1.2,
                            borderRadius: 16,
                            borderColor: "B0B0B0"
                        }}></View>
                    </View>


                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}>


                        <View style={styles.itemInNearBy}>
                            <Icon name="briefcase-line"></Icon>
                            <Text style={styles.nearByJobCategory}>{dataNearby.nganh_nghe}</Text>
                        </View>

                        <View style={styles.itemInNearBy}>
                            <Icon name="money-cny-circle-line"></Icon>
                            <Text style={styles.nearByJobCategory}>${`${dataNearby.luong} - $${dataNearby.luong + 2000}`}</Text>
                        </View>

                        <View style={styles.itemInNearBy}>
                            <Icon name="time-line"></Icon>
                            <Text style={styles.nearByJobCategory}>{`${dataNearby.job_category}`}</Text>
                        </View>



                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nearbyContainer: {
        display: "flex",
        flexDirection: "row",
        elevation: 2,
        width: "95%",
        backgroundColor: "#fff",
        padding: 18,
        gap: 20,
        borderRadius: 16,
        margin: 10,

        shadowColor: '#000',
        shadowOpacity: .08,
        shadowRadius: 5,
        shadowOffset: {
            height: 4
        },
        alignItems: "center",
    },
    nearByJobName: {
        fontFamily: "Rubik",
        alignItems: "center",
        margin: 10,
        color: '#323232',
        fontSize: 16

    },

    nearByJobCategory: {
        fontFamily: "RukbikNormal",
        color: "#000",
        fontSize: 16
    },
    wrapHeaderNearby: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    wrapIcon: {

    },
    nearByBody: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    itemInNearBy: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    }


})

export default NearbyJob