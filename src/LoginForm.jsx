import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import Toast from "react-native-toast-message";
import { API_URL } from "../constants/etc";

const LoginForm = ({navigation}) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')

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
  
  const handleChangeEmail = (text) => {
    setEmail(text)
  }

  const handleChangePassword = (text) => {
    setPassWord(text)
  }

  const handleSubmit = () => {
    
    axios.post(`${API_URL}/login`, FormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((respone) => {
        console.log(JSON.stringify(respone.data))
        console.log("Login Success!")
        global.user = respone.data
        console.log(global.user)
        navigation.navigate('Home')
        Toast.show('Login success', {duration: 1000})
      })
      .catch((error) => {
        console.error(error)
      })


  }

  const changeSignupScreen = () => {
    navigation.navigate('FormSignup')
  }

  return (
    <View style={styles.containerLogin}>
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
          <Text style={styles.lableInput}>Email</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={handleChangeEmail}
          />
        </View>

        <View style={styles.wrapPassword}>
          <Text style={styles.lableInput}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="*********************"
            value={password}
            onChangeText={handleChangePassword}
          />
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
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  containerLogin: {
    padding: 20
  },
  headerNavigation: {
    height: 10,
  },
  navCustom: {},
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 18,
    borderRadius: 16,


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
    fontWeight: "700",
    fontSize: 16,
    color: "#000"
  },
  wrapHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18
  },
  imageLogin: {
    transform: [{ scale: 0.5 }]
  },
  titlePage: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000"
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
    width: 150,
    height: 190
  },
  decordPageText: {
    fontWeight: "700",
    color: "#000",
    width: 150,
    fontSize: 18,
    textAlign: "center"
  },
  wrapInput: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: 20
  },
  lableInput: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#000",
    marginLeft: 2
  },
  wrapButtonLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  descBottom: {
    marginTop: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  descBottomLogin: {
    fontWeight: "800",
    color: "#0076E2",
    fontSize: 16
  },
  desQuestion: {
    color: "#ccc",
    fontWeight: "500"
  },


});
export default LoginForm 