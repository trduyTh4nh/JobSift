import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
const JobDetail = ({props}) => {
    
    const post = props.postData

    console.log(post)
    return (
        <View>
            <Text>Title: {}</Text>
        </View>
    )
    
}

export default JobDetail