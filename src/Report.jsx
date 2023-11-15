import React, { useState } from 'react';
import STYLE from '../assets/css/universal';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../constants/etc';
const Report = ({text='Report'}) => {
    const route = useRoute()
    const navigation = useNavigation()
    const [isChecked, setIsChecked] = useState({
        "Thông tin sai lệch": false,
        "Lừa đảo": false,
        "Vấn đề ứng tuyển": false,
        "Đa cấp": false,
        "Khác": false,
        otherReason: ''
    });
    const onPress = () => {
        var arrayReason = []
        for(var [key, val] of Object.entries(isChecked)){
            if(val === true){
                arrayReason.push(key)  
            }
        }
        const reason = arrayReason.join(', ')
        axios.post(API_URL + '/report/add', {
            "reason": reason,
            "other_reason": isChecked.otherReason,
            "id_user": global.user.user.id_user,
            "id_post": route.params.id_post
        }).then(e => {
            navigation.navigate('Home')
            Alert.alert('Thành công!', 'Chúng tôi đã tiếp nhận bài đăng của bạn. Cảm ơn vì đã góp phần giúp cho trải nghiệm ứng tuyển của người dùng được trong sạch hơn. ☺️')
        }).catch(e => {
            Alert.alert('Lỗi khi upload: ' + e)
        })
    }
    return (
        <ScrollView>
            <View style={styles.container}>
               

                <View>
                    <View style={styles.rptxt1_rptxt2}>
                        <Text style={styles.rptxt1}>Tại sao bạn lại muốn tố cáo công việc này?</Text>

                        <Text style={styles.rptxt2}>
                            Hãy tìm hiểu kĩ về nhà tuyển dụng và công việc bạn

                            tuyển.{'\n'}Bạn nên cẩn trọng với những công việc yêu

                            cầu nộp phí, hoặc những hợp đồng mập mờ, không

                            rõ ràng.{'\n'}Nếu bạn thấy rằng tin tuyển dụng này không

                            đúng, hãy phản ánh với chúng tôi.
                        </Text>
                    </View>
                </View>

                <View style={{ padding: 30 }}>
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked['Thông tin sai lệch']}
                        onClick={() => setIsChecked({ ...isChecked, "Thông tin sai lệch": !isChecked['Thông tin sai lệch'] })}
                        rightText="Thông tin sai lệch"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked['Lừa đảo']}
                        onClick={() => setIsChecked({ ...isChecked, 'Lừa đảo': !isChecked['Lừa đảo'] })}
                        rightText="Lừa đảo"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox style={{ marginBottom: 16 }}
                        isChecked={isChecked['Vấn đề ứng tuyển']}
                        onClick={() => setIsChecked({ ...isChecked, "Vấn đề ứng tuyển": !isChecked['Vấn đề ứng tuyển'] })}
                        rightText="Tôi gặp vấn đề trong quá trình ứng tuyển"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked['Đa cấp']}
                        onClick={() => setIsChecked({ ...isChecked, "Đa cấp": !isChecked['Đa cấp'] })}
                        rightText="Tôi nghĩ công ty này là đa cấp"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked['Khác']}
                        onClick={() => setIsChecked({ 
                            "Thông tin sai lệch": false,
                            "Lừa đảo": false,
                            "Vấn đề ứng tuyển": false,
                            "Đa cấp": false, "Khác": !isChecked["Khác"] })}
                        rightText="Khác"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    {isChecked['Khác'] ? (
                        <View style={styles.inputSearch}>
                            <TextInput
                                onChangeText={e => setIsChecked({...isChecked, otherReason: e})}
                                style={styles.input}
                                placeholder="Nhập lý do của bạn"
                                placeholderTextColor="rgba(0,0,0,0.15)"
                                fontWeight="700"
                            >
                            </TextInput>
                        </View>
                    ) : ''
                    
                    }
                    
                </View>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Report</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    img_textReport: {
        flexDirection: 'row',
        marginTop: 15,
        marginStart: 30,
    },

    imageButton: {
        width: 20,
        height: 20,
        marginTop: 30,

    },

    textReport: {
        position: 'absolute',
        fontSize: 29,
        padding: 20,
        marginStart: 10,
        fontWeight: '800',
        color: '#000000',
    },

    rptxt1_rptxt2: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#E9E9E9',
        borderStartColor: 20,
        justifyContent: 'center',
        borderRadius: 23,
        marginStart: 26,
        marginEnd: 24,
        marginTop: 30,
        textAlign: 'center',
        verticalAlign: 'middle',
    },

    rptxt1: {
        ...STYLE.textBold,
        fontSize: 20,
        marginBottom: 10,
        color: '#000000',
       
    },

    rptxt2: {
        ...STYLE.textNormal,
        fontSize: 16,
        alignSelf: 'flex-start',
        color: '#000000',
        marginBottom: 5,
    },

    checkbox: {
        alignSelf: 'center',
    },

    label: {
        marginStart: 12,
        marginBottom: 1.5,
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
    },

    button: {
        borderRadius: 52,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#E2F367',
        marginStart: 26,
        marginEnd: 26,
    },

    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 20,
        textAlign: 'center',
    },
    inputSearch: {
        color: '#F1F1F1',
        width: "100%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
});

export default Report