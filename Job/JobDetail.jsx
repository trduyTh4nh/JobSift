import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-remix-icon';
import { COLORS, FONT } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildInFoJob from "../src/childJob";
import ChildCompany from "../src/childJobCompany";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();
const JobDetail = () => {
    const route = useRoute();
    const dataPostDetail = route.params ? route.params.dataPostDetail : null;

    console.log(dataPostDetail);

    if (!dataPostDetail) {
        // Handle the case where dataPostDetail doesn't exist
        return (
            <Text>Oops...</Text>
        );
    }

    return (
        <View style={styles.containerJobDetail}>



            <View style={styles.headerJobInFoWrap}>

                <View style={styles.headerJobInFo}>
                    <View style={styles.wrapInfoJob}>
                        <Text style={styles.nameJob}>IT</Text>
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
                    <Tab.Screen style={styles.tabInFoJob_test} name="child-info-job" component={ChildInFoJob} options={{
                        title: "Job",
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? 'black' : 'gray', fontSize: 16, fontWeight: "800" }}>
                                Job
                            </Text>
                        ),
                    }} />
                    <Tab.Screen name="child-company" component={ChildCompany} options={{
                        title: "Company",
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ color: focused ? 'black' : 'gray', fontSize: 16, fontWeight: "800" }}>
                                Company
                            </Text>
                        ),

                    }} />
                </Tab.Navigator>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    containerJobDetail: {
        paddingTop: 10
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
        width: "46%",
        padding: 15,
        display: 'flex',
        gap: 10
    },
    wrapFeartureJob: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: "51%",
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
        elevation: 10
    },
    wrapDiamond: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameJob: {
        fontSize: 22,
        fontWeight: "800",
        color: '#323232',

    },
    nameCompany: {
        fontSize: 16,
        fontWeight: '800',
        color: '#323232'
    },
    datePost: {
        fontSize: 14,
        color: '#323232'
    },
    wrapDiamond: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    headerJobInFoWrap: {

    },
    headerRate: {
        padding: 15,

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
        gap: 10,
        alignItems: "center"

    },
    textStartDetail: {
        fontWeight: "700",
        fontSize: 18,
        color: "#000"
    },
    rateReviewDetal: {
        marginTop: 10,
        color: "#000",
        fontWeight: "500"
    },
    bodyJobDetail: {
        marginTop: 10,
        height: 400
    },
    tabInFoJob: {



    },
    tabInFoJob_test: {

    },
    numberOfDiamond: {
        fontWeight: "700",
        fontSize: 16
    }

})


export default JobDetail