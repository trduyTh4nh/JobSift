// import React from "react";
// import { Text, View } from "react-native";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";
import DatePicker from "react-native-date-picker"
import RNPickerSelect from 'react-native-picker-select'
import axios from "axios";
import { API_URL } from "../constants/etc";
const EditProfile = ({navigation}) =>{
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dateBirth, setDateBirth] = useState(new Date(global.user.user.ngaysinh))
    const [gender, setGender] = useState('Male')
    const [user, setUser] = useState(global.user.user)
    const [image, setImage] = useState()
    const usr = global.user.user;
    const handleEditProfile = () => {
        setIsLoading(true)
        axios.post(API_URL+'/updateUser', user, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((e) => {
            console.log(e)
            global.user.user = user
            navigation.goBack()
        }).catch((e) => {
            setIsLoading(false)
            Alert.alert('Error saving user data')
        })
    }
    return(
    <ScrollView style={{paddingBottom:200}}>
    <View style={styles.wrap}>
        <View style={styles.container}>
            
            <View>
                    <Text style={styles.userName}>Thông tin cá nhân</Text>
            </View>
            <Image source={{uri: image ? image : 'https://images-ext-2.discordapp.net/external/J0CmYBrUaclT-rSO1X80iEkJ-Sp39yEPnqdiokPwfaU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/515061888258670602/9e4b204e2b74d3264f42fbb933b1e18b.png?width=512&height=512'}} 
                                    style={{
                                        width:60,
                                        height:60,
                                        borderRadius:30,
                                        }}/>
            <View>
            <Text style={styles.chucuaslart}>Full name</Text>
            <View style={styles.inputSearch}>
                
                <TextInput
                        defaultValue={user.full_name}
                        editable={true}
                        style={styles.input}
                        placeholder="0908290382"
                        placeholderTextColor="rgba(0,0,0,0.15)"
                        fontWeight="700"
                        onChangeText={(e) => {
                            setUser({
                                ...user,
                                full_name: e
                            })
                        }}
                >
                </TextInput>
                
            </View>

            <Text style={styles.chucuaslart}>Date of Birth</Text>
            <View style={styles.inputSearch}>
                
                <Text style={{fontWeight: 'bold'}}>{dateBirth.toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => {setDatePickerOpen(true)}}>
                    <Icon name="calendar-line"></Icon>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="date"
                    open={datePickerOpen}
                    date={dateBirth}
                    onConfirm={(date) => {
                        setDatePickerOpen(false)
                        setDateBirth(date)
                        setUser({
                            ...user,
                            ngaysinh: date
                        })
                    }}
                    onCancel={
                        () => {setDatePickerOpen(false)}
                    }
                />
            </View>
                

            <Text style={styles.chucuaslart}>Gender</Text>
            <View style={styles.inputSearch}>
                <RNPickerSelect
                    value={user.gioitinh}
                    style={{
                        viewContainer: {
                        alignSelf: 'auto',
                        flex: 1
                    },
                        inputIOS: {
                            fontWeight: 'bold',
                        },
                        inputAndroid: {
                            fontWeight: 'bold'
                        }
                        }}
                    onValueChange={e => {
                        setUser({
                            ...user,
                            gioitinh: e
                        })}
                        }
                    items={[
                        {label: 'Male', value: 'Male'},
                        {label: 'Female', value: 'Female'}
                    ]}
                />
                
               
                <Icon name="arrow-down-s-line"></Icon>
            </View>


            <Text style={styles.chucuaslart}>Phone number</Text>
            <View style={styles.inputSearch}>
                
                <TextInput

                        defaultValue={user.phone}
                        editable={true}
                        style={styles.input}
                        placeholder="0908290382"
                        placeholderTextColor="rgba(0,0,0,0.15)"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>


            <Text style={styles.chucuaslart}>Email</Text>
            <View style={styles.inputSearch}>
                
                <TextInput
                        defaultValue={user.email}
                        style={styles.input}
                        placeholder="email@example.com"
                        placeholderTextColor="rgba(0,0,0,0.15)"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>


        <Text style={styles.chucuaslart}>Address</Text>
            <View style={styles.inputSearch}>
                 
                <TextInput 
                        defaultValue={user.diachi}
                        //placeholder="Quận 3"
                        placeholderTextColor="rgba(0,0,0,0.15)"
                        fontWeight="700"
                >
                </TextInput>
                
            </View>
        </View>
        <View style={styles.wrapSearchBtn}>
                    <TouchableOpacity onPress={handleEditProfile} style={styles.searchBtn}>
                        {
                            isLoading ? (<ActivityIndicator/>) : (
                               <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <Icon name="check-line" size={27} color="#000"></Icon>
                                    <Text style={styles.chucuaslart1}>Save</Text>
                               </View> 
                            )
                        }
                        
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
    input: {
        flex: 1
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
        
       
        backgroundColor: '#E2F367',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
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