import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import Icon from 'react-native-remix-icon';
import { COLORS, FONT } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildInFoJob from "../src/childJob";
import ChildCompany from "../src/childJobCompany";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from 'expo-font'
// import TabInfo from "../navigation/tabInfo";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const JobDetail = () => {

    const route = useRoute();
    const postData = route.params ? route.params.postData : null;

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

    if (!postData) {
        // Xử lý trường hợp postData không tồn tại
        return (
            <Text>Opps...</Text>
        );
    }

    return (
        <View>
            <View style={styles.containerJobDetail}>
                <View style={styles.headerJobInFoWrap}>

                    <View style={styles.headerJobInFo}>
                        <View style={styles.wrapInfoJob}>
                            <Text style={styles.nameJob}>{postData.tieu_de}</Text>
                            <View style={styles.wrapCompany}>
                                <Text style={styles.nameCompany}>
                                    Apple
                                </Text>
                                <Icon name="git-commit-fill" size={18}></Icon>
                                <Text style={styles.datePost}>
                                    Posted on 9/9/2023
                                </Text>
                            </View>
                        </View>
                        <View style={styles.wrapFeartureJob} >
                            <TouchableOpacity style={styles.buttonApplyJob}>
                                <Icon name="check-fill" size={32} ></Icon>
                            </TouchableOpacity>

                            <View style={styles.wrapDiamond}>
                                <Image
                                    source={require('../assets/diamond_pro.png')}
                                    style={{ width: 15, height: 15 }}
                                ></Image>
                                <Text
                                    style={styles.numberOfDiamond}
                                >10</Text>
                            </View>


                            <TouchableOpacity>
                                <Icon name="more-fill" size={32}></Icon>
                            </TouchableOpacity>

                        </View>
                    </View>



                    <View style={styles.headerRate}>

                        <View style={styles.rateStar}>
                            <View style={styles.quantityStart}>
                                <Icon name="star-s-fill" size={28} color="#BACF21" ></Icon>
                                <Icon name="star-s-fill" size={28} color="#BACF21" ></Icon>
                                <Icon name="star-s-fill" size={28} color="#BACF21" ></Icon>
                                <Icon name="star-half-s-fill" size={28} color="#BACF21" ></Icon>
                                <Icon name="star-s-line" size={28} color="#BACF21" ></Icon>
                            </View>
                            <View style={styles.textStart}>
                                <Text style={styles.textStartDetail}> 4.8/5</Text>
                            </View>
                        </View>
                        <View style={styles.rateReview}>
                            <Text style={styles.rateReviewDetal}>20,492 Views</Text>
                        </View>

                    </View>



                </View>


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
                            with: 100
                        },
                        style: { backgroundColor: 'white' },
                    }}
                >
                    <Tab.Screen style={styles.tabInFoJob_test} name="ChildInFoJob" component={ChildInFoJob} options={{
                        title: "Job",
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{
                                color: focused ? 'black' : 'gray', fontSize: 16, fontFamily: "Rubik"
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

                    }} />
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
                    }} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerJobDetail: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    headerJobDetail: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerJobInFo: {
        display: 'flex',
        flexDirection: 'row',
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
        gap: 10,
        width: "50%",
        justifyContent: 'center'
    },
    wrapCompany: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    buttonApplyJob: {
        backgroundColor: '#E2F367',
        width: 70,
        height: 70,
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
        fontSize: 18,
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
        marginTop: 10,
        color: "#000",
        fontFamily: "RukbikNormal"

    },
    bodyJobDetail: {
        marginTop: 10,
        height: 400
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
    }

})


export default JobDetail 