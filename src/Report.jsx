import React, { useState } from 'react';
import STYLE from '../assets/css/universal';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import CheckBox from 'react-native-check-box';
const Report = ({text='Report'}) => {
    const [isChecked, setIsChecked] = useState({
        "Inaccurate information": false,
        "Scam": false,
        "I have a problem while applying": false,
        "I think this is a pyramid scheme": false,
        "Other": false,
    });
    const onPress = () => {
        setIsChecked(true)
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
                        isChecked={isChecked['Inaccurate information']}
                        onClick={() => setIsChecked({ ...isChecked, "Inaccurate information": !isChecked['Inaccurate information'] })}
                        rightText="Inaccurate information"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked.Scam}
                        onClick={() => setIsChecked({ ...isChecked, Scam: !isChecked.Scam })}
                        rightText="Scam"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox style={{ marginBottom: 16 }}
                        isChecked={isChecked['I have a problem while applying']}
                        onClick={() => setIsChecked({ ...isChecked, "I have a problem while applying": !isChecked['I have a problem while applying'] })}
                        rightText="I have a problem while applying"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked['I think this is a pyramid scheme']}
                        onClick={() => setIsChecked({ ...isChecked, "I think this is a pyramid scheme": !isChecked['I think this is a pyramid scheme'] })}
                        rightText="I think this is a pyramid scheme"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                    <CheckBox
                        style={{ marginBottom: 16 }}
                        isChecked={isChecked.Other}
                        onClick={() => setIsChecked({ ...isChecked, Other: !isChecked.Other })}
                        rightText="Other"
                        rightTextStyle={{ fontSize: 19, fontWeight: '600' }}
                    />
                </View>

                <TouchableOpacity style={{marginTop: -100}}  onPress={onPress}>
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
        marginTop: 100,
    },

    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Report