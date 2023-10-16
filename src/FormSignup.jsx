import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


const MyForm = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const foc = useIsFocused()

  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    if(foc){
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none"
        }
      })
    }
    if(global.user){
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
    setEmail(text);
    setText(text)
  };

  const handleChangeUsername = (text) => {
    setUsername(text);
  };

  const handleChangePassword = (text) => {
    setPassword(text);
  };

  const handleChangeRePassword = (text) => {
    setRePassword(text);
  };

  const formData = {
    email: email,
    full_name: username,
    password: password
  };

  const handleSubmit = () => {
    if ((password === rePassword) && (password !== '' && rePassword !== '')) {
      axios.post('http://192.168.1.14:3001/adduser', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          navigation.navigate('LoginForm')
          console.log(JSON.stringify(response.data));
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
    <ScrollView>
      <View style={styles.container}>
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

          <Text style={styles.decordPageText}>
            Bạn đã có tài khoản chưa?
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
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <View style={styles.wrapFullname}>
            <Text style={styles.lableInput}>Full name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="steve"
              value={username}
              onChangeText={handleChangeUsername}
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

          <View style={styles.wrapRePassword}>
            <Text style={styles.lableInput}> Re-password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="*********************"
              value={rePassword}
              onChangeText={handleChangeRePassword}
            />
          </View>

          <View style={styles.wrapButtonSignup}>
            <TouchableOpacity style={styles.btnSignup} onPress={handleSubmit}>
              <Text style={styles.textInbtnSignup}>Signup</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.descBottom}>
          <Text style={styles.desQuestion}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={changeLoginScreen}>
            <Text style={styles.descBottomLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  btnSignup: {
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
  textInbtnSignup: {
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
  imageSignup: {
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
    height: 150
  },
  decordPageText: {
    fontWeight: "700",
    color: "#000",
    width: 150,
    fontSize: 18
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
  wrapButtonSignup: {
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
  desQuestion:{
    color: "#ccc",
    fontWeight: "500"
  }
  
});
