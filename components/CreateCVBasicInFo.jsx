import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Platform } from "react-native";
import Icon from "react-native-remix-icon";
import { useFonts } from "expo-font";
import { Picker } from '@react-native-picker/picker';

import { ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';


const CreateCVBasicInFo = () => {

    const navigation = useNavigation();

    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')
    const [experience, setExperience] = useState('')
    const [position, setPosition] = useState('')

    const formData = {
        ngon_ngu: language,
        job_category: category,
        kinh_nghiem: experience,
        position: position
    }

    const handleNextBasicInfo = () => {
        navigation.navigate("CreateCV", { basicInFo: formData })
    }


    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View >
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }

    return (
    <ScrollView>
        <View style={styles.container}>
            <View style={{
                paddingLeft: 18,
                paddingRight: 18,
                paddingTop: 10,
                paddingRight: 18
            }}>
                <Text style={styles.title}>Thông tin cơ bản</Text>

                {
                    Platform.OS == 'ios' ? (
                            <View style={styles.wrapInput}>
                                <Text style={styles.inputItemTitle}>Ngôn ngữ</Text>
                                <Picker
                                            selectedValue={language}
                                            style={styles.selectIOS}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setLanguage(itemValue);
                                            }}
                                        >
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800",
                                        fontFamily: "RukbikNormal"
                                    }} label="Tiếng Việt 🇻🇳" value="Tiếng Việt" >

                                    </Picker.Item>
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Tiếng Anh 🇬🇧" value="Tiếng Anh" />
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Tiếng Trung 🇨🇳" value="Tiếng Trung" />
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Tiếng Pháp 🇫🇷" value="Tiếng Pháp" />
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Tiếng Tây Ban Nha 🇪🇸" value="Tiếng Tây Ban Nha" />
                                </Picker>
                                <Text style={styles.inputItemTitle}>Loại công việc</Text>
                                <Picker
                                            selectedValue={category}
                                            style={styles.selectIOS}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setCategory(itemValue);
                                            }}
                                        >
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800",
                                        fontFamily: "RukbikNormal"
                                    }} label="Part-time" value="Part-time" >

                                    </Picker.Item>
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Full-time" value="Full-time" />
                                    <Picker.Item style={{
                                        fontSize: 16,
                                        fontWeight: "800"
                                    }} label="Remote" value="Remote" />
                                </Picker>
                                <Text style={styles.inputItemTitle}>Kinh nghiệm</Text>
                                    <Picker
                                        selectedValue={experience}
                                        style={styles.selectIOS}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setExperience(itemValue);
                                        }}
                                    >
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800",
                                            fontFamily: "RukbikNormal"
                                        }} label="6 tháng" value="6 tháng" >
                                        </Picker.Item>
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="1 năm" value="1 năm" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="5 năm" value="5 năm" />
                                    </Picker>
                               
                                <Text style={styles.inputItemTitle}>Vị trí</Text>
                                <View style={styles.wrapPicker1}>
                                    <TextInput 
                                    onChangeText={(value) => {
                                        setPosition(value)
                                    }}
                                    style={{
                                        width: "100%",
                                        paddingLeft: 18
                                    }}>

                                    </TextInput>
                                </View>
                            </View>
                        
                    ) : (
                        <View style={styles.wrapInput}>
                            <View style={styles.inputItem}>
                                <Text style={styles.inputItemTitle}>Ngôn ngữ</Text>
                                <View style={styles.wrapPicker}>
                                    <Picker
                                        selectedValue={language}
                                        style={styles.pickerItem}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setLanguage(itemValue);
                                        }}
                                    >
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800",
                                            fontFamily: "RukbikNormal"
                                        }} label="Tiếng Việt 🇻🇳" value="Tiếng Việt" >

                                        </Picker.Item>
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Tiếng Anh 🇬🇧" value="Tiếng Anh" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Tiếng Trung 🇨🇳" value="Tiếng Trung" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Tiếng Pháp 🇫🇷" value="Tiếng Pháp" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Tiếng Tây Ban Nha 🇪🇸" value="Tiếng Tây Ban Nha" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputItem}>
                                <Text style={styles.inputItemTitle}>Loại công việc</Text>
                                <View style={styles.wrapPicker1}>
                                    <Picker
                                        selectedValue={category}
                                        style={styles.pickerItem}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setCategory(itemValue);
                                        }}
                                    >
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800",
                                            fontFamily: "RukbikNormal"
                                        }} label="Part-time" value="Part-time" >

                                        </Picker.Item>
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Full-time" value="Full-time" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Remote" value="Remote" />

                                    </Picker>
                                </View>
                            </View>


                            <View style={styles.inputItem}>
                                <Text style={styles.inputItemTitle}>Kinh nghiệm</Text>
                                <View style={styles.wrapPicker1}>
                                    <Picker
                                        selectedValue={experience}
                                        style={styles.pickerItem}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setExperience(itemValue);
                                        }}
                                    >
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800",
                                            fontFamily: "RukbikNormal"
                                        }} label="6 tháng" value="6 tháng" >

                                        </Picker.Item>
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="1 năm" value="1 năm" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="5 năm" value="5 năm" />

                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputItem}>
                                <Text style={styles.inputItemTitle}>Vị trí</Text>
                                <View style={styles.wrapPicker1}>
                                    <TextInput 
                                    onChangeText={(value) => {
                                        setPosition(value)
                                    }}
                                    style={{
                                        width: "100%",
                                        paddingLeft: 18
                                    }}>

                                    </TextInput>
                                </View>
                            </View>


                        </View>
                    )
                }
                

                <View style={styles.btnNext}>
                    <TouchableOpacity
                        onPress={handleNextBasicInfo}
                        style={{
                            backgroundColor: "#E2F367",
                            width: 150,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 20,
                            elevation: 2
                        }}>
                        <Text style={styles.inputItemTitle} >Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 100
    },  
    selectIOS: {borderColor: '#B0B0B0', borderWidth: 2, borderRadius: 16},
    title: {
        fontFamily: "Rubik",
        fontSize: 20,
        color: "#000",
        marginTop: 10
    },
    inputItemTitle: {
        fontFamily: "RukbikNormal",
        fontSize: 16,
        color: "#000"
    },
    pickerItem: {
        height: 50,
        width: 240,
        width: "98%",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10
    },
    wrapPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#E2F367",
        borderRadius: 16,
        borderWidth: 2, borderColor: "#000",
        width: "100%",
        marginTop: 6
    },
    wrapPicker1: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
       
        borderRadius: 16,
        borderWidth: 2, 
        borderColor: "#B0B0B0",
        width: "100%",
        marginTop: 6
    },
    wrapInput: {
        marginTop: 20,
        display: "flex",
        gap: 20
    },
    btnNext: {
        marginTop: 40,
        widtd: "100%",
        display: "flex",
        alignItems: "flex-end",
        paddingRight: 10
    }
})


export default CreateCVBasicInFo