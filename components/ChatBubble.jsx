import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { API_URL } from "../constants/etc";
import STYLE from "../assets/css/universal";
import { socket } from "../constants/socket.io/socket";
const ChatBubble = ({chat, message, from, to, isSelf, isSent}) => {
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        console.log(`content: ${message}, sSent: ${isSent}`)
        if(!isSent){
            axios.post(API_URL+'/postmsg', {
                "content": message,
                "id_user": from,
                "id_chat": chat,
                "time": (new Date()),
            }).then(e => {
                console.log('sent')
                setSent(true)
                socket.emit('newMsg', {id_chat: chat, content: message, id_user: from})
            }).catch(e => {
                console.log(e)
                setError(true)
            })
        }
    }, [])
    if(isSelf){
        return (
            <View style={{...style.wrapRight, opacity: isSent || sent ? 1 : 0.5}}>
                <View style={[style.bubbleSelf]}>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>{message}</Text>
                    {
                        error ? 
                        (<Text style={{...STYLE.textNormal, fontSize: 15}}>(Không được gửi)</Text>)
                        : ''
                    }
                </View>
            </View>
        )
    }
    return (
        <View style={style.wrap}>
            <View style={style.bubbleNotSelf}>
                <Text style={{...STYLE.textNormal, fontSize: 15}}>{message}</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        
    },
    wrapRight: {
       alignSelf: 'flex-end',
       flexDirection: 'row',
    }, 
    bubbleSelf: {
        backgroundColor: '#E2F367',
        borderRadius: 50,
        maxWidth: '75%',
        padding: 16,
    },
    bubbleNotSelf: {
        backgroundColor: '#E9E9E9',
        borderRadius: 50,
        padding: 16,
        maxWidth: '75%',
    },
    
})
export default ChatBubble