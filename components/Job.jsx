import React, { useEffect, useState } from "react";
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

const Job = () => {

    const showToast = (title) => {
        ToastAndroid.show(title, ToastAndroid.SHORT)
    }
    const [showModal, setShowModal] = useState(false)

    const [dataSearch, setDataSearch] = useState('No content')

    const [checkVar, setCheckVar] = useState(false)

    const [kq, setKq] = useState({})


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

    const handlePopUpModal = () => {
        setShowModal(true)
    }

    const handleGetAllData = () => {
        const apiUrl = `http://${API_URL}:3001/searchfilter`;
        axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const dataFiltered = response.data.result;
                console.log("DATA FILTERED: ", dataFiltered);
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
        <View style={{ width: "100%", marginTop: 16 }}>
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
                        placeholder="Find your new job"
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
                    }}>Fillter</Text>
                    <Icon name="equalizer-fill"></Icon>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={showModal}
                onSwipeComplete={() => { setShowModal(false) }}
                onBackdropPress={() => { setShowModal(false) }}
                swipeDirection={'down'}
                style={{ margin: 0 }}
            >
                <SafeAreaView style={{
                    backgroundColor: "#fff", position: "absolute", bottom: 0, width: "100%",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 25,
                    paddingRight: 20,
                    display: "flex",
                    gap: 14
                }}>
                    <View style={{
                        ...styles.wrapTextOption,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>
                        <Text style={{
                            ...STYLE.textTitle
                        }}>Filter</Text>

                        <Icon name="filter-2-fill"></Icon>
                    </View>
                    <View style={styles.modal_item}>
                        <Text style={styles.titleFilter}>Name job: </Text>
                        <TextInput style={styles.textInputModal}
                            placeholder="Name"
                            value={formData.nameJob}
                            onChangeText={text => handleInputChange('nameJob', text)}

                        ></TextInput>
                    </View>

                    <View style={styles.modal_item}>
                        <Text style={styles.titleFilter}>Company</Text>
                        <TextInput style={styles.textInputModal}
                            placeholder="Name"
                            value={formData.company}
                            onChangeText={text => handleInputChange('company', text)}

                        ></TextInput>
                    </View>
                    <View style={styles.modal_item}>
                        <Text style={styles.titleFilter}>Category</Text>
                        <TextInput style={styles.textInputModal}
                            placeholder="Name"
                            value={formData.category}
                            onChangeText={text => handleInputChange('category', text)}
                        ></TextInput>
                    </View>
                    <View style={styles.modal_item}>
                        <Text style={styles.titleFilter}>Postition</Text>
                        <TextInput style={styles.textInputModal}
                            placeholder="Name"
                            value={formData.position}
                            onChangeText={text => handleInputChange('position', text)}

                        ></TextInput>
                    </View>

                    <View style={{
                        ...styles.modal_item,
                        marginBottom: 16
                    }}>
                        <Text style={styles.titleFilter}>Salary</Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <TextInput style={{
                                ...styles.textInputModal,
                                width: "42%",
                                borderWidth: checkVar ? 1 : 0,
                                borderColor: checkVar ? "red" : "#000"

                            }}
                                placeholder="To"
                                value={formData.salaryFrom ? formData.salaryFrom : ""}
                                onChangeText={text => handleInputChange('salaryFrom', text)}
                            ></TextInput>
                            <Icon name="arrow-left-right-fill"></Icon>
                            <TextInput style={{
                                ...styles.textInputModal,
                                width: "42%",
                                borderWidth: checkVar ? 1 : 0,
                                borderColor: checkVar ? "red" : "#000",

                            }}
                                placeholder="From"
                                value={formData.salaryTo ? formData.salaryTo : ""}
                                onChangeText={text => handleInputChange('salaryTo', text)}
                            ></TextInput>
                        </View>
                    </View>


                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16

                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#e2f367",
                            width: "80%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 6,
                            borderRadius: 10

                        }}

                            onPress={handleGetAllData}
                        >
                            <Text style={{
                                fontFamily: 'RukbikNormal',
                            }}>Done</Text>
                        </TouchableOpacity>
                    </View>


                </SafeAreaView>
            </Modal>


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
                >Showing {kq ? kq.length : "0"} result of "{dataSearch}"</Text>
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


        </View>
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
        marginBottom: 20
    },
    titleFilter: {
        color: "#000",
        fontFamily: "RubikBold"
    },
    textInputModal: {
        backgroundColor: "#F1F1F1",
        padding: 10,
        borderRadius: 12,
        marginTop: 8,
        alignItems: "center"
    }
})
export default Job