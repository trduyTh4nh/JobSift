import React, { useEffect, useRef, useState } from "react"
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import STYLE from "../assets/css/universal"
import { BottomTabView } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-remix-icon"
import ChatBubble from "./ChatBubble"
import { getHeaderTitle, useHeaderHeight } from "@react-navigation/elements"
import { socket } from "../constants/socket.io/socket"
import { Header } from "../components/Header"
import HeaderChat from "./HeaderChat"
import { useIsFocused, useRoute } from "@react-navigation/native"
import axios from "axios"
import { API_URL } from "../constants/etc"
const ChatDetails = ({ navigation }) => {
    const sendButton = useRef(null)
    const [msg, setMsg] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState(1)
    const [disable, setDisable] = useState(true)
    const route = useRoute()
    const chatHeader = route.params.chatHeader ? route.params.chatHeader : null
    const setMessage = (e) => {
        setMsg(e)
        if (e.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    const sendMessage = () => {

        setData([...data, { chat_name: chatHeader.chat_name, content: msg, id_chat: chatHeader.id_chat, id_user: global.user.user.id_user, isSent: false }])
    }
    const focus = useIsFocused()
    useEffect(() => {
        socket.on('newMsg', (res) => {
            if (res.body.id_chat == chatHeader.id_chat) {
                console.log(res)
                axios.post(API_URL + '/getmsg', {
                    "id_chat": chatHeader.id_chat
                }).then(e => {
                    console.log(e.data)
                    setData(e.data)
                })
            }
        })
        socket.on('id', (res) => { console.log(res) })
        if (chatHeader) {
            axios.post(API_URL + '/getmsg', {
                "id_chat": chatHeader.id_chat
            }).then(e => {
                console.log(e.data)
                setData(e.data)
            })
        }
        console.log(chatHeader)
        navigation.getParent()?.setOptions(
            {
                tabBarStyle: {
                    display: "none"
                }
            }
        )
        navigation.setOptions(
            {
                header: ({ navigation, route, options, back }) => {
                    const title = getHeaderTitle(options, route.name)
                    return (
                        <HeaderChat image={chatHeader ? chatHeader.profile_picture : ''} navigation={navigation} title={chatHeader ? chatHeader.full_name : 'Null'} LeftButton={back}></HeaderChat>
                    )
                }
            }
        )
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: STYLE.tabBarStyle
        });
    }, [focus])
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
        <View style={{ height: '100%' }}>
            <ScrollView ref={ref => { this.ScrollView = ref }} onContentSizeChange={() => { this.ScrollView.scrollToEnd({ animated: false }) }} style={style.body}>
                <View style={style.topOfChat}>
                    <Text style={{ ...STYLE.textNormal, fontSize: 15 }}>Đây là khởi đầu của đoạn chat giữa bạn và {chatHeader ? chatHeader.full_name : ''}</Text>
                </View>

                <FlatList

                    scrollEnabled={false}
                    data={data}
                    renderItem={({ item }) => (<RenderItem item={item} key={item.id_msg} />)}
                    ItemSeparatorComponent={<View style={{ height: 10 }}

                    />}
                    extraData={data}
                    keyExtractor={ (item) =>  item.id_msg }
                    style={style.fakeBottomBar}
                />
            </ScrollView>
            <View style={style.bottomBarWrap}>
                <View style={style.bottomBar}>
                    <TextInput style={{ ...STYLE.textNormal, ...style.textEdit, fontSize: 15, paddingTop: 10 }} onChangeText={setMessage} placeholderTextColor={'#000'} placeholder="Nhắn ở đây" />
                    <TouchableOpacity disabled={disable} ref={sendButton} onPress={sendMessage} style={disable ? style.disabledButton : style.bottomSendButton}>
                        <Icon name="ri-send-plane-2-fill" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const RenderItem = ({ item, key }) => {
    return (
        <ChatBubble chat={item.id_chat} from={item.id_user} message={item.content} isSelf={item.id_user == global.user.user.id_user} isSent={item.isSent === undefined ? true : false} />
    )
}

export default ChatDetails