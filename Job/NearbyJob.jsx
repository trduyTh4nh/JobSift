import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-remix-icon';
import axios from "axios";
import { API_URL } from "../constants/etc";

const NearbyJob = (props) => {
    const { dataNearby, onFavouritePress } = props
    const navigation = useNavigation();

    const goToJobDetailScreen = () => {
        navigation.navigate("JobDetail", { postData: dataNearby });
    };
    const [isLoading, setLoading] = useState(true)
    const [isFav, setFav] = useState(false)
    useEffect(() => {
        fetchFav()
    }, [])
    const fetchFav = () => {
        axios.post(`${API_URL}/getpostfavourite`, {
            "id_user": global.user.user.id_user,
            "id_job": dataNearby.id_post
        }).then(e => {
            setFav(e.data)
            setLoading(false)
        }).catch(e => {
            setLoading(true)
        })
    }
    const fav = () => {
        axios.post(`${API_URL}/addfavourite`, {
            "id_user": global.user.user.id_user,
            "id_job": dataNearby.id_post
        }).then(e => {
            setLoading(true)
            if(onFavouritePress != undefined)
                onFavouritePress()
            fetchFav()
        }).catch(e => {
            Alert.alert('Error', 'There is an error during the upload process, please try again. Details: ' + e)
        })
    }

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
                                style={{borderRadius: 8}}
                                source={{
                                    uri: dataNearby ? dataNearby.logo_dn : 'https://cdn-icons-png.flaticon.com/512/306/306424.png'
                                }}
                                width={40}
                                height={40}
                            />

                            <Text style={styles.nearByJobName}>{dataNearby.tieu_de}</Text>
                        </View>


                        <View style={styles.wrapIcon}>
                            <TouchableOpacity onPress={fav} style={{
                                backgroundColor: '#E2F367',
                                padding: 10,
                                borderRadius: 12,
                                elevation: 10,
                                shadowColor: '#A6BD00',
                                shadowOpacity: 0.3,
                                shadowOffset: {
                                    height: 4
                                }

                            }}>

                                <Icon name={isFav ? "heart-fill" : "heart-line"}></Icon>
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
                            <Text style={styles.nearByJobCategory}>{dataNearby.ten_loai}</Text>
                        </View>

                        <View style={styles.itemInNearBy}>
                            <Icon name="money-cny-circle-line"></Icon>
                            <Text style={styles.nearByJobCategory}>{`${dataNearby.currency}${dataNearby.luong ? dataNearby.luong.toLocaleString() : 0} - ${dataNearby.currency}${dataNearby.highest_salary ? dataNearby.highest_salary.toLocaleString() : 0}`}</Text>
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