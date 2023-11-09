import React, { useEffect } from "react"
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"
import DatePicker from "react-native-date-picker"
import { useState } from "react"
import Icon from "react-native-remix-icon"


const PopUpAdd = ({ sendSignalToParent, sendDataToParent , dataWEedited}) => {


    const [dateBirth, setDateBirth] = useState(new Date(global.user.user.ngaysinh));

    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const [dateBirth2, setDateBirth2] = useState(new Date(global.user.user.ngaysinh));

    const [datePickerOpen2, setDatePickerOpen2] = useState(false);


    const [objWrk, setOjbWrk] = useState({})

    const [autoIncrement, setAutoIncrement] = useState(0)

    const [dataRecieve, setDataRecieve] = useState({})


    

    // Hàm xử lý

   // console.log("DATA ĐÃ Nhận: " + JSON.stringify(dataWEedited))


    const handleClosePopUp = () => {
        sendSignalToParent(false)
    }

    const handleAddItem = () => {

        sendDataToParent(objWrk);
        handleClosePopUp();


    };

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
        <View style={styles.overlay}>
            <View style={styles.wrapPopUp}>
                <View style={styles.itemAdd}>
                    <Text style={styles.textTitle}>Tên công ty</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setOjbWrk({
                                ...objWrk,
                                nameCompany: text
                            })
                        }} style={styles.textInput} placeholder="Tên công ty"></TextInput>
                </View>

                <View style={styles.itemAdd}>
                    <Text style={styles.textTitle}>Vị trí</Text>
                    <TextInput onChangeText={(text) => {
                        setOjbWrk({
                            ...objWrk,
                            postition: text
                        })
                    }} style={styles.textInput} placeholder="...."></TextInput>
                </View>

                <View>
                    <Text style={styles.textTitle}>Ngày bắt đầu</Text>
                    <View style={styles.inputSearch}>
                        <Text style={{ fontWeight: 'bold' }}>{dateBirth.toLocaleDateString()}</Text>
                        <TouchableOpacity onPress={() => { setDatePickerOpen(true) }}>
                            <Icon name="calendar-line"></Icon>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={datePickerOpen}
                            date={dateBirth}
                            onConfirm={(date) => {
                                setDatePickerOpen(false)
                                setDateBirth(date)
                                setOjbWrk({
                                    ...objWrk,
                                    dateStart: date
                                })
                                // setDataCv({
                                //     ...DataCv,
                                //     birthUserCV: date
                                // })
                                // setUser({
                                //     ...user,
                                //     ngaysinh: date
                                // })
                            }}
                            onCancel={
                                () => { setDatePickerOpen(false) }
                            }
                        />
                    </View>
                </View>



                <View>
                    <Text style={styles.textTitle}>Ngày kết thúc</Text>
                    <View style={styles.inputSearch}>
                        <Text style={{ fontWeight: 'bold' }}>{dateBirth2.toLocaleDateString()}</Text>
                        <TouchableOpacity onPress={() => { setDatePickerOpen2(true) }}>
                            <Icon name="calendar-line"></Icon>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={datePickerOpen2}
                            date={dateBirth2}
                            onConfirm={(date) => {
                                setDatePickerOpen2(false)
                                setDateBirth2(date)
                                setOjbWrk({
                                    ...objWrk,
                                    dateEnd: date
                                })
                                // setDataCv({
                                //     ...DataCv,
                                //     birthUserCV: date
                                // })
                                // setUser({
                                //     ...user,
                                //     ngaysinh: date
                                // })
                            }}
                            onCancel={
                                () => { setDatePickerOpen2(false) }
                            }
                        />
                    </View>
                </View>

                <View style={styles.buttonOption}>
                    <TouchableOpacity
                        onPress={handleClosePopUp}
                        style={{
                            backgroundColor: "#ccc",
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 20,
                            flex: 1,
                        }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleAddItem}
                        style={{
                            backgroundColor: "#E2F367",
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 20,
                            flex: 1,
                        }}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1
    },
    wrapPopUp: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 28,
        borderRadius: 10,
        display: "flex",
        gap: 10,

    },
    textTitle: {
        fontFamily: "Rubik",
        fontSize: 16
    },
    textInput: {
        fontFamily: "RukbikNormal",
        borderWidth: 2,
        borderColor: "#B0B0B0",
        marginTop: 4,
        paddingLeft: 18,
        paddingRight: 10,
        borderRadius: 16,
        marginBottom: 2
    },
    inputSearch: {
        fontFamily: "RukbikNormal",
        borderWidth: 2,
        borderColor: "#B0B0B0",
        marginTop: 4,
        paddingLeft: 18,
        paddingRight: 10,
        borderRadius: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 55,
        alignItems: "center"
    },
    buttonOption: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10
    }
})
export default PopUpAdd