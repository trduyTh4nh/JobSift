import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Alert } from "react-native";
import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";
import STYLE from "../assets/css/universal";
import axios from "axios";
import { API_URL } from "../constants/etc";
import { useIsFocused } from "@react-navigation/native";

const Profile = ({navigation}) =>{
    const [applyCount, setApplyCount] = useState(-1)
    const [cvCount, setCVCount] = useState(-1)
    const logOut = () => {
        Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất? Bạn sẽ mất quyền truy cập vào tài khoản này.',
        [
            {text: 'Không'},
            {text: 'Có', onPress: () => {
                global.user = null
                navigation.navigate('Home')
            }},
           
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

                setApplyCount(num.toString().padStart(2, '0'))
            }).catch(e => {
                console.error(e)
            })
            axios.post(API_URL + '/cvcount', {
                "id_user": global.user.user.id_user
            }).then(e => {
                console.log(e.data)
                const num = e.data[0].cv_count
                setCVCount(num.toString().padStart(2, '0'))
            }).catch(e => {
                console.error(e)

            })
        }
    }, [focus])

    
  // console.log("User profile" + JSON.stringify(user))

    return (
        <ScrollView style={{paddingBottom:200}}>
        <View style={styles.wrap}>
            <View style={styles.container}>
                <View style={styles.vien}>
                    <View style={styles.Xuongdong1}>
                        <Text style={styles.chutrongvien}> {applyCount} </Text>
                        <Text style={styles.chutrongvien2}> Đã ứng tuyển </Text>
                    </View>
                    <View style={styles.Xuongdong1}>
                        <Text style={styles.chutrongvien}> {cvCount} </Text>
                        <Text style={styles.chutrongvien2}> CV </Text>
                    </View>
                </View>


                    <View style={styles.daugach}>


                </View>
                <TouchableOpacity onPress={() => {navigation.navigate('Công cụ tính lương')}} style={styles.dongngang}>
                    <View style={styles.dongngang1}> 
                        <Icon name="calculator-line"></Icon>
                        <Text style={styles.chucuaslart}> Công cụ tính lương </Text>
                    </View>
                    <Icon name="arrow-right-s-line" ></Icon>
                </TouchableOpacity>
                <View style={styles.daugach}></View>

                <TouchableOpacity style={styles.dongngang} onPress={() => {navigation.navigate('Transaction')}}>
                    <View style={styles.dongngang1}> 
                        <Icon name="money-dollar-circle-line"></Icon>
                        <Text style={styles.chucuaslart}> Lịch sử giao dịch </Text>
                    </View>
                    <Icon name="arrow-right-s-line" ></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.navigate('Edit Profile Info')}} style={styles.dongngang}>
                    <View style={styles.dongngang1}> 
                        <Icon name="pencil-line"></Icon>
                        <Text style={styles.chucuaslart}> Chỉnh sửa t.tin cá nhân </Text>
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
                 <TouchableOpacity style={styles.dongngang} onPress={() => { navigation.navigate('CV') }}>
                        <View style={styles.dongngang1}>
                            <Icon name="profile-line"></Icon>
                            <Text style={styles.chucuaslart}> CV </Text>
                        </View>
                        <Icon name="arrow-right-s-line" ></Icon>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.dongngang} onPress={() => {navigation.navigate('Favorite Page')}}>
                    <View style={styles.dongngang1}> 
                        <Icon name="star-line"></Icon>
                        <Text style={styles.chucuaslart}> Bài đăng yêu thích </Text>
                    </View>
                    <Icon name="arrow-right-s-line" ></Icon>
                </TouchableOpacity>
                <View style={styles.daugach}></View>
                <TouchableOpacity onPress={() => {navigation.navigate('Tình trạng ứng tuyển')}} style={styles.dongngang}>
                    <View style={styles.dongngang1}> 
                        <Icon name="check-line"></Icon>
                        <Text style={styles.chucuaslart}> Tình trạng ứng tuyển </Text>
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
                        <Text style={styles.chucuaslart}> Đăng xuất</Text>
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
    chutrongvien:{
        ...STYLE.textTitle,
        fontSize: 25,
        fontWeight: '900',
        color: '#000'
    },
    chutrongvien2:{
        ...STYLE.textNormal,
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },
    daugach: {
        marginTop: 24,
        borderColor: "#B0B0B0",
        borderWidth: 1.5,

    },
    chucuaslart:{
        ...STYLE.textNormal,
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