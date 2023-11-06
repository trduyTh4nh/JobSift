import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import STYLE from "../assets/css/universal";
import NearbyJob from "../Job/NearbyJob";
import { FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native";
import Icon from "react-native-remix-icon";
import { TouchableOpacity } from "react-native";
import { API_URL } from "../constants/etc";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Error from "./Error";
import { useFonts } from "expo-font";
import Modal from 'react-native-modal'



const Job = () => {

    const [showModal, setShowModal] = useState(true)

   
    

    return (
        <View style={{ width: "100%" }}>
            <View style={styles.wrapSearch}>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Find your new job"
                    placeholderTextColor="#999"

                />

                <View style={styles.wrapSearchBtn}>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Icon name="search-line" size={40} color="#fff"></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.fillter}>
                <TouchableOpacity style={{
                    backgroundColor: "#e2f367",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 8,
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontFamily: 'Rubik',
                        fontSize: 14
                    }}>Fillter</Text>
                    <Icon name="equalizer-fill"></Icon>
                </TouchableOpacity>
            </View>

            <View style={{
                paddingLeft: 14,
                paddingRight: 14,
                marginTop: 10,

            }}>
                <Text
                    style={{
                        fontFamily: 'RukbikNormal',
                        color: "#000"
                    }}
                >Showing 123 result of "Hacker"</Text>
            </View>

            {/* <Modal></Modal> */}
        </View>
    )
}

const renderFavJobs = ({ item }) => {
    return (
        <NearbyJob dataNearby={item} />
    )
}
const styles = StyleSheet.create({
    dodgeBottom: {
        paddingBottom: 100
    },
    cards: {
        flexDirection: 'row',
        gap: 16
    },
    text: {
        fontFamily: 'RubikNormal'
    },
    card: {
        fontFamily: 'Rubik',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 10,
        padding: 10,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        borderRadius: 16
    },
    body: {
        height: '100%',
    },
    list: {
        ...STYLE.body
    },
    bottom: {
        borderTopColor: '#B0B0B0',
        borderTopWidth: 2,
        padding: 16,
    },
    grid: {
        gap: 16,
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10

    },
    inputSearch: {
        color: '#000',
        width: "78%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 16,
        fontFamily: 'RukbikNormal',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    searchBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4
    },
    wrapSearchBtn: {

    },

    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "#F3F4F8",
    },
    fillter: {
        marginTop: 20,
        paddingLeft: 14,
        paddingRight: 14
    }
})
export default Job