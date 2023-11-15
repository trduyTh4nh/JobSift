import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, ActivityIndicatorComponent, ActivityIndicator, Alert } from "react-native";
import Icon from 'react-native-remix-icon';
import JobDetail from "./JobDetail";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { API_URL } from "../constants/etc";
const Stack = createNativeStackNavigator();



const CardJobDetail = (props) => {
    const navigation = useNavigation();
    const { dataPostDetail, onFavourite } = props;
    const [isLoading, setLoading] = useState(true)
    const [isFav, setFav] = useState(false)
    useEffect(() => {
        fetchFav()
    }, [])
    const getSimplifiedSalary = (s) => {
        if (s / 1000000 >= 1) {
            return Math.round(s / 1000000) + 'tr'
        } else if (s / 1000 >= 1) {
            return Math.round(s / 1000) + 'k'
        }
        return s
    }
    const fetchFav = () => {
        if (dataPostDetail) {
            axios.post(`${API_URL}/getpostfavourite`, {
                "id_user": global.user.user.id_user,
                "id_job": dataPostDetail.id_post
            }).then(e => {
                setFav(e.data)
                setLoading(false)
            }).catch(e => {
                setLoading(true)
            })
        }
    }
    const fav = () => {
        if (dataPostDetail) {
            onFavourite()
            axios.post(`${API_URL}/addfavourite`, {
                "id_user": global.user.user.id_user,
                "id_job": dataPostDetail.id_post
            }).then(e => {
                setLoading(true)
                fetchFav()
            }).catch(e => {
                Alert.alert('Error', 'There is an error during the upload process, please try again. Details: ' + e)
            })
        }
    }
    const goToJobDetailScreen = () => {
        navigation.navigate("JobDetail", { postData: dataPostDetail });
    };

    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/SF-Pro-Rounded-Heavy.otf"),
        'RukbikNormal': require("../assets/fonts/SF-Pro.ttf")
    })


    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }



    return (
        <TouchableOpacity style={styles.wrapJobCard} onPress={goToJobDetailScreen} >
            <View style={styles.jobCard}>
                <View style={styles.jobCardInfo}>
                    <View style={styles.jobCardHeader}>

                        <View style={{ ...styles.jobCardHeader, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image source={{ uri: dataPostDetail ? dataPostDetail.logo_dn : "https://limosa.vn/wp-content/uploads/2023/08/job-la-gi.jpg" }}
                                style={{ width: 45, height: 45 }}
                            ></Image>

                            <View style={styles.jobCardName}>
                                <Text style={styles.jobCardNameCompany}>{dataPostDetail.tieu_de}</Text>
                                <Text style={styles.jobCardAddress}>{truncateText(dataPostDetail.dia_chi, 18)}</Text>

                            </View>

                            {/* //                         <Image source={{uri: dataPostDetail ?  dataPostDetail.logo_dn : "https://limosa.vn/wp-content/uploads/2023/08/job-la-gi.jpg" }}
//                             style={{ width: 45, height: 45, borderWidth: 2, borderColor: "#fff", borderRadius: 8, padding: 3 }}
//                         ></Image>

//                         <View style={styles.jobCardName}>
//                             <Text style={styles.jobCardNameCompany}>{dataPostDetail.tieu_de}</Text>
//                             <Text style={styles.jobCardAddress}>{ truncateText(dataPostDetail.dia_chi, 18)}</Text> */}


                        </View>

                        {/* <TouchableOpacity onPress={fav}>
                        {
                            isLoading ? (<ActivityIndicator/>) : (
                                <Icon name={isFav ? 'heart-fill' : 'heart-line'} color="#fff" style={styles.iconFavorite} size={30}></Icon>
                            )
                        }
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.jobCardBody}>
                        <Text style={styles.nameJob}>{dataPostDetail.nganh_nghe}</Text>

                        <View style={styles.jobCate}>
                            <Text style={styles.jobCateName}>{dataPostDetail.job_category}</Text>
                            <Icon name="arrow-right-s-fill" color="#fff"></Icon>
                            <Text style={styles.jobSalary}>{`${dataPostDetail.currency}${getSimplifiedSalary(dataPostDetail.luong)} - ${dataPostDetail.currency}${getSimplifiedSalary(dataPostDetail.highest_salary)}`}</Text>

                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    )
}


export default CardJobDetail

const styles = StyleSheet.create({
    titleHomeJob: {
        color: "#999",
        fontFamily: "RukbikNormal",
        fontWeight: "700"
    },
    wrapTitle: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10
    },
    jobCard: {
        backgroundColor: "rgba(35, 35, 35, 1)",
        width: "95%",
        borderRadius: 16,
        paddingTop: 25,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 15,
        elevation: 8,
        marginBottom: 12,
        marginLeft: 10
    }
    ,
    jobCardHeader: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        paddingRight: 10,
        gap: 10
    },
    jobCate: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    jobCardNameCompany: {
        color: "#ffff",
        fontFamily: "Rubik"
    },
    wrapJobCard: {
        marginTop: 0,

    },
    jobCardAddress: {
        color: "#fff",
        fontFamily: "RukbikNormal",
        width: 140

    },
    jobCardName: {
        justifyContent: "center",
        fontFamily: "RukbikNormal",
        gap: 5
    },
    nameJob: {
        color: "#fff",
        fontFamily: "RukbikNormal"
    },
    jobCardBody: {
        marginTop: 10
    },
    jobCateName: {
        color: "#fff",
        fontFamily: "RukbikNormal"

    },
    jobSalary: {
        color: "#fff",
        fontFamily: "RukbikNormal"

    },
    iconFavorite: {

    }
})

