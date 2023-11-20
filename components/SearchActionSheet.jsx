const { default: ActionSheet, SheetManager } = require("react-native-actions-sheet")
import { View, ScrollView, Text, TextInput, TouchableOpacity, Switch, Platform } from "react-native"
import Icon from "react-native-remix-icon"
import STYLE from "../assets/css/universal"
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { Picker } from '@react-native-picker/picker';
import { API_URL } from "../constants/etc"
import axios from "axios"
const SearchActionSheet = (props) => {
    const [checkVar, setVar] = useState(false)
    const [formData, setForm] = useState({
        nameJob: '',
        company: '',
        category: '',
        position: '',
        salaryFrom: '',
        salaryTo: '',
        currency: ''
    })
    const [positionList, setPositions] = useState([])
    const [nnList, setNN] = useState([])
    const [currencyList, setCur] = useState([])
    useEffect(() => {
        axios.post(API_URL + '/getallposition').then(e => {
            console.log(e.data.allPosition)
            setPositions(e.data.allPosition)
            axios.post(API_URL + '/getallnn').then(e => {
                console.log(e.data)
                setNN(e.data)
                axios.post(API_URL + '/getallcurrency').then(e => {
                    console.log(e.data)
                    setCur(e.data)
                })
            })
        })
    }, [])
    const [optionalData, setOptionalData] = useState({
        loai_cv: false,
        vi_tri: false
    })

    const setValueCompany = (value) => {
        setForm({
             ...formData,
             company: value
         })
    }
    const setValueName = (value) => {
        setForm({
            ...formData,
            nameJob: value
        })
    }
    const setCategoryName = (value) => {
        setForm({
            ...formData,
            category: value
        })
    }
    const setSalaryFrom = (value) => {
        setForm({
            ...formData,
            salaryFrom: value
        })
    }
    const setSalaryTo = (value) => {
        setForm({
            ...formData,
            salaryFrom: value
        })
    }
    const setPositionName = (value) => {
        setForm({
            ...formData,
            position: value
        })
    }
    const setCurrency = (value) => {
        setForm({
            ...formData,
            currency: value
        })
    }
    const submit = () => {
        SheetManager.hide(props.sheetId, {
            payload: formData
        })
    }
    return (
        <ActionSheet
            gestureEnabled
        >
            <View style={{...STYLE.modalChild}}>
                <ScrollView>
                    <View style={{gap: 16}}>

                        <View style={{
                            ...styles.wrapTextOption,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                ...STYLE.textTitle
                            }}>Bộ lọc</Text>

                            <Icon name="filter-2-fill"></Icon>
                        </View>
                        <View style={styles.modal_item}>
                            <Text style={styles.titleFilter}>Tên công việc</Text>
                            <TextInput style={styles.textInputModal}
                                placeholder="Nhập tên"
                                onChangeText={(t) => setValueName(t)}
                            ></TextInput>
                        </View>

                        <View style={styles.modal_item}>
                            <Text style={styles.titleFilter}>Tên công ty</Text>
                            <TextInput style={styles.textInputModal}
                                placeholder="Nhập doanh nghiệp"
                                onChangeText={(t) => setValueCompany(t)}
                            ></TextInput>
                        </View>
                        <View style={styles.modal_item}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={styles.titleFilter}>Loại công việc</Text>
                                <Switch
                                    value={optionalData.loai_cv}
                                    onValueChange={(e) => {
                                        setOptionalData({
                                            ...optionalData,
                                            loai_cv: e
                                        })
                                        if(!e){
                                            setCategoryName('')
                                        } else
                                            setCategoryName(1)
                                    }}
                                    
                                ></Switch>
                            </View>
                                {
                                    optionalData.loai_cv ? Platform.OS == 'ios' ? (
                                        <View>
                                            <Picker
                                                selectedValue={formData.category}
                                                onValueChange={(e) => {setCategoryName(e)}}
                                                style={{...STYLE.selectIOS, marginTop: 20}}
                                            >
                                            {
                                            nnList.map((e) => (
                                                <Picker.Item
                                                    key={e.id_loai}
                                                    label={e.ten_loai}
                                                    value={e.id_loai}></Picker.Item>   
                                            ))
                                        }  
                                            </Picker>
                                        </View>
                                    ) : '' : ''
                                }
                        </View>
                        <View style={styles.modal_item}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={styles.titleFilter}>Vị trí</Text>
                                <Switch
                                    value={optionalData.vi_tri}
                                    onValueChange={(e) => {
                                        
                                        setOptionalData({
                                            ...optionalData,
                                            vi_tri: e
                                        })
                                        if(!e){
                                            setPositionName('')
                                        } else {
                                            setPositionName(1)
                                        }
                                    }}
                                ></Switch>
                            </View>
                            {
                                optionalData.vi_tri ? Platform.OS == 'ios' ? (
                                    <View>
                                        <Picker
                                        
                                            onValueChange={(e) => {setPositionName(e)}}
                                            style={{...STYLE.selectIOS, marginTop: 20}}
                                            selectedValue={formData.position}
                                        >
                                        {
                                            positionList.map((e) => (
                                                <Picker.Item
                                                    key={e.id_vitri}
                                                    label={e.ten_vitri}
                                                    value={e.id_vitri}></Picker.Item>   
                                            ))
                                        }
                                        </Picker>
                                    </View>
                                ) : '' : ''
                            }
                        </View>

                        <View style={{
                            ...styles.modal_item,
                            marginBottom: 16
                        }}>
                            <Text style={styles.titleFilter}>Lương</Text>
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
                                    placeholder="Thấp nhất"
                                ></TextInput>
                                <Icon name="arrow-left-right-fill"></Icon>
                                <TextInput style={{
                                    ...styles.textInputModal,
                                    width: "42%",
                                    borderWidth: checkVar ? 1 : 0,
                                    borderColor: checkVar ? "red" : "#000",

                                }}
                                    placeholder="Cao nhất"
                                ></TextInput>
                            </View>
                        </View>
                        <View style={styles.modal_item}>
                            <Text style={styles.titleFilter}>Tiền tệ</Text>
                            <Picker
                                        
                                onValueChange={(e) => {setCurrency(e)}}
                                style={{...STYLE.selectIOS, marginTop: 20}}
                                selectedValue={formData.currency}
                            >
                            {
                                currencyList.map((e) => (
                                    <Picker.Item
                                        key={e.currency}
                                        label={e.currency}
                                        value={e.currency}></Picker.Item>   
                                ))
                            }
                            </Picker>
                        </View>

                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 16

                        }}>
                            <TouchableOpacity onPress={submit} style={{
                                backgroundColor: "#e2f367",
                                width: '100%',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 16,
                                borderRadius: 10

                            }}
                            >
                                <Text style={{
                                    fontFamily: 'RukbikNormal',
                                }}>Hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>   
        </ActionSheet>
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
export default SearchActionSheet