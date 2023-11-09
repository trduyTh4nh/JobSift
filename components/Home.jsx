import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";
import reactNativeConfig from "../react-native.config";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API_URL } from "../ipConfig";
import { useNavigation } from '@react-navigation/native';
import STYLE from "../assets/css/universal";
import { ActivityIndicator } from "react-native";

import { useFonts } from "expo-font";

import axios from "axios";

const Stack = createNativeStackNavigator();

const IPcuaQuang = "192.168.1.113"


const Home = ({ navigation }) => {
    // const focus = useIsFocused()

    const userDB = global.user



    const nearbyJobsData = [
        { id: '1', salary: [200, 500], title_job: 'SoftWare Engineer', jobCate: 'Full-time' },
        { id: '2', salary: [200], title_job: 'Front-End Dev', jobCate: 'Part-time' },
        { id: '3', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '4', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '5', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '6', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '7', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '8', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
        { id: '9', salary: [200], title_job: 'Mobile Dev', jobCate: 'Full-time' },
    ];

    const [popularJob, setPopuplarJob] = useState({})

    const focus = useIsFocused()

    useEffect(() => {
        axios.post(`http://${API_URL}:3001/popularjob`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            const dataPopularJob = respone.data.popularjob
            setPopuplarJob(dataPopularJob)
        }).catch((error) => {
            console.error(error)
        })
    }, [focus])

    const refreshJob = () => {
        setPopuplarJob([])
        axios.post(`http://${API_URL}:3001/popularjob`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            const dataPopularJob = respone.data.popularjob
            setPopuplarJob(dataPopularJob) 
        }).catch((error) => {
            console.error(error)
        })
    }
 

    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);




    // Use useEffect to fetch data from the API

    useEffect(() => {
        if (focus) {

            if (!global.user) {
                console.log('User is not logged in')
                setTimeout(() => {
                    navigation.navigate('LoginForm')
                }, 500)
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'none' }
                })

                
                fetchData().catch((e) => {console.error(e)});
            }
        }, [focus]);
        const fetchData = async (refresh) => {
            if(refresh){
                setPostData([])
            }
            try {
                const response = await fetch(`http://${API_URL}:3001`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIsLoading(false);
                setPostData(data);
            } catch (error) {
                console.log('Error fetching data:', error);
                setIsLoading(false);
            }
        };

//                 return
//             }
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: STYLE.tabBarStyle
//             })
//             const fetchData = async () => {
//                 try {

//                     const response = await fetch(`http://${API_URL}:3001`);
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     const data = await response.json();
//                     setIsLoading(false);
//                     setPostData(data);
//                 } catch (error) {
//                     console.log('Error fetching data:', error);
//                     setIsLoading(false);
//                 }
//             };

//             fetchData().catch((e) => { console.error(e) });
//         }
//     }, [focus]);


    /*
          navigation.getParent()?.setOptions({
              tabBarStyle: STYLE.tabBarStyle
          })
          const fetchData = async () => {
              try {
  
                  const response = await fetch(`http://${API_URL}:3001/`);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  // console.log("DATA JOB ALL: " + JSON.stringify(data))
                  setIsLoading(false);
                  setPostData(data);
              } catch (error) {
                  console.log('Error fetching data:', error);
                  setIsLoading(false);
              }
          };
  
          fetchData().catch((e) => { console.error(e) });
      }, [navigation]);
      */



    // const [postData, setPostData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // // dùng useEffect để fetch data từ API về
    // useEffect(() => {
    //     // dùng hàm async 
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://192.168.116.1:3001');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             // await là đợi thằng async đồng bộ xong nhảy vào thằng await chuyển thành
    //             // json xong dùng useState set dữ liệu cho Postdata
    //             const data = await response.json();
    //             setPostData(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.log('Error fetching data:', error);
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    




    const RenderJobNearBy = ({ item, onfavourite }) => (
        <NearbyJob dataNearby={item} onFavouritePress={onfavourite} />
    );


    const RenderItem = ({ item, onfavourite }) => (
        <CardJob onFavourite={onfavourite} dataPost={item} />
    );
    if (!global.user) {
        return (
            <SafeAreaView style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ transform: [{ scale: 0.5 }] }} source={require('../assets/JobSift.png')}></Image>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <View style={styles.wrap_welcome}>
                        <Text style={styles.sayhi}>Xin chào,
                            <Text style={styles.userName}> {userDB.user.full_name} 👋</Text>
                        </Text>
                    </View>

                    <Text style={styles.welcomeMessage}>Hãy bắt đầu hành trình tìm việc của bạn</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Search') }} style={styles.wrapSearch}>

                        <TextInput
                            editable={false}
                            style={styles.inputSearch}
                            placeholder="Tìm kiếm"
                            placeholderTextColor="#999"
                        />

                        <View style={styles.wrapSearchBtn}>
                            <TouchableOpacity style={styles.searchBtn}>
                                <Icon name="search-line" size={40} color="#fff"></Icon>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{marginBottom: 150}}>
                <View style={{marginTop: 16, gap: 10}}>

                    <View style={styles.wrapTitle}>
                        <Text style={styles.titleHomeJob}>Tất cả công việc</Text>

                        <TouchableOpacity><Text style={styles.titleHomeShowMore}>Show all</Text></TouchableOpacity>
                    </View>




                    <ScrollView horizontal style={styles.container_JobList}>
                        {isLoading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <View style={{marginBottom: 10}}>
                                <FlatList
                                    style={{marginLeft: 16}}
                                    data={postData}
                                    renderItem={({item}) => (<RenderItem item={item} onfavourite={() => {refreshJob()}}></RenderItem>)}
                                    keyExtractor={(item) => item.id_post.toString()}
                                    horizontal={true}
                                    scrollEnabled={false}
                                    contentContainerStyle={{ columnGap: 20 }}
                                />
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.wrapTitle}>
                        <Text style={styles.titleHomeJob}>Công việc phổ biến</Text>
                    </View>

                    <FlatList
                        style={styles.wrapJobNearBy}
                        data={popularJob}
                        renderItem={({item}) => (<RenderJobNearBy item={item} onfavourite={() => {}}></RenderJobNearBy>)}
                        keyExtractor={(item) => item.id_post.toString()}
                        contentContainerStyle={{ columnGap: 20 }}
                        scrollEnabled={false}
                    ></FlatList>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {

    },
    scrollable: {
        paddingBottom: 70,
        flex: 1
    },
    wrap: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16
    },
    container: {
        paddingRight: 16,
        paddingLeft: 16
        ,
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
        color: "#000",
        fontFamily: 'Rubik',

    },
    wrapNearByJob: {
        paddingLeft: 0,
        paddingRight: 4,
    },
    
    welcomeMessage: {
        fontFamily: 'RukbikNormal',
        fontSize: 24,

    },
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row'
    },
    sayhi: {
        fontSize: 16,
        fontFamily: 'RukbikNormal',
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        marginTop: 16,

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
        fontFamily: 'RukbikNormal'

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
    }
    ,
    titleHomeJob: {
        fontFamily: "Rubik",
        fontSize: 16,
        marginBottom: 5
    },
    wrapTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16
    },
    titleHomeShowMore: {
        fontFamily: "Rubik",

        color: "rgba(171,171,171,1)"
    },
    nearByJobContainer: {

    },
    wrapJobNearBy: {
        marginBottom: 100
    },




})

export default Home