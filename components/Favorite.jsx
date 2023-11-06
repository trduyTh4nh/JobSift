import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import STYLE from "../assets/css/universal";
import NearbyJob from "../Job/NearbyJob";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import Icon from "react-native-remix-icon";
import { TouchableOpacity } from "react-native";
import { API_URL } from "../constants/etc";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Error from "./Error";


const FavoritePage = () => {

    const [data, setData] = useState([])
    const [errorStatus, setErrorStatus] = useState(false)
    const [display, setDisplay] = useState()
    const focus = useIsFocused()
    useEffect(() => {
        axios.post(API_URL + '/favourite', { id_user: global.user.user.id_user }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((r) => {
            console.log(r.data)
            const post = r.data
            setDisplay('')
            setData(post)
        }).catch((e) => {
            if (e == 'AxiosError: Request failed with status code 404') {
                setData([])
                setDisplay(() => (
                    <Error style={{paddingLeft: 16, paddingRight: 16}} icon={'ri-heart-2-line'} title={'Không có bài đăng nào'} message={'Bạn chưa yêu thích bài đăng nào. Hãy ấn nút trái tim ở một bài post để thêm vào danh sách yêu thích.'} />
                ))
            } else if (e == 'AxiosError: Request failed with status code 401') {
                console.warn('Error 401')
                setData([])
                setDisplay(() => (
                    <Error style={{paddingLeft: 16, paddingRight: 16}} icon={'ri-user-line'} title={'Chưa đăng nhập'} message={'Đáng lẽ bạn phải đăng nhập chứ... Chắc do lỗi hệ thống...'} />
                ))
            } else {
                setData([])
                setDisplay(() => (
                    <Error style={{paddingLeft: 16, paddingRight: 16}} icon={'ri-error-warning-line'} title={'Ngại nhỉ...'} message={'Có thể là do server bị lỗi hoặc bạn không có kết nối Internet. Nguyên nhân gây ra lỗi: ' + e} />
                ))
                setErrorStatus(500)
            }

        })
    }, [focus])


    return (
        <View style={{ ...style.dodgeBottom, height: '100%' }}>
            <Text style={{ padding: 16 }}>{data.length} bài đăng yêu thích</Text>
            <ScrollView style={style.body}>
                {display}
                <FlatList
                    data={data}
                    renderItem={renderFavJobs}
                    style={STYLE.body}
                    scrollEnabled={false}
                    keyExtractor={(item) => (item.id_yt)}
                    ItemSeparatorComponent={() => (<View style={{ height: 0 }} />)}
                />
            </ScrollView>
            
        </View>
    )
}


const renderFavJobs = ({ item }) => {
    return (
        <NearbyJob dataNearby={item} />
    )
}
const style = StyleSheet.create({
    dodgeBottom: {
        paddingBottom: 100
    },
    cards: {
        flexDirection: 'row',
        gap: 16
    },
    text: {
        fontFamily: 'RubikNormal'
    },
    card: {
        fontFamily: 'Rubik',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 10,
        padding: 10,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        borderRadius: 16
    },
    body: {
        height: '100%',
    },
    list: {
        ...STYLE.body
    },
    bottom: {
        borderTopColor: '#B0B0B0',
        borderTopWidth: 2,
        padding: 16,

    },
    grid: {
        gap: 16,
    }
})

export default FavoritePage