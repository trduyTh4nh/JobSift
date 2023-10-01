import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const Home = ({ navigation }) => {
    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // dùng useEffect để fetch data từ API về
    useEffect(() => {
        // dùng hàm async 
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.116.1:3001');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // await là đợi thằng async đồng bộ xong nhảy vào thằng await chuyển thành
                // json xong dùng useState set dữ liệu cho Postdata
                const data = await response.json();
                setPostData(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    // const [fontsLoaded] = useFonts({
    //     Rubik: require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     RukbikNormal: require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),

    // });

    // if (!fontsLoaded) {
    //     return null;
    // }

    const nearbyJobsData = [
        { id: '1', title_job: 'SoftWare Engineer', jobCate: 'Full-time' },
        { id: '2', title_job: 'Front-End Dev', jobCate: 'Part-time' },
        { id: '3', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '4', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '5', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '6', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '7', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '8', title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '9', title_job: 'Mobile Dev', jobCate: 'Full-time' },
    ];

    const renderJobNearBy = ({ item }) => (
        <NearbyJob dataNearby={item} />
    );


    const renderItem = ({ item }) => (
        <CardJob dataPost={item} onPress={() => { navigation.navigate('JobDetail', { postData: item }) }} />
    );


    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <View style={styles.wrap_welcome}>
                    <Text style={styles.sayhi}>Hi, </Text>
                    <Text style={styles.userName}>Steve 👋</Text>
                </View>
                <Text style={styles.welcomeMessage}>Start Your New Journey</Text>
            </View>

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

            <View style={styles.wrapTitle}>
                <Text style={styles.titleHomeJob}>Popular jobs</Text>

                <TouchableOpacity><Text style={styles.titleHomeShowMore}>Show all</Text></TouchableOpacity>
            </View>




            <View style={styles.container}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={postData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_post.toString()}
                        horizontal={true}
                        contentContainerStyle={{ columnGap: 20 }}
                    />
                )}
            </View>


            <View style={styles.wrapTitle}>
                <Text style={styles.titleHomeJob}>Nearby jobs</Text>
            </View>

                <FlatList
                    data={nearbyJobsData}
                    renderItem={renderJobNearBy}
                    keyExtractor={(item) => item.id.toString()}
                ></FlatList>




        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20
    },
    container: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightblue',
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
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },

    },
    userName: {
        fontSize: 16,
        // fontFamily: 'Rubik',

    },
    welcomeMessage: {
        // fontFamily: 'RukbikNormal',
        fontSize: 24
    },
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row'
    },
    sayhi: {
        fontSize: 16,
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
        color: '#ABABAB',
        width: "78%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 16,
        // fontFamily: 'RukbikNormal'

    },
    searchBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 30 },
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
    }
    ,
    titleHomeJob: {
        // fontFamily: "RukbikNormal",
        fontWeight: "700",
        fontSize: 16
    },
    wrapTitle: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10
    },
    titleHomeShowMore: {
        // fontFamily: "RukbikNormal",
        fontWeight: "500",
        color: "rgba(171,171,171,1)"
    },
    nearByJobContainer: {
        marginTop: 10
    }



})

export default Home