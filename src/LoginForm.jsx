import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, ToastAndroidStatic, ScrollView, SafeAreaView } from "react-native";
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from "expo-font";

import { API_URL } from "../ipConfig"
import STYLE from "../assets/css/universal";


const IPcuaQuang = "192.168.1.113"
const IPlD = "192.168.116.1"

const LoginForm = ({ navigation }) => {

  const [validStatus, setValidStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')

  const showToast = () => {
      ToastAndroid.show("Login Success!", ToastAndroid.SHORT)
  }

  const FormData = {
    email: email,
    password: password
  }
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    })
  })

  const [fontLoaded] = useFonts({
    'Rubik': require("../assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    'RukbikNormal': require("../assets/fonts/SF-Pro.ttf")
})
    if(!fontLoaded){
        return(
            <View>
                <Text>Loading..........</Text>
            </View>
        )
    }

  const handleChangeEmail = (text) => {
    setEmail(text)
  }

  const handleChangePassword = (text) => {
    setPassWord(text)
  }
  
  const handleSubmit = () => {

    axios.post(`http://${API_URL}:3001/login`, FormData, {

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((respone) => {
     
        console.log("Login Success!")
        global.user = respone.data
        AsyncStorage.setItem('user', JSON.stringify(respone.data)).then(e => {
          console.log(global.user)
          navigation.navigate('Home')
        })
       showToast()

      })
      .catch((error) => {
        setValidStatus(true)
      })


  }

  const changeSignupScreen = () => {
    navigation.navigate('FormSignup')
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.containerLogin}
      contentContainerStyle={{gap: 10}}>
        <View style={styles.wrapHeader}>
          <Image style={styles.imageLogin} source={require('../assets/JobSift.png')} >
          </Image>
        </View>

        <View style={styles.titlePage}>
          <Text style={styles.textTitle}>Login</Text>
        </View>


        <View style={styles.decordPage}>
          <Image style={styles.decordPageImage} source={require('../assets/personLogin1.png')}>

          </Image>

          <Text style={styles.decordPageText}>
            Đăng nhập và sử dụng ứng dụng theo cách của bạn
          </Text>
        </View>

        <View style={styles.wrapInput}>

          <View style={styles.wrapEmail}>
            {/* <Text style={styles.lableInput}>Email</Text> */}
            <PaperTextInput
            mode='outlined'
            theme={{
              roundness: 16,
              colors: {
                      placeholder: 'black',
                      primary: !validStatus ? '#000' : '#F36767',
                      accent: '#E2F367',
                      text: '#000',
                      surface: '#fff',
                      background: '#fff',
                      surfaceVariant: '#fff'
                  }
              }}
              label={"Email"}
              style={styles.inputBox}
              placeholderTextColor={'#000'}
              outlineColor={!validStatus ? "#CECECE" : "#F36767"}
              activeOutlineColor="black"
              value={email}
              onChangeText={handleChangeEmail}
            />
          </View>
          <View style={styles.wrapPassword}>
            {/* <Text style={styles.lableInput}>Password</Text> */}
            <PaperTextInput
            mode="outlined"
            secureTextEntry
              theme={{
                roundness: 16,
              colors: {
                      placeholder: 'black',
                      primary: !validStatus ? '#000' : '#F36767',
                      accent: '#E2F367',
                      text: '#000',
                      surface: '#fff',
                      background: '#fff',
                      surfaceVariant: '#fff'
                  }
              }}
              label={"Password"}
              style={styles.inputBox}
              value={password}
              outlineColor={!validStatus ? "#CECECE" : "#F36767"}
              onChangeText={handleChangePassword}
            />
            {
                !validStatus ? '' : (
                  <Text style={{...STYLE.textBold, color: '#F36767', textAlign: 'center'}}>Thông tin không hợp lệ, vui lòng kiểm tra lại Email và Mật khẩu</Text>
                )
            }
          </View>

          <View style={styles.wrapButtonLogin}>
            <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
              <Text style={styles.textInbtnLogin} >Login</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.descBottom}>
          <Text style={styles.desQuestion}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={changeSignupScreen}>
            <Text style={styles.descBottomLogin}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  containerLogin: {
    padding: 20,
    gap: 16
  },
  headerNavigation: {
    height: 10,
  },
  navCustom: {},
  inputBox: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // paddingLeft: 18,
    // borderRadius: 16,
    


  },

  btnLogin: {
    backgroundColor: '#E2F367',
    width: 150,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 30,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000"

  },
  textInbtnLogin: {
    fontFamily: "Rubik",
    fontSize: 16,
    color: "#000"
  },
  wrapHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogin: {
    transform: [{ scale: 0.5 }]
  },
  titlePage: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    fontSize: 26,
    color: "#000",
    fontFamily: "Rubik",
  },
  decordPage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  decordPageImage: {
    width: "55%",
    height: 190
  },
  decordPageText: {
    fontFamily: "RukbikNormal",
    color: "#000",
    width: "50%",
    fontSize: 17,
    textAlign: "center",
    marginLeft: -18
  },
  wrapInput: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: 20
  },
  lableInput: {
    fontFamily: "Rubik",
    color: "#000",
    marginLeft: 2
  },
  wrapButtonLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  descBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    
  },
  descBottomLogin: {
    fontFamily: "Rubik",
    color: "#0076E2",
    fontSize: 16
  },
  desQuestion: {
    fontWeight: "500",
    fontFamily: "Rubik",
    color: "#000"
  },
  wrapEmail: {
    gap: 10
  },
  wrapPassword: {
    gap: 10
  }
});
export default LoginForm 