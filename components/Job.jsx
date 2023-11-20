import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import STYLE from "../assets/css/universal";
import { FlatList } from "react-native";
import { ScrollView, TextInput, ToastAndroid } from "react-native";
import Icon from "react-native-remix-icon";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Error from "./Error";
import { useFonts } from "expo-font";
import Modal from 'react-native-modal'

import { API_URL } from "../ipConfig";

import NearbyJob from "../Job/NearbyJob";
import { ActivityIndicator } from "react-native-paper";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";


const Job = () => {


    const showToast = (title) => {
        ToastAndroid.show(title, ToastAndroid.SHORT)
    }
    const [showModal, setShowModal] = useState(false)
    const applyCVRef = useRef(null)

    const [dataSearch, setDataSearch] = useState('Không có nội dung')

    const [checkVar, setCheckVar] = useState(false)

    const [kq, setKq] = useState({})

    const handleCVApply = () => {
        applyCVRef.current?.show()
    }
    const handleSearch = (text) => {

        setDataSearch(text);

        const apiUrl = `http://${API_URL}:3001/search/${text}`;

        axios.post(apiUrl, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const result_ = response.data.result;
                setKq(result_);
                // console.log("DATA SEARCHING: " + JSON.stringify(result_));
            })
            .catch((error) => {
                setKq({})
            });
    };

    // const handleSearchWithButton = (text) => {

    //     const apiUrl = `http://${API_URL}:3001/search/${text}`;

    //     axios.post(apiUrl, {}, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => {
    //             const result_ = response.data.result;
    //             setKq(result_);
    //             // console.log("DATA SEARCHING: " + JSON.stringify(result_));
    //         })
    //         .catch((error) => {
    //             setKq({})
    //         });
    // };

    const [formData, setFormData] = useState({
        nameJob: '',
        company: '',
        category: '',
        position: '',
        salaryFrom: '',
        salaryTo: ''
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });


    };
    useEffect(() => {
        if (Number(formData.salaryTo) < Number(formData.salaryFrom)
            || Number(formData.salaryTo) < 0
            || Number(formData.salaryFrom) < 0
            || isNaN(Number(formData.salaryFrom))
            || isNaN(Number(formData.salaryTo))
        ) {
            setCheckVar(true)
        }
        else {
            setCheckVar(false)
        }
    }, [formData])


    // const [fontLoaded] = useFonts({
    //     'Rubik': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     'RukbikNormal': require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    //     'RubikBold': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     'RubikBlack': require("../assets/fonts/Rubik/static/Rubik-Black.ttf"),
    //     'RubikBold': require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    //     'RubikLight': require("../assets/fonts/Rubik/static/Rubik-Light.ttf"),
    //     'RubikMedium': require("../assets/fonts/Rubik/static/Rubik-Medium.ttf"),
    // })
    // if (!fontLoaded) {
    //     return (
    //         <View>
    //             <Text>Loading..........</Text>
    //         </View>
    //     )
    // }

    const handlePopUpModal = async () => {
        const sheet = await SheetManager.show('search-sheet')
        console.log(sheet)
        handleGetAllData(sheet)
    }

    const handleGetAllData = (data) => {
        const apiUrl = `http://${API_URL}:3001/searchfilter`;
        axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const dataFiltered = response.data.result;
              //  console.log("DATA FILTERED: ", dataFiltered);
                setKq({})
                setKq(dataFiltered);
                setShowModal(false);
            })
            .catch((error) => {
                showToast("No result")
            })
    };



    const renderJobNearBy = ({ item }) => (
        <NearbyJob dataNearby={item} />
    );


    return (
        <SafeAreaView style={{ width: "100%", marginTop: 16 }}>
            <View style={styles.wrapSearch}>
                <View style={{
                    backgroundColor: 'rgba(230, 230, 230, 1)',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    width: "90%"
                }}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#999"
                        onChangeText={handleSearch}
                    >
                    </TextInput>
                    <Icon name="search-line"></Icon>
                </View>
            </View>

            <View style={styles.fillter}>
                <TouchableOpacity
                    onPress={handlePopUpModal}
                    style={{
                        backgroundColor: "#e2f367",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 8,
                        alignItems: "center"
                    }}>
                    <Text style={{
                        fontFamily: 'Rubik',
                        fontSize: 14
                    }}>Bộ lọc</Text>
                    <Icon name="equalizer-fill"></Icon>
                </TouchableOpacity>
            </View>
            

            <View style={{
                paddingLeft: 14,
                paddingRight: 14,
                marginTop: 10,

            }}>
                <Text
                    style={{
                        fontFamily: 'RukbikNormal',
                        color: "#000"
                    }}
                >Đang hiển thị {kq ? kq.length : "0"} kết quả của "{dataSearch}"</Text>
            </View>
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.resSearch}>
                    {
                        // dataSearch ? (

                        //         <ActivityIndicator></ActivityIndicator>
                        // ) : <View style={{
                        //     width: "100%",
                        //     display: "flex",
                        //     alignItems: "center",
                        //     marginTop: 30
                        // }}>
                        //     <Text style={{
                        //         fontFamily: "RukbikNormal"
                        //     }}>No result search</Text>
                        // </View>

                        kq ? (
                            <FlatList
                                style={styles.wrapJobNearBy}
                                data={kq}
                                renderItem={renderJobNearBy}
                                keyExtractor={(item) => item.id_post.toString()}
                                contentContainerStyle={{ columnGap: 20 }}
                                scrollEnabled={false}
                            ></FlatList>
                        ) : <ActivityIndicator></ActivityIndicator>

                    }
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    resSearch: {
        flex: 1,
        marginBottom: 225
    }
    ,
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
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        justifyContent: "center",

    },
    inputSearch: {
        color: '#000',
        width: "78%",
        height: 50,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,

        fontSize: 16,
        fontFamily: 'RukbikNormal',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    searchBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4
    },
    wrapSearchBtn: {

    },

    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "#F3F4F8",
    },
    fillter: {
        marginTop: 20,
        paddingLeft: 14,
        paddingRight: 14
    },
    wrapTextOption: {
        marginBottom: 20
    },
    modal_item: {

    },
    wrapTextOption: {
    },
    titleFilter: {
        color: "#000",
        fontFamily: "RubikBold"
    },
    textInputModal: {
        backgroundColor: "#F1F1F1",
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        alignItems: "center"
    }
})
export default Job