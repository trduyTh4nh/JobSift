import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-remix-icon";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const CV = ({navigation}) => {
    const route = useRoute();
    const basicInfo = route.params;


    const [fontLoaded] = useFonts({
        'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
        'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf")
    })
    if (!fontLoaded) {
        return (
            <View>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }




    return (
        <View style={styles.cvManage}>
            <View style={styles.ModalView}>
                <TouchableOpacity style={styles.wrapButtonCreate} onPress={() => {
                    navigation.navigate("CVBasic")
                }}>
                    <Text>Tạo CV</Text>

                    <View style={styles.wrapDiamon}>
                        <Text>💎 20</Text>
                        <Icon name="add-circle-line"></Icon>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                width: "100%", paddingLeft: 28,
                paddingRight: 28, paddingTop: 20
            }}>
                <View style={styles.itemCV}>

                    <Text style={styles.nameCV}>Tran Duy Thanh - Kĩ sư phầm mềm</Text>
                    <View style={styles.createCVdetail}>
                        <Icon name="time-line"></Icon>
                        <View style={styles.detailTime}>
                            <Text style={styles.detailTitle} >Ngày tạo</Text>
                            <Text style={styles.deTailContent}>02/09/2023

                            </Text>
                        </View>
                    </View>

                    <View style={styles.createCVdetail}>
                        <Icon name="briefcase-2-line"></Icon>
                        <View style={styles.detailTime}>
                            <Text style={styles.detailTitle} >Loại</Text>
                            <Text style={styles.deTailContent}>Công nghệ thông tin

                            </Text>
                        </View>
                    </View>

                    <View style={styles.createCVdetail}>
                        <Icon name="user-2-line"></Icon>
                        <View style={styles.detailTime}>
                            <Text style={styles.detailTitle} >Vị trí</Text>
                            <Text style={styles.deTailContent}>Senior Developer

                            </Text>
                        </View>
                    </View>

                    <View style={styles.createCVdetail}>
                        <Icon name="check-double-fill"></Icon>
                        <View style={styles.detailTime}>
                            <Text style={styles.detailTitle} >Công việc đã ứng tuyển</Text>
                            <Text style={styles.deTailContent}>5
                            </Text>
                        </View>
                    </View>


                    <View style={styles.optionCV}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#E9E9E9",
                                borderRadius: 30,
                                display: "flex",
                                flexDirection: "row",
                                padding: 10,
                                margin: 4,
                                gap: 10,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flex: 1,


                            }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000",
                                    marginLeft: 6
                                }}>Delete</Text>
                                <Icon name="close-circle-line"></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: "#E9E9E9",
                                borderRadius: 30,
                                display: "flex",
                                flexDirection: "row",
                                padding: 10,
                                margin: 4,
                                gap: 10,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flex: 1
                            }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000",
                                    marginLeft: 6
                                }}>Edit</Text>
                                <Icon name="arrow-right-s-fill"></Icon>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: "#E9E9E9",
                            borderRadius: 30,
                            display: "flex",
                            flexDirection: "row",
                            padding: 10,
                            margin: 4,
                            gap: 10,
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000",
                                marginLeft: 6
                            }}>Create PDF</Text>
                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    cvManage: {
        height: "100%"
    },
    itemCV: {
        borderWidth: 2,
        borderColor: "#B0B0B0",
        padding: 20,
        display: "flex",
        gap: 8,
        borderRadius: 16
    },
    createCVdetail:
    {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    ModalView: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        height: "18%",
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    wrapDiamon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    wrapButtonCreate: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#E2F367",
        width: "90%",
        padding: 8,
        borderRadius: 22

    },
    nameCV: {
        fontFamily: "Rubik",
        fontSize: 18,
        color: "#000"
    },
    detailTitle: {
        fontFamily: "RukbikNormal",

    },
    deTailContent: {
        fontFamily: "RukbikNormal",
        fontSize: 16,
        color: "#000"
    },
    optionCV: {

    }


})

export default CV