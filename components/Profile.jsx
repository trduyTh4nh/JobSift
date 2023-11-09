import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Alert } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";
import axios from "axios";
import { API_URL } from "../constants/etc";
import { useIsFocused } from "@react-navigation/native";
const Profile = ({ navigation }) => {
    const [count, setApply] = useState({ apply: -1, cv: -1 })
    const logOut = () => {
        Alert.alert('Logout', 'Do you want to logout, you will lose access to your account.',
            [
                {
                    text: 'Yes', onPress: () => {
                        global.user = null
                        navigation.navigate('Home')
                    }
                },
                { text: 'No' },
            ])
    }
    const focus = useIsFocused()
    useEffect(() => {
        if (focus) {

            axios.post(API_URL + '/application', {
                "id_user": global.user.user.id_user
            }).then(e => {
                console.log(e.data)
                const num = e.data.length
                setApply({
                    ...count,
                    apply: num.toString().padStart(2, '0')
                })
            }).catch(e => {
                console.error(e)
            })
        }
    }, [focus])
    useEffect(() => {
        axios.post(API_URL + '/cvcount', {
            "id_user": global.user.user.id_user
        }).then(e => {
            console.log(e.data)
            const num = e.data[0].cv_count
            setApply({
                ...count,
                cv: num.toString().padStart(2, '0')
            })
        }).catch(e => {
            console.error(e)
        })
    }, [focus])

    // console.log("User profile" + JSON.stringify(user))

    return (
        <ScrollView style={{ paddingBottom: 200 }}>
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <View style={styles.vien}>
                        <View style={styles.Xuongdong1}>
                            <Text style={styles.chutrongvien}> {count.apply} </Text>
                            <Text style={styles.chutrongvien2}> Applied jobs </Text>
                        </View>
                        <View style={styles.Xuongdong1}>
                            <Text style={styles.chutrongvien}> {count.cv} </Text>
                            <Text style={styles.chutrongvien2}> CVs </Text>
                        </View>
                        <View style={styles.Xuongdong1}>
                            <Text style={styles.chutrongvien}> 02 </Text>
                            <Text style={styles.chutrongvien2}> Cover Letters </Text>
                        </View>

                    </View>

                    <View style={styles.daugach}>

                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Salary Calculator') }} style={styles.dongngang}>
                        <View style={styles.dongngang1}>
                            <Icon name="calculator-line"></Icon>
                            <Text style={styles.chucuaslart}> Salary Calculator </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>
                    <View style={styles.daugach}></View>

                    <TouchableOpacity style={styles.dongngang} onPress={() => {navigation.navigate('Transaction')}}>
                        <View style={styles.dongngang1}>
                            <Icon name="money-dollar-circle-line"></Icon>
                            <Text style={styles.chucuaslart}> Transaction history </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Edit Profile Info') }} style={styles.dongngang}>
                        <View style={styles.dongngang1}>
                            <Icon name="pencil-line"></Icon>
                            <Text style={styles.chucuaslart}> Edit account info </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <View style={styles.daugach}></View>

                    <TouchableOpacity style={styles.dongngang} onPress={() => { navigation.navigate('CV') }}>
                        <View style={styles.dongngang1}>
                            <Icon name="profile-line"></Icon>
                            <Text style={styles.chucuaslart}> CV </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dongngang}>
                        <View style={styles.dongngang1}>

                            <Icon name="profile-line"></Icon>
                            <Text style={styles.chucuaslart}> Cover Letter </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dongngang} onPress={() => { navigation.navigate('Favorite Page') }}>
                        <View style={styles.dongngang1}>
                            <Icon name="star-line"></Icon>
                            <Text style={styles.chucuaslart}> Favourite Jobs </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <View style={styles.daugach}></View>

                    <TouchableOpacity style={styles.dongngang}>
                        <View style={styles.dongngang1}>
                            <Icon name="check-line"></Icon>
                            <Text style={styles.chucuaslart}>Application Status </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>


                    <View style={styles.daugach}></View>
                    <TouchableOpacity onPress={() => { navigation.navigate('PrivacyAndPrivacy') }} style={styles.dongngang}>
                        <View style={styles.dongngang1}>
                            <Icon name="shield-line"></Icon>
                            <Text style={styles.chucuaslart}>Quyền và luật</Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={logOut} style={styles.dongngang}>
                        <View style={styles.dongngang1}>
                            <Icon name="logout-box-line"></Icon>
                            <Text style={styles.chucuaslart}>Log out </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>




                </View>



            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrap_info: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    wrap: {
        paddingTop: 0,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        paddingBottom: 100,
    },
    container: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
        flexDirection: 'column',
    },
    welcomeMessage: {
        // fontFamily: 'RukbikNormal',
        fontSize: 24,
        color: '#000',
        alignContent: "center",
        fontWeight: '900'

    },
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        gap: 10
    },
    wrapinFo: {
        display: 'flex',
        flexDirection: 'row',
    },
    sayhi: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400'

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
    },
    vien: {
        display: "flex",
        flexDirection: "row",
        gap: 45,
        alignItems: "center",
        borderColor: "#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,

        padding: 10,
        justifyContent: 'space-evenly'

    },
    Xuongdong1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    chutrongvien: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000'
    },
    chutrongvien2: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },
    daugach: {
        marginTop: 24,
        borderColor: "#B0B0B0",
        borderWidth: 1.5,

    },
    chucuaslart: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    dongngang: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 24,

    },
    dongngang1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",

    }
}

)
export default Profile