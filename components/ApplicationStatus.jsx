
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Alert } from "react-native";
import STYLE from "../assets/css/universal";
import Icon from "react-native-remix-icon";
import axios from "axios";
import { API_URL } from "../constants/etc";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useNavigation } from "@react-navigation/native";
const ApplicationStatus = ({navigation}) => {
    const [aList, setList] = useState([])
    useEffect(() => {
        axios.post(`${API_URL}/applicationuser`, {
            "id_user": global.user.user.id_user
        }).then(e => {
            console.log(e.data)
            setList(e.data)
        }).catch(e => {
            Alert.alert('Error in fetch user: ' + e)
        })
    }, [])
    return (
        <View>
            <ScrollView>
                <View style={{...STYLE.body, marginBottom: 100, paddingTop: 16}}>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>{aList.length} công việc đã ứng tuyển</Text>
                    <FlatList
                        data={aList}
                        renderItem={({item}) => (<ApplicationItem navigation={navigation} item={item}/>)}
                        scrollEnabled={false}
                        keyExtractor={(item) => (item.id_recruit)}
                        ItemSeparatorComponent={() => (<View style={{height: 16}}></View>)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const ApplicationItem = ({item, key, navigation}) => {
    
    const getStatus = () => {
        switch(item.status){
            case 1:
                return {
                    icon: 'check-line',
                    color: '#67C1F3'
                }
                
            case 2:
                return {
                    icon: 'close-line',
                    color: '#F36767'
                }
            default:
                return {
                    icon: 'loader-fill',
                    color: '#B0B0B0'
                }
                
        }
    }
    const getStatusString = () => {
        switch(item.status){
            case 1:
                return "Đỗ ứng tuyển"
                
            case 2:
                return "Trượt ứng tuyển"
            default:
                return "Đang chờ phản hồi"
                
        }
    }
    const gotoChat = () => {
        axios.post(`${API_URL}/createchat`, {
            "id_user": global.user.user.id_user,
            "id_ntd": item.id_ntd,
            "tieu_de": item.tieu_de
          }).then(e => {
            const data = e.data[0]
            navigation.navigate('Chat Details', { chatHeader: data })
          })
    }
    return (
        <View style={style.aItemWrap}>
            <View>
                <Text style={{...STYLE.textTitle, fontSize: 25}}>{item.tieu_de}</Text>
                <Text style={{...STYLE.textNormal, fontSize: 15}}>{item.name_dn}</Text>
            </View>
            <View style={{...style.applicationStatus, borderColor: getStatus().color}}>
                <Icon name={getStatus().icon}/>
                <View>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>Tình trạng ứng tuyển</Text>
                    <Text style={{...STYLE.textNormal, fontSize: 18}}>{getStatusString()}</Text>
                </View>
            </View>
            <View style={{...style.applicationStatus, borderWidth: 0, padding: 0}}>
                <Icon name="time-line"/>
                <View>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>Ngày ứng tuyển</Text>
                    <Text style={{...STYLE.textNormal, fontSize: 18}}>{(new Date(item.date_ut)).toLocaleDateString()}</Text>
                </View>
            </View>
            <View style={{...style.applicationStatus, borderWidth: 0, padding: 0}}>
                <Icon name="briefcase-4-line"/>
                <View>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>Lĩnh vực</Text>
                    <Text style={{...STYLE.textNormal, fontSize: 18}}>{item.ten_loai}</Text>
                </View>
            </View>
            <View style={{...style.applicationStatus, borderWidth: 0, padding: 0}}>
                <Icon name="user-2-line"/>
                <View>
                    <Text style={{...STYLE.textNormal, fontSize: 15}}>Vị trí</Text>
                    <Text style={{...STYLE.textNormal, fontSize: 18}}>{item.position}</Text>
                </View>
            </View>
            <Text style={STYLE.textTitle}>Thông tin CV</Text>
            <View style={style.aItemWrap}>
                <Text style={STYLE.textTitle}>Coming soon.</Text>
            </View>
            <TouchableOpacity onPress={gotoChat} style={style.buttonStyle}>
                <Text>Chat với nhà tuyển dụng</Text>
                <Icon name="chat-3-line"/>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    buttonStyle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E2F367',
        borderRadius: 50
    },
    aItemWrap: {
        padding: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        borderRadius: 16,
        gap: 16
    },
    applicationStatus: {
        flexDirection: 'row',
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 10,
        borderRadius: 16,
        alignItems: "center"
    },
})
export default ApplicationStatus