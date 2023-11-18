// import React from "react";
// import { Text, View } from "react-native";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";



const BuyDiamond = ({ navigation }) => {
    return (
        <ScrollView style={{ paddingBottom: 200 }}>
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <Text style={{
                        ...styles.chucuaslart,
                        fontSize: 20,
                        fontWeight: "800",
                        marginTop: 10
                    }}>Số dư hiện tại</Text>


                    <View style={styles.Xuongdong} >

                        <Text style={{
                            fontSize: 32,
                            fontWeight: '900',
                            color: '#000'
                        }}>💎 100</Text>

                    </View>

                    <View style={{
                        alignItems: "center",
                    }}>
                        <View style={{
                            width: "100%",
                            alignItems: "left",
                            marginTop: 20,
                            paddingLeft: 10,
                        }}>
                            <Text style={{
                                ...styles.chucuaslart,
                                fontSize: 18,
                                fontWeight: "700"
                            }}>Loại gói</Text>
                        </View>

                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            gap: 20
                        }}>
                            <View style={styles.vien}>
                                <View style={{ marginEnd: 10, marginStart: 10 }}>
                                    <Text style={styles.chucuaslart3}>Gói Normal</Text>
                                    <View style={styles.dongngang}>
                                        <Icon name="ri-money-dollar-circle-line"></Icon>
                                        <View style={styles.dongdoc}>
                                            <Text style={styles.chucuaslart1}> Giá </Text>
                                            <View style={styles.dongngang}>

                                                <Text style={styles.chucuaslart}>199.999</Text>
                                                <Text style={styles.chucuaslart}>vnd</Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={styles.dongngang1}>
                                        <View style={styles.wrapSearchBtn}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('MuaKCDetail', { KC: 100, price: 1999, priceText: '199.999'}) }} style={styles.searchBtn}>
                                                <Text style={styles.chucuaslart}>Chi tiết </Text>
                                                <Icon name="arrow-right-s-line" size={27} color="#000"></Icon>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.dongngang} >
                                            <Text style={{ fontSize: 17, color: "#000000" }}>💎 100</Text>

                            <View style={styles.vien}>
                                <View style={{ marginEnd: 10, marginStart: 10 }}>
                                    <Text style={styles.chucuaslart3}>Gói Vip</Text>
                                    <View style={styles.dongngang}>
                                        <Icon name="ri-money-dollar-circle-line"></Icon>
                                        <View style={styles.dongdoc}>
                                            <Text style={styles.chucuaslart1}> Giá </Text>
                                            <View style={styles.dongngang}>

                                                <Text style={styles.chucuaslart}>599.999</Text>
                                                <Text style={styles.chucuaslart}>vnd</Text>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={styles.dongngang1}>
                                        <View style={styles.wrapSearchBtn}>
                                            <TouchableOpacity style={styles.searchBtn} onPress={() => { navigation.navigate('MuaKCDetail', { KC: 600, price: 5999, priceText: '599.999' }) }}>
                                                <Text style={styles.chucuaslart} >Chi tiết </Text>
                                                <Icon name="arrow-right-s-line" size={27} color="#000"></Icon>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.dongngang} >
                                            <Text style={{ fontSize: 17, color: "#000000" }}>💎 600</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>

                            <View style={styles.vien}>
                                <View style={{ marginEnd: 10, marginStart: 10 }}>
                                    <Text style={styles.chucuaslart3}>Gói Super</Text>
                                    <View style={styles.dongngang}>
                                        <Icon name="ri-money-dollar-circle-line"></Icon>
                                        <View style={styles.dongdoc}>
                                            <Text style={styles.chucuaslart1}> Giá </Text>
                                            <View style={styles.dongngang}>

                                                <Text style={styles.chucuaslart}>999.999</Text>
                                                <Text style={styles.chucuaslart}>vnd</Text>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={styles.dongngang1}>
                                        <View style={styles.wrapSearchBtn}>
                                            <TouchableOpacity style={styles.searchBtn} onPress={() => { navigation.navigate('MuaKCDetail', { KC: 1000, price: 10000, priceText: '999.999' }) }}>
                                                <Text style={styles.chucuaslart}>Chi tiết </Text>
                                                <Icon name="arrow-right-s-line" size={27} color="#000"></Icon>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.dongngang} >
                                            <Text style={{ fontSize: 17, color: "#000000" }}>💎 1000</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>



            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrap: {
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 100,
        backgroundColor: 'white',
    },
    container: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            // fontFamily: 'Raleway-Bold'
        },

        text: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginTop: 30,
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
        },

    },
    userName: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000'
        // fontFamily: 'Rubik',

    },
    Xuongdong: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",

    },

    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        justifyContent: 'space-between',
    },


    sayhi: {
        fontSize: 18,
        color: '#000'
        // fontFamily: 'RukbikNormal',
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        marginTop: 16
    },
    inputSearch: {
        color: '#F1F1F1',
        width: "100%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,


        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 5,



        // fontFamily: 'RukbikNormal'

    },
    searchBtn: {
        width: 110,
        height: 40,
        backgroundColor: '#E2F367',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
    },


    chucuaslart: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',

    },
    chucuaslart1: {
        fontSize: 16,
        // fontWeight:'900',
        color: '#ABABAB',

    },
    chucuaslart3: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000',

    },
    vien: {
        display: "flex",
        flexDirection: "column",
        borderColor: "#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 15,
        padding: 10,
        width: "95%"


    },
    dongngang: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,

    },
    dongdoc: {
        display: "flex",
        flexDirection: "column",

    },
    dongngang1: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 10
    }
}
)

export default BuyDiamond