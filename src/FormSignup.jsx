import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid, ScrollView, Platform, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';

import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';


import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { create } from "react-test-renderer";
import { useFonts } from "expo-font";
import { API_URL } from "../ipConfig"
import STYLE from '../assets/css/universal';
const MyForm = ({ navigation, route }) => {




  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [validStatus, setValidStatus] = useState({
    email: true,
    username: true,
    password: true,
    rePassword: true
  })
  const foc = useIsFocused()


  const showToast = () => {
    if(Platform.OS == 'android')
      ToastAndroid.show("Signup Success!", ToastAndroid.SHORT)
  }
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    if (foc) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none"
        }
      })
    }
    if (global.user) {
      navigation.navigate('Home')
    }
  }, [foc])

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  const handleChangeEmail = (text) => {
    if(!text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
      setValidStatus({...validStatus, email: false})
    } else {
      setValidStatus({...validStatus, email: true})
    }
    setEmail(text);
    setText(text)
  };

  const handleChangeUsername = (text) => {
    setUsername(text);
  };

  const handleChangePassword = (text) => {
    if(!text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
      setValidStatus({...validStatus, password: false})
    } else {
      setValidStatus({...validStatus, password: true})
    }
    setPassword(text)
  };

  const handleChangeRePassword = (text) => {
    if(text != password){
      setValidStatus({...validStatus, rePassword: false})
    } else {
      setValidStatus({...validStatus, rePassword: true})
    }
    setRePassword(text);
  };
  
  const formData = {
    email: email,
    full_name: username,
    password: password
  };

  const handleSubmit = () => {
    if(!validStatus.email || !validStatus.password || !validStatus.rePassword || !validStatus.username || username == ''){
      const invalidList = []
      for(const [key, value] of Object.entries(validStatus)){
        if(!value){
          switch(key){
            case 'password':
              invalidList.push('Mật khẩu không hợp lệ')
              break
            case 'rePassword':
              invalidList.push('Mật khẩu không khớp')
              break
            case 'email':
              invalidList.push('Email không khớp')
            default:
              invalidList.push('Trường tên bỏ trống')
          }
        }
      }
      Alert.alert('Không thể đăng ký', `${invalidList.join(', ')}.`)
      return
    }
    if ((password === rePassword) && (password !== '' && rePassword !== '')) {
      axios.post(`http://${API_URL}:3001/adduser`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          navigation.navigate('LoginForm')
          console.log(JSON.stringify(response.data));
          showToast()
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return
  };

  const changeLoginScreen = () => {
    navigation.navigate('LoginForm')
  }


  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.containerScroll}>

          <View style={styles.wrapHeader}>
            <Image style={styles.imageSignup} source={require('../assets/JobSift.png')} >
            </Image>
          </View>

          <View style={styles.titlePage}>
            <Text style={styles.textTitle}>Signup</Text>
          </View>



          <View style={styles.decordPage}>
            <Image style={styles.decordPageImage} source={require('../assets/playerSignup.png')}>

            </Image>
          </View>

          <View style={styles.wrapInput}>

            <View style={styles.wrapEmail}>
              {/* <Text style={styles.lableInput}>Email</Text> */}
              <PaperTextInput
              outlineColor={validStatus.email ? '#CECECE' : '#F36767'}
              mode='outlined'
                theme={{  
                roundness: 16,
                colors: {
                        placeholder: 'black',
                        primary: validStatus.email ? '#000' : '#F36767',
                        accent: '#E2F367',
                        text: '#000',
                        surface: '#fff',
                        background: '#fff',
                        surfaceVariant: '#fff'
                    }
                }}
                style={styles.inputBox}
                label={"Email"}
                value={email}
                onChangeText={handleChangeEmail}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {
                validStatus.email ? '' : (
                  <Text style={{...STYLE.textBold, color: '#F36767'}}>Email không hợp lệ</Text>
                )
              }
            </View>

            <View style={styles.wrapFullname}>
              {/* <Text style={styles.lableInput}>Full name</Text> */}
              <PaperTextInput
              outlineColor={validStatus.username ? '#CECECE' : '#F36767'}
              mode='outlined'
                theme={{
                  roundness: 16,
                  colors: {
                          placeholder: 'black',
                          primary: '#000',
                          accent: '#E2F367',
                          text: '#000',
                          surface: '#fff',
                          background: '#fff',
                          surfaceVariant: '#fff'
                      }
                  }}
                style={styles.inputBox}
                label={"Họ tên"}
                value={username}
                onChangeText={handleChangeUsername}
              />
            </View>

            <View style={styles.wrapPassword}>
              {/* <Text style={styles.lableInput}>Password</Text> */}
              <PaperTextInput
              outlineColor={validStatus.password ? '#CECECE' : '#F36767'}
              mode='outlined'
                theme={{
                roundness: 16,
                colors: {
                        placeholder: 'black',
                        primary: validStatus.password ? '#000' : '#F36767',
                        accent: '#E2F367', 
                        text: '#000',
                        surface: '#fff',
                        background: '#fff',
                        surfaceVariant: '#fff'
                    }
                }}
                style={styles.inputBox}
                label={"Mật khẩu"}
                value={password}
                onChangeText={handleChangePassword}
              />
              {
                validStatus.password ? '' : (
                  <Text style={{...STYLE.textBold, textAlign: 'center', color: '#F36767'}}>Mật khẩu không hợp lệ, mật khẩu phải có ít nhất một chữ in hoa, một chữ in thường và ít nhất một số.</Text>
                )
              }
            </View>

            <View style={styles.wrapRePassword}>
              {/* <Text style={styles.lableInput}> Re-password</Text> */}
              <PaperTextInput
              outlineColor={validStatus.rePassword ? '#CECECE' : '#F36767'}
              mode='outlined'
                theme={{
                version: 2,
                roundness: 16,
                colors: {
                        placeholder: 'black',
                        primary: validStatus.rePassword ? '#000' : '#F36767',
                        accent: '#000',
                        text: '#000',
                        surface: '#fff',
                        background: '#fff',
                        surfaceVariant: '#fff'
                    }
                }}
                style={styles.inputBox}
                label={"Nhập lại mật khẩu"}
                value={rePassword}
                onChangeText={handleChangeRePassword}
              />
              {
                validStatus.rePassword ? '' : (
                  <Text style={{...STYLE.textBold, color: '#F36767'}}>Mật khẩu không khớp</Text>
                )
              }
            </View>

            <View style={styles.wrapButtonSignup}>
              <TouchableOpacity style={styles.btnSignup} onPress={handleSubmit}>
                <Text style={styles.textInbtnSignup}>Signup</Text>
              </TouchableOpacity>
            </View>



          </View>

          <View style={{
            
            textAlign: "center",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10
          }}>
            <Text>Bạn đã có tài khoản</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('LoginForm')

            }}>
              <Text style={{
                fontFamily: "Rubik",
                color: "#0076E2",
                fontSize: 16
              }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  containerScroll: {
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
    
    width: "92%",

  },
  btnSignup: {
    backgroundColor: '#E2F367',
    width: 150,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000"

  },
  textInbtnSignup: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000"
  },
  wrapHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageSignup: {
    transform: [{ scale: 0.5 }]
  },
  titlePage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    fontSize: 26,

    color: "#000",
    fontFamily: "Rubik"
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
    height: 150
  },
  decordPageText: {
    color: "#000",
    width: 150,
    fontSize: 18,
    fontFamily: "RukbikNormal",

  },
  wrapInput: {
    
    display: "flex",
    justifyContent: "center",
    gap: 20
  },
  lableInput: {
    
    fontWeight: "700",
    color: "#000",
    marginLeft: 2
  },
  wrapButtonSignup: {
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
    fontWeight: "800",
    color: "#0076E2",
    fontSize: 16
  },
  desQuestion: {
    color: "#ccc",
    fontWeight: "500"
  },
  wrapEmail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  wrapFullname: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  wrapPassword: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  wrapRePassword: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },

});
