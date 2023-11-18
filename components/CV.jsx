import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Pressable } from "react-native";
import Icon from "react-native-remix-icon";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react"
import axios from "axios";
import { API_URL } from "../ipConfig";


const CV = ({ navigation }) => {
    const route = useRoute();
    const basicInfo = route.params;
    const [cvAdded, setCvAdded] = useState()
    const idUser = global.user.user.id_user
    useEffect(() => {
        axios.post(`http://${API_URL}:3001/getallcv/${idUser}`)
            .then((result) => {
                setCvAdded(result.data.result)
            })
            .catch((error) => {
                console.log("ERROR: " + error)
            })
    }, [])
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


    const ItemCV = ({ item, onDelete, onNavigate }) => {
        return (
            <View style={styles.itemCV}>

                <Text style={styles.nameCV}>{item.cv_title}</Text>
                <View style={styles.createCVdetail}>
                    <Icon name="briefcase-2-line"></Icon>
                    <View style={styles.detailTime}>
                        <Text style={styles.detailTitle} >Loại</Text>
                        <Text style={styles.deTailContent}>{item.loai_cong_viec}

                        </Text>
                    </View>
                </View>

                <View style={styles.createCVdetail}>
                    <Icon name="user-2-line"></Icon>
                    <View style={styles.detailTime}>
                        <Text style={styles.detailTitle} >Vị trí</Text>
                        <Text style={styles.deTailContent}>{item.position}

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
                        <TouchableOpacity
                            onPress={() => {
                                axios.post(`http://${API_URL}:3001/removecv/${item.id_cv}`)
                                    .then((respone) => {
                                        console.log(respone.data.message)
                                        onDelete()
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }}
                            style={{
                                backgroundColor: "#FFA7B7",
                                borderRadius: 30,
                                display: "flex",
                                flexDirection: "row",
                                padding: 10,
                                margin: 4,
                                gap: 10,
                                alignItems: "center",
                                justifyContent: "space-between",



                            }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000",
                                marginLeft: 6
                            }}>Xóa</Text>
                            <Icon name="close-circle-line"></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { onNavigate() }}
                            style={{
                                backgroundColor: "#E2F367",
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
                            }}>Xem CV</Text>
                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        )
    }
    const deleteItem = (item) => {
        var temp = cvAdded.filter((obj) => item != obj)
        setCvAdded(temp)
    }
    const handelNavigate = (item) => {
        navigation.navigate('CV chi tiết', { cv: item })
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
                paddingRight: 28, paddingTop: 20,
                marginBottom: 140
            }}>
                {
                    cvAdded ? (
                        <FlatList
                            data={cvAdded}
                            ItemSeparatorComponent={() => (<View style={{ height: 30 }}></View>)}
                            renderItem={({ item }) => <ItemCV onNavigate={() => handelNavigate(item)} onDelete={() => { deleteItem(item) }} item={item} ></ItemCV>}
                        >

                        </FlatList>
                    ) : <ActivityIndicator></ActivityIndicator>
                }
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
        padding: 16,
        display: "flex",
        gap: 8,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    createCVdetail:
    {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    ModalView: {
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
        height: "20%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        zIndex: 10,

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
        borderRadius: 22,

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
        zIndex: 10
    }


})

export default CV