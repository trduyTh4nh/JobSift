import React from "react";
import { View, StyleSheet, Text } from "react-native";
const ChatBubble = ({message, from, to, isSelf}) => {
    if(isSelf){
        return (
            <View style={[style.wrapRight]}>
                <View style={[style.bubbleSelf]}>
                    <Text>{message}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={[style.wrap]}>
            <View style={style.bubbleNotSelf}>
                <Text>{message}</Text>
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