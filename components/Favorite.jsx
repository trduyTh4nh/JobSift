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
            const data = r.data
            var post = []
            for (var d of data) {
                post.push({ id_yt: d.id_post_yt, id: d.id_post, salary: [d.luong], title_job: d.tieu_de, jobCate: d.job_category })
            }
            setDisplay('')
            setData(post)

        }).catch((e) => {
            if (e == 'AxiosError: Request failed with status code 404') {
                setData([])
                setDisplay(() => (
                    <Error icon={'ri-heart-2-line'} title={'No posts found'} message={'Unable to find posts, consider adding them to favourites'} />
                ))
            } else if (e == 'AxiosError: Request failed with status code 401') {
                console.warn('Error 401')
                setData([])
                setDisplay(() => (
                    <Error icon={'ri-user-line'} title={'Not logged in'} message={'You are not logged in. Please login to use this feature'} />
                ))
            } else {
                setData([])
                setDisplay(() => (
                    <Error icon={'ri-error-warning-line'} title={'Aw snap.'} message={'Either it is down or you\'re not connected to the internet.'} />
                ))
                setErrorStatus(500)
            }

        })
    }, [focus])


    return (
        <View style={{ ...style.dodgeBottom, height: '100%' }}>
            <Text style={{ padding: 16 }}>{data.length} favourite jobs</Text>
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
            <View style={style.bottom}>
                <View style={style.grid}>
                    <Text style={{ ...STYLE.textBold, ...STYLE.textNormal }}>Trending job categories</Text>
                    <View style={style.cards}>
                        <TouchableOpacity style={style.card}>
                            <Icon name="money-dollar-circle-line" />
                            <Text style={{ ...style.text, fontSize: 16 }}>Salesperson</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card}>
                            <Icon name="computer-line" />
                            <Text style={{ ...style.text, fontSize: 16 }}>IT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.cards}>

                        <TouchableOpacity style={style.card}>
                            <Icon name="bar-chart-grouped-line" />
                            <Text style={{ ...style.text, fontSize: 16 }}>Marketing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card}>
                            <Icon name="bank-line" />
                            <Text style={{ ...style.text, fontSize: 16 }}>Banking</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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