
import { View, SafeAreaView, Text, Pressable, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import Icon from 'react-native-remix-icon'
import { BlurView } from "expo-blur";
import STYLE from "../assets/css/universal";
import * as ImagePicker from 'expo-image-picker'
import { useEffect } from "react";
export function HeaderProfile({navigation, title, LeftButton}) {
    const back = () => {
        navigation.goBack()
    }

    const user = global.user.user

    const [imgAvatar, setImageAvatar] = useState('')


    useEffect(() => {
        setImageAvatar(user.profile_picture)
    })

    const [image, setImage] = useState()
    const button = LeftButton ? (<TouchableOpacity onPress={back}>
        <Icon name="arrow-left-s-line" size={24}></Icon> 
    </TouchableOpacity>) : undefined
    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        })
        if(!res.canceled){
            console.log(res.assets[0].uri)
            setImage(res.assets[0].uri)
        }
    }
    
        return (
            <View>
                <SafeAreaView style={{backgroundColor: "rgba(255,255,255,1)"}}>
                    <View style={styles.wrap_welcome}>
                        <View style={styles.wrap_info}>
                            {button}
                           
                            {
                                title === 'Edit Profile Info' ? '' : (
                                    <Image source={{uri: imgAvatar ? imgAvatar : 'https://images-ext-2.discordapp.net/external/J0CmYBrUaclT-rSO1X80iEkJ-Sp39yEPnqdiokPwfaU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/515061888258670602/9e4b204e2b74d3264f42fbb933b1e18b.png?width=512&height=512'}} 
                                    style={{
                                        width:60,
                                        height:60,
                                        borderRadius:30,
                                        }}/>
                                )
                            }
                                
                            
                            <View style={styles.Xuongdong} >
                                <Text style={styles.userName}>{global.user.user.full_name} </Text>
                                <Text style={styles.sayhi}>Ứng viên </Text>
                            </View>
                        </View>
                        <View>
                            
                        </View>
                        <View style={styles.wrapinFo}>
                            <Text style={styles.welcomeMessage}>💎 231 </Text>
                            <TouchableOpacity onPress={() => {navigation.navigate('Mua KC')}}>
                                <Icon name="add-line"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
}
const style = StyleSheet.create({
    header: {
        padding: 16,
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})
const styles = StyleSheet.create({
    wrap_info: {
        flexDirection: 'row',
        gap: 15,
        maxWidth: '65%',
        alignItems: 'center'
    },
    wrap: {
        paddingTop:24 ,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor:'#FFFFFF',
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
        ...STYLE.textTitle,
        fontSize: 25,
        fontWeight:'900',
        color: '#000',
        
        // fontFamily: 'Rubik',
    },
    Xuongdong:{
        display:'flex',
        flex: 1,
        flexDirection:'column',
    },
    welcomeMessage: {
        ...STYLE.textTitle,
        // fontFamily: 'RukbikNormal',
        fontSize: 24,
        color: '#000',
        alignContent:"center",  
        fontWeight:'900'
        
    },
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        gap: 10,
        padding: 16
    },
    wrapinFo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sayhi: {
        ...STYLE.textNormal,
        fontSize: 18,
        color: '#000',
        fontWeight:'400'

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
    vien:{
        display:"flex",
        flexDirection:"row",
        gap:45,
        alignItems: "center",
        borderColor:"#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,
        marginTop:24,
        padding: 10,
        justifyContent: 'space-evenly'
        
    },
    Xuongdong1:{
        display:'flex',
        flexDirection:'column',
        alignItems:"center",
    },
    chutrongvien:{
        fontSize: 25,
        fontWeight:'900',
        color: '#000'
    },
    chutrongvien2:{
        fontSize: 16,
        color: '#000',
        fontWeight:'400'
    },
    daugach:{
        marginTop:24,
        borderColor:"#B0B0B0",
        borderWidth:1.5,
        
    },
    chucuaslart:{
        fontSize: 16,
        fontWeight:'400',
        color: '#000'
    },
    dongngang:{
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop:24,
        
    },
    dongngang1:{
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        
    }
}

)
