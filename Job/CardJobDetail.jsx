import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-remix-icon';
import JobDetail from "./JobDetail";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


const Stack = createNativeStackNavigator();



const CardJobDetail = (props) => {
    const navigation = useNavigation();

    const { dataPostDetail } = props;


    const goToJobDetailScreen = () => {
        navigation.navigate("JobDetail", { postData: dataPostDetail });
    };

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
                        <Image source={{uri: dataPostDetail ?  dataPostDetail.logo_dn : "https://limosa.vn/wp-content/uploads/2023/08/job-la-gi.jpg" }}
                            style={{ width: 45, height: 45, borderWidth: 2, borderColor: "#fff", borderRadius: 8, padding: 3 }}
                        ></Image>

                        <View style={styles.jobCardName}>
                            <Text style={styles.jobCardNameCompany}>{dataPostDetail.tieu_de}</Text>
                            <Text style={styles.jobCardAddress}>{ truncateText(dataPostDetail.dia_chi, 18)}</Text>
                            
                        </View>

                        <TouchableOpacity>
                            <Icon name="heart-line" color="#fff" style={styles.iconFavorite} size={30}></Icon>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.jobCardBody}>
                        <Text style={styles.nameJob}>{dataPostDetail.nganh_nghe}</Text>

                        <View style={styles.jobCate}>
                            <Text style={styles.jobCateName}>{dataPostDetail.job_category}</Text>
                            <Icon name="arrow-right-s-fill" color="#fff"></Icon>
                            <Text style={styles.jobSalary}>$750 - $900</Text>
                            
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
        marginBottom: 20,
        marginLeft: 10
    }
    ,
    jobCardHeader: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
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
        margin: 5,
        fontFamily: "Rubik"
    },
    wrapJobCard: {
        marginTop: 30,
    },
    jobCardAddress: {
        color: "#fff",
        fontFamily: "RukbikNormal",
        width: 140

    },
    jobCardName: {
        justifyContent: "center",
        fontFamily: "RukbikNormal"

    },
    nameJob: {
        color: "#fff",
        fontFamily: "RukbikNormal"
    },
    jobCardBody: {
        margin: 10
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
        marginTop: -30,
        size: 30
    }
})

