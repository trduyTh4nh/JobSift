import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";
// import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import JobDetail from "./JobDetail";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const CardJob = (props) => {
    const navigation = useNavigation();
    const { dataPost } = props;
    
    const goToDetailsScreen = () => {
        navigation.navigate('JobDetail'); // Navigate to the "DetailsScreen"
      };
    
  

    // const [fontsLoaded] = useFonts({
    //     Rubik: require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     RukbikNormal: require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),

    // });


    // if (!fontsLoaded) {
    //     return null; // Return null or a loading indicator while fonts are loading
    // }

    return (
        <View  style={styles.cardContainer}  >
            <Stack.Screen name="JobDetail" component={JobDetail} />
            <TouchableOpacity onPress={goToDetailsScreen} style={styles.wrapJobCard}>
                <View style={styles.jobCard}>
                    <View style={styles.jobCardInfo}>
                        <View style={styles.jobCardHeader}>
                            <Image source={require('../assets/logo_google.png')}
                                style={{ width: 45, height: 45 }}
                            ></Image>

                            <View style={styles.jobCardName}>
                                <Text style={styles.jobCardNameCompany}>{dataPost.tieu_de}</Text>
                                <Text style={styles.jobCardAddress}>{dataPost.dia_chi}</Text>
                            </View>

                            <TouchableOpacity>
                                <Icon name="heart-line" color="#fff" style={styles.iconFavorite} size={30}></Icon>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.jobCardBody}>
                            <Text style={styles.nameJob}>{dataPost.nganh_nghe}</Text>

                            <View style={styles.jobCate}>
                                <Text style={styles.jobCateName}>{dataPost.job_category}</Text>
                                <Icon name="arrow-right-s-fill" color="#fff"></Icon>
                                <Text style={styles.jobSalary}>$750 - $900</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
}


export default CardJob

const styles = StyleSheet.create({
    titleHomeJob: {
        color: "#999",
        // fontFamily: "RukbikNormal",
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
        elevation: 10,
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
        fontWeight: "700",
        // fontFamily: "RukbikNormal"
    },
    wrapJobCard: {
        marginTop: 30,
    },
    jobCardAddress: {
        color: "#fff",
        // fontFamily: "RukbikNormal",
        width: 140

    },
    jobCardName: {
        justifyContent: "center",
        // fontFamily: "RukbikNormal"

    },
    nameJob: {
        color: "#fff",
        fontWeight: "700",
        // fontFamily: "RukbikNormal"

    },
    jobCardBody: {
        margin: 10
    },
    jobCateName: {
        color: "#fff",
        // fontFamily: "RukbikNormal"

    },
    jobSalary: {
        color: "#fff",
        // fontFamily: "RukbikNormal"

    },
    iconFavorite: {
        marginTop: -30,
        size: 30
    }
})

