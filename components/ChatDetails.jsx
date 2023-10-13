import React, { useEffect, useRef, useState } from "react"
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import STYLE from "../assets/css/universal"
import { BottomTabView } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-remix-icon"
import ChatBubble from "./ChatBubble"
import { getHeaderTitle, useHeaderHeight } from "@react-navigation/elements"
import { BlurView } from "expo-blur"
import { Header } from "../components/Header"
import HeaderChat from "./HeaderChat"
const ChatDetails = ({navigation}) => {
    const sendButton = useRef(null)
    const [msg, setMsg] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState(1)
    const [disable, setDisable] = useState(true)
    const setMessage = (e) => {
        setMsg(e)
        if(e.length > 0){
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    const sendMessage = () => {
        setId(id+1)
        setData([...data, {id: id, message: msg, from: 'quang', to: 'test', isSelf: true}])
    }
    useEffect(() => {
        navigation.getParent()?.setOptions(
            {
                tabBarStyle: {
                    display: "none"
                }
            }
        )
        navigation.setOptions(
            {
                header: ({navigation, route, options, back}) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <HeaderChat image={'https://images-ext-2.discordapp.net/external/J0CmYBrUaclT-rSO1X80iEkJ-Sp39yEPnqdiokPwfaU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/515061888258670602/9e4b204e2b74d3264f42fbb933b1e18b.png?width=512&height=512'} navigation={navigation} title={'Employer'} LeftButton={back}></HeaderChat>
                    )
            }}
        )
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: STYLE.tabBarStyle
          });
    }, [navigation])
    const HEADER_HEIGHT = useHeaderHeight()
    const style = StyleSheet.create(
        {
            body: {
                padding: 16,
                paddingTop: 0,
                gap: 16,
                height: '100%',
                paddingTop: HEADER_HEIGHT + 16
            },
            topOfChat: {
                borderBottomColor: '#B0B0B0',
                borderBottomWidth: 2,
                paddingBottom: 10,
                marginBottom: 10
            },
            fakeBottomBar: {
                marginBottom: 100 + HEADER_HEIGHT + 16,
                
            },
            bottomBarWrap: {
                backgroundColor: 'rgba(255,255,255)',
                
                width: '100%',
                height: 50,
                position: 'absolute',
                bottom: 0
            },
            bottomSendButton: {
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 50,
                backgroundColor: "#E2F367"
            },
            bottomBar: {
                flexDirection: 'row',
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 5,
                backgroundColor: 'rgba(255,255,255,1)',
                borderRadius: 30,
                paddingBottom: 0,
                height: 60,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center',
                gap: 10
            },
            textEdit: {
                marginTop: 10,
                marginBottom: 10,
                padding: 14,
                borderRadius: 50,
                backgroundColor: '#F7F7F7',
                flex: 1,
            },
            disabledButton: {
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 50,
                backgroundColor: "#E2F367",
                opacity: 0.33
            }
    })
    return (
        <View style={{height: '100%'}}>
            <ScrollView ref={ref => {this.ScrollView = ref}} onContentSizeChange={() => {this.ScrollView.scrollToEnd({animated: false})}} style={style.body}>
                <View style={style.topOfChat}>
                    <Text>This is the beginning of the chat between you and 'Employer'</Text>
                </View>
                
                <FlatList
                    
                    scrollEnabled={false}
                    data={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={<View style={{height: 10}}
                        
                    />}
                    
                    keyExtractor={(item) => {item.id}}
                    style={style.fakeBottomBar}
                />
            </ScrollView>
            <BlurView style={style.bottomBarWrap}>
                <View style={style.bottomBar}>
                    <TextInput onChangeText={setMessage} style={style.textEdit} placeholderTextColor={'#000'} placeholder="Chat here"/>
                    <TouchableOpacity disabled={disable} ref={sendButton} onPress={sendMessage} style={disable ? style.disabledButton : style.bottomSendButton}>
                        <Icon name="ri-send-plane-2-fill" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    )
}
const renderItem = ({item}) => {
    return (
        <ChatBubble message={item.message} isSelf={item.isSelf}/>
    )
}

export default ChatDetails