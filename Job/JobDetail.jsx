import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Animated, Easing, ActivityIndicator, SafeAreaView, Pressable } from "react-native";
import Icon from 'react-native-remix-icon';
import { COLORS, FONT } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildInFoJob from "../src/childJob";
import ChildCompany from "../src/childJobCompany";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from 'expo-font'
import BottomPopup from "../navigation/bottomPopUp";
import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../ipConfig"
import Modal from 'react-native-modal'
import STYLE from "../assets/css/universal";
import * as DocumentPicker from 'expo-document-picker';
const IPcuaQuang = "192.168.1.113"
const IPlD = "192.168.116.1"
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();

const JobDetail = () => {
    const route = useRoute();
    const [hide, setHidden] = useState(true)
    const fadeAnim = new Animated.Value(100);
    const [showPDFCV, setShowPDFCV] = useState(false)
    const [showUngTuyen, setShowUngTuyen] = useState(false)
    const [doanhNghiep, setDoanhNghiep] = useState({})
    const handleDataFromChild = (data) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setHidden(false);
        });
    }
    const handleUploadFile = () => {
        DocumentPicker.getDocumentAsync().then((e) => {
            if(!e.canceled){
                
            }
            console.log(e)
        })
    }
    useEffect(() => {
        if (hide) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }
    }, [hide]);
    const postData = route.params ? route.params.postData : null;
    const datePost = new Date(postData.ngay_post)
    const [totalStar, setTotalStar] = useState('')
    const [quantityUser, setQuantityUser] = useState('')
    const ratingMain = Math.round(totalStar / quantityUser)
    useEffect(() => {
        axios.get(`http://${API_URL}:3001/upfeedback/getrate/${postData.id_post}`, {
        })
            .then((response) => {
                setTotalStar(response.data.rate[0].start)
                console.log(response.data.rate)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // console.log(postData)
    useEffect(() => {
        let isMounted = true;
        axios.post(`http://${API_URL}:3001/ntd/${postData.id_ntd}`, {}, {
        }).then((response) => {
            if (isMounted) {
                setDoanhNghiep(response.data);
            }
        }).catch((error) => {
            console.error(error);
        });
        return () => {
            isMounted = false;
        };
    }, []);
    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }
    if (!postData) {
        return (
            <Text>Opps...</Text>
        );
    }




    let popupRef = React.createRef()

    const onShowPopUp = () => {
        popupRef.show()
    }

    const closePopUp = () => {
        popupRef.close()
    }



    const popUpList = [
        {
            id: 1,
            name: "Hide",
            iconName: "eye-close-line",
            colorTag: "",
            tColor: "#000"
        },
        {
            id: 2,
            name: "Report",
            iconName: "flag-2-line",
            colorTag: "",
            tColor: "#000"


        },
        {
            id: 3,
            name: "Close",
            iconName: "close-circle-line",
            colorTag: "",
            tColor: "#000"

        },


    ]





    const StarRating = ({ totalStars, userRating }) => {
        const filledStars = ratingMain;

        const renderStars = () => {
            const starIcons = [];
            for (let i = 1; i <= 5; i++) {
                const starName = i <= filledStars ? "star-s-fill" : "star-s-line";
                starIcons.push(
                    <Icon
                        key={i}
                        name={starName}
                        size={32}
                        color={i <= filledStars ? "#BACF21" : "#000"}
                    />
                );
            }
            return starIcons;
        };

        return (
            <View style={styles.quantityStart}>
                {renderStars()}
            </View>
        );
    };


    const totalStars = 1;
    const userRating = 0;

    const totalRate = Math.ceil(userRating / (totalStars / 5));

    const handlePDFCVChoose = () => {
        setShowUngTuyen(false)
        setTimeout(() => {
            setShowPDFCV(true)
        }, 400)
       
    }

    return (
        <View style={styles.wrapMain}>
            <View style={styles.containerJobDetail}>
                {hide ?
                    (
                        <Animated.View
                            style={[
                                styles.headerJobInFoWrap,
                                {
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            <View style={styles.headerJobInFoWrap} >
                                <View style={styles.headerJobInFo} >
                                    <View style={styles.wrapInfoJob}>
                                        <Text style={styles.nameJob}>{postData.tieu_de}</Text>
                                        
                                    </View>
                                    <View style={styles.wrapFeartureJob} >
                                        <TouchableOpacity onPress={() => {setShowUngTuyen(true)}} style={styles.buttonApplyJob}>
                                            <Icon name="check-fill" size={24} ></Icon>
                                        </TouchableOpacity>

                                        <View style={styles.wrapDiamond}>
                                            
                                            <Text
                                                style={styles.numberOfDiamond}
                                            >💎 10</Text>
                                        </View>

                                        <TouchableOpacity onPress={onShowPopUp} >
                                            <Icon name="more-line" size={24}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.wrapCompany}>
                                            <Text style={styles.nameCompany}>
                                                {doanhNghiep.ntd ? doanhNghiep.ntd.name_dn : "null"} • 
                                            </Text>
                                            <Text style={styles.datePost}>
                                                Posted on {datePost.toLocaleDateString()}
                                            </Text>
                                </View>
                                <View style={styles.headerRate}>
                                    <View style={styles.rateStar}>
                                        <View style={styles.quantityStart}>
                                            <StarRating totalStars={totalStars} userRating={userRating} />
                                        </View>
                                        <View style={styles.textStart}>
                                            <View style={styles.JobRankNumber}>
                                                <Text style={styles.wrapNumberStartUp}>{!isNaN(ratingMain) ? ratingMain : 0}
                                                <Text style={styles.wrapNumberStart}>/5</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.rateReview}>
                                        <Text style={styles.rateReviewDetal}>{postData.views ? postData.views : "0"} views</Text>
                                    </View>
                                </View>



                                <BottomPopup
                                    ref={(target) => (popupRef = target)}
                                    onTouchOutside={closePopUp}
                                    data={popUpList}
                                    onDataFromChild={handleDataFromChild}>
                                </BottomPopup>

                            </View>
                        </Animated.View>

                    )

                    : (
                        <View style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity onPress={() => setHidden(true)}
                                style={{
                                    width: "70%", display: "flex",
                                    alignItems: "center"
                                }}>
                                <Icon name="arrow-down-s-line" size={35}></Icon>
                            </TouchableOpacity>
                        </View>
                    )
                }



            </View>
            <View style={styles.wrapModal}>
                <Modal
                    style={{margin: 0}}
                    isVisible={showPDFCV}
                    onBackdropPress={() => {setShowPDFCV(false)}}
                    onBackButtonPress={() => {setShowPDFCV(false)}}
                    swipeDirection={'down'}
                    onSwipeComplete={() => {setShowPDFCV(false)}}
                >   
                    <SafeAreaView style={styles.modal}>
                        <View style={styles.modalChild}>
                            <View>
                                <Text style={STYLE.textTitle}>Upload CV</Text>
                                <Text>Please upload your CV (accepted file types: .pdf)</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleUploadFile} style={{...styles.buttonStyle, paddingLeft: 24, paddingRight: 24,paddingTop: 20, paddingBottom: 20, backgroundColor: '#E9E9E9', borderRadius: 16}}>
                                    <Text>Upload file</Text>
                                </TouchableOpacity>
                            </View>
                                <TouchableOpacity style={styles.buttonStyle}>
                                <Text>Apply</Text>
                                <View style={styles.priceTag}>
                                    <Text>💎 30</Text>
                                    <Icon name="arrow-right-s-line"/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePDFCVChoose} style={{...styles.buttonStyle, backgroundColor: '#E9E9E9'}}>
                                <Text>Cancel</Text>
                                <View style={styles.priceTag}>
                                    <Icon name="close-line"/>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
            <View style={styles.wrapModal}>
                <Modal
                    style={{margin: 0}}
                    isVisible={showUngTuyen}
                    onBackdropPress={() => {setShowUngTuyen(false)}}
                    onBackButtonPress={() => {setShowUngTuyen(false)}}
                    swipeDirection={'down'}
                    onSwipeComplete={() => {setShowUngTuyen(false)}}
                >   
                    <SafeAreaView style={styles.modal}>
                        <View style={styles.modalChild}>
                            <Text style={STYLE.textTitle}>Applying for <Text>{postData.tieu_de}</Text> @ {doanhNghiep.ntd ? doanhNghiep.ntd.name_dn : 'Loading'}</Text>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text>Apply with existing CV</Text>
                                <View style={styles.priceTag}>
                                    <Text>💎 10</Text>
                                    <Icon name="arrow-right-s-line"/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePDFCVChoose} style={styles.buttonStyle}>
                                <Text>Apply with PDF CV</Text>
                                <View style={styles.priceTag}>
                                    <Text>💎 30</Text>
                                    <Icon name="arrow-right-s-line"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
            <View style={styles.bodyJobDetail}>
                <Tab.Navigator style={styles.tabInFoJob}
                    tabBarOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                        tabBarPressColor: 'lightgray',
                        tabBarPressOpacity: 0.5,
                        indicatorStyle: {
                            backgroundColor: '#BACF21',
                            height: 4,
                            width: 100
                        },
                        style: { backgroundColor: 'white' },
                    }}
                >
                    <Tab.Screen
                        style={styles.tabInFoJob_test}
                        name="ChildInFoJob"
                        component={ChildInFoJob}
                        initialParams={{
                            postData: postData,
                            dataDN: doanhNghiep,
                        }}
                        options={{
                            title: "Job",
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{
                                    color: focused ? 'black' : 'gray',
                                    fontSize: 16,
                                    fontFamily: "Rubik"
                                }}>
                                    Job
                                </Text>
                            ),
                            tabBarIndicatorStyle: {
                                width: 30,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 30) / 2),
                                backgroundColor: '#000',
                            },
                            tabBarIndicatorContainerStyle: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />




                    <Tab.Screen name="ChildCompany" component={ChildCompany} options={{
                        title: "Company",
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? 'black' : 'gray', fontSize: 16, fontFamily: "Rubik" }}>
                                Company
                            </Text>
                        ),

                        tabBarIndicatorStyle: {
                            width: 80,
                            height: 5,
                            left: ((Dimensions.get('window').width / 2 - 80) / 2),
                            backgroundColor: '#000',
                        },
                    }}
                        initialParams={{ dataDN: doanhNghiep }} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E2F367',
        borderRadius: 50
    },
    priceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    wrapModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        borderRadius: 16,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: '#fff'
    },
    modalChild: {
        padding: 24,
        paddingBottom: 0,
        gap: 16
    },
    wrapMain: {
        backgroundColor: "#fff"
    },
    containerJobDetail: {
        padding: 16
    },
    headerJobDetail: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerJobInFo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    wrapInfoJob: {
        width: "50%",
        display: 'flex',
        gap: 10
    },
    wrapFeartureJob: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'flex-end'
    },
    wrapCompany: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    buttonApplyJob: {
        backgroundColor: '#E2F367',
        width: 58,
        height: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 1)',
        elevation: 10,
    },
    wrapDiamond: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameJob: {
        fontSize: 28,
        color: '#323232',
        fontFamily: "Rubik"
    },
    nameCompany: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "Rubik"
    },
    datePost: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "RukbikNormal"

    },
    wrapDiamond: {
        display: "flex",
        
        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    headerJobInFoWrap: {
        gap: 5
    },
    headerRate: {
    }
    ,
    quantityStart: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    rateStar: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center"

    },
    textStartDetail: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Rubik"
    },
    rateReviewDetal: {
        marginTop: 8,
        color: "#000",
        fontFamily: "RukbikNormal"

    },
    bodyJobDetail: {
        height: 900
    },
    tabInFoJob: {
        fontFamily: "Rubik"

    },
    tabInFoJob_test: {
        fontFamily: "Rubik"

    },
    numberOfDiamond: {
        fontSize: 16,
        fontFamily: "RukbikNormal"
    },
    JobRankNumber: {
        display: "flex",
        flexDirection: "row",
        
    },
    wrapNumberStartUp: {
        fontFamily: "Rubik",
        fontSize: 30,
        color: "#000"
    },
    JobWrapRankStar: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }, wrapNumberStart: {
        fontFamily: "RubikNormal",
        fontSize: 16
    },
    menuPopUp: {
        width: 100,
        height: 100
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuItem: {
        fontSize: 20,
        padding: 15,
        backgroundColor: 'white',
    },
    popUpBottomMenu: {
    },
    wrapPopMenu: {
        elevation: 4
    },
    wrapMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        elevation: 5,
        backgroundColor: "red"
    }, optionOnMenu: {
        backgroundColor: "#ccc"
    },

})


export default JobDetail 