import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import axios from "axios";
import STYLE from "../assets/css/universal";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Touchable, Pressable, FlatList, Image, ScrollView, Alert } from "react-native";
import Icon from 'react-native-remix-icon'
import { API_URL } from "../constants/etc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { socket } from "../constants/socket.io/socket";
const Chat = ({navigation}) => {
    const focus = useIsFocused()
    // const chat = [
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: true,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Quang',
    //         latestMessage: 'Hi',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Thanh',
    //         latestMessage: 'Hello',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     },
    //     {
    //         img: 'https://media.discordapp.net/attachments/670997657732513815/1159840859114700911/1672797639116.jpg?ex=65327cf9&is=652007f9&hm=60e20799920ed4cc68da008dbb075992b74d50aca34cda5cb7e8c1e7b747db05&=&width=1772&height=1332',
    //         name: 'Tuấn',
    //         latestMessage: 'Cút',
    //         sent: true,
    //         seen: true,
    //         new: false,
    //     }
    // ]
    const [chat, setChat] = useState([])
    const HEADER_HEIGHT = useHeaderHeight()
    
    useEffect(() => {
        socket.on('newMsg', (r) => {
            axios.post(`${API_URL}/chat`, {
                "id_user": global.user.user.id_user
            }).then(e => {
                console.log(e.data)
                setChat(e.data)
            }).catch(e => {
                console.error(e)
            })
        })
        console.log('focus')
            axios.post(`${API_URL}/chat`, {
                "id_user": global.user.user.id_user
            }).then(e => {
                console.log(e.data)
                setChat(e.data)
            }).catch(e => {
                console.error(e)
            })
    }, [focus])
    const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight()
    const styles = StyleSheet.create({
        body: {
            gap: 16,
        },
        dodgeHeader:{
            padding: 16,
            paddingTop: HEADER_HEIGHT + 16,
        },
        chatList: {
            marginBottom: HEADER_HEIGHT - 46 + 100,
            paddingBottom: 50,
        },
    })
    return (
            <View style={styles.body}>
                <ScrollView style={styles.dodgeHeader}>
                    <View style={styleGlobal.wrapSearch}>
                            <TextInput
                                style={styleGlobal.inputSearch}
                                placeholder="Tìm kiếm đoạn chat"
                                placeholderTextColor="#999"
                            />
                            <View style={styleGlobal.wrapSearchBtn}>
                                <Pressable style={styleGlobal.searchBtn}>
                                    <Icon name="search-line" size={32} color="#fff"></Icon>
                                </Pressable>
                            </View>
                    </View>
                    <FlatList
                        style={styles.chatList}
                        data={chat}
                        scrollEnabled={false}
                        renderItem={({item}) => <RenderComponent item={item} navigation={navigation}/>}
                        extraData={navigation}
                        ItemSeparatorComponent={() => (<View style={{height: 16}}></View>)}
                    />
                </ScrollView>
            </View>
    )
}
const RenderComponent = ({item, navigation}) => {
   return (
       <ChatComponent chat={item} navigation={navigation}/>
   )
    
}
const ChatComponent = ({chat, navigation}) => {
    const nav = useNavigation()
    const SeenIcon = chat.sent ? (  
        <Icon name="ri-check-line" size={24}/>
    ) : undefined
    const NewIcon = chat.new ? (
        <View style={styleGlobal.newIcon}></View>
    ) : undefined
    const navigate = () => {
        nav.navigate('Chat Details', { chatHeader: chat })
    }
    const [e, setE] = useState()
    return (
        <TouchableOpacity onPress={navigate} style={styleGlobal.chatComp}>
            <View style={styleGlobal.chatWrapper}>
                <Image style={styleGlobal.img} source={{uri: chat.profile_picture}}/>
                <View>
                    <Text style={styleGlobal.chatName}>{chat.full_name}</Text>
                    <Text style={chat.new ? styleGlobal.newMsg : {...STYLE.textNormal, fontSize: 16}}>{chat.content}</Text>
                </View>
            </View>
            <View style={styleGlobal.chatWrapper}>
                {SeenIcon}
                {NewIcon}
                <Text>{(new Date(chat.time)).toLocaleDateString() == (new Date()).toLocaleDateString() ? (new Date(chat.time)).toLocaleTimeString() : (new Date(chat.time)).toLocaleDateString()}</Text>
                <Icon name="ri-arrow-right-s-line" size={24}/>
            </View>
        </TouchableOpacity>
    )
}
const styleGlobal = StyleSheet.create({
    newIcon: {
        width: 16,
        height: 16,
        borderRadius: 50,
        backgroundColor: "#E2F367"
    },
    chatList: {
        marginBottom: 100,
        paddingBottom: 50,
    },
    newMsg: {
        ...STYLE.textNormal,
        fontWeight: 'bold',
        fontSize: 16
    },
    chatComp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chatWrapper: {
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatName: {
        ...STYLE.textTitle,
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 64,
        borderRadius: 50,
        height: 64,
        objectFit: 'cover'
    },
    body: {
        padding: 16,
        paddingTop: 0,
        gap: 16,
    },
    wrapSearchBtn: {

    },
    wrapSearch: {
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
    },
    inputSearch: {
        color: '#ABABAB',
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 16,
        // fontFamily: 'RukbikNormal'

    },
    searchBtn: {
        padding: 10,
        backgroundColor: '#000000',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4
    },
})
export default Chat