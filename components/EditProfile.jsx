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

const EditProfile = () =>{
    return(
    <ScrollView style={{paddingBottom:200}}>
    <View style={styles.wrap}>
        <View style={styles.container}>
            <View style={styles.wrap_welcome}>
            <Icon name="arrow-left-s-line"></Icon>

              <View>
              <Image source={require('../assets/hinhquang.jpg')} 
                style={{
                    width:60,
                    height:60,
                    borderRadius:30,
                    }}/>
              </View>

                <View style={styles.Xuongdong} >
                  
                    <Text style={styles.userName}> Steve Tran </Text>
                    <Text style={styles.sayhi}> Candiate </Text>
                </View>
                
            </View>
            <View>
                    <Text style={styles.userName}>Thông tin cá nhân</Text>
            </View>
            <View>


            <Text style={styles.chucuaslart}>Date of Birth</Text>
            <View style={styles.inputSearch}>
                
                <TextInput 
                       
                        // placeholder="12/12/2003"
                        placeholderTextColor="#000000"
                        fontWeight="700"
                        
                >
                </TextInput>
                <Icon name="calendar-line"></Icon>
            </View>
                

            <Text style={styles.chucuaslart}>Gender</Text>
            <View style={styles.inputSearch}>
                
                <TextInput 
                        
                        // placeholder="Nam"
                        placeholderTextColor="#000000"
                        fontWeight="700"
                >
                </TextInput>
                <Icon name="arrow-down-s-line"></Icon>
            </View>


            <Text style={styles.chucuaslart}>Phone number</Text>
            <View style={styles.inputSearch}>
                
                <TextInput 
                        
                        // placeholder="0908290382"
                        placeholderTextColor="#000000"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>


            <Text style={styles.chucuaslart}>Email</Text>
            <View style={styles.inputSearch}>
                
                <TextInput 
                        
                        // placeholder="ttranduy999@gmail.com"
                        placeholderTextColor="#000000"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>


        <Text style={styles.chucuaslart}>Address</Text>
            <View style={styles.inputSearch}>
                 
                <TextInput 
                        
                        // placeholder="Quận 3"
                        placeholderTextColor="#000000"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>
        </View>
        <View style={styles.wrapSearchBtn}>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Icon name="check-line" size={27} color="#000"></Icon>
                        <Text style={styles.chucuaslart1}>Save</Text>
                    </TouchableOpacity>
                </View>
     </View>
     


    </View>
</ScrollView>
)}
const styles = StyleSheet.create({
    wrap: {
        paddingTop:24 ,
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
        fontWeight:'900',
        color: '#000'
        // fontFamily: 'Rubik',

    },
    Xuongdong:{
        display:'flex',
        flexDirection:'column',
    },
   
    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
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
      

        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop:5,

       
       
        // fontFamily: 'RukbikNormal'

    },
    searchBtn: {
        width: 341,
        height: 54,
        backgroundColor: '#E2F367',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 30 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4,
        display:'flex',
        flexDirection:'row',
       marginTop:20
    },
  
  
    chucuaslart:{
        fontSize: 16,
        // fontWeight:'900',
        color: '#000',
        marginTop:9
    },
    chucuaslart1:{
        fontSize: 16,
        // fontWeight:'900',
        color: '#000',
       
    },
   
   
}
)

export default EditProfile