import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";

import Icon from 'react-native-remix-icon';
import JobDetail from "./JobDetail";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';


import CardJobDetail from "./CardJobDetail";
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const CardJob = (props) => {
    const navigation = useNavigation();
    const { dataPost } = props;
    
    return (
        <CardJobDetail dataPostDetail={dataPost}></CardJobDetail>
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

