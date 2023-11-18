import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Animated, FlatList, SafeAreaView, Platform } from 'react-native'
import { useFonts } from "expo-font"
import { useState } from "react"
import DatePicker from "react-native-date-picker"
import Icon from "react-native-remix-icon"
import * as ImagePicker from 'expo-image-picker'
import PopUpAdd from "../src/PopUpAdd"
import Modal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import STYLE from "../assets/css/universal"
import axios from "axios"
import { API_URL } from "../ipConfig"
import { socket } from "../constants/socket.io/socket"
import storage from '@react-native-firebase/storage';

import { useRoute } from '@react-navigation/native';


const CvDetail = ({ navigation }) => {

    const route = useRoute();
    const { cv } = route.params;

    console.log("CV đã tranfers: " + JSON.stringify(cv))


    const [animation] = useState(new Animated.Value(0));
    const [text, setText] = useState('');
    const [italic, setItalic] = useState(true)
    const [bold, setBold] = useState(true)
    const [underline, setUnderline] = useState(true)
    const [introduction, setIntroduction] = useState("")
    const [italic2, setItalic2] = useState(true)
    const [bold2, setBold2] = useState(true)
    const [underline2, setUnderline2] = useState(true)
    const [introduction2, setIntroduction2] = useState("")
    const [imageProfile, setImageProfile] = useState()
    const [DataCv, setDataCv] = useState()
    const [isVisible, setIsVisible] = useState(false);
    const [checkLength, setCheckLength] = useState(false)

    const [objWorkEx, setObjWorkEx] = useState([])
    const [dataEditWorkEx, setDataEditWorkEx] = useState({})

    const [objEducation, setObjEducation] = useState([])
    const [dataEditBE, setDataEditBE] = useState({})


    const [objActivity, setObjActivity] = useState([])
    const [dataEditAC, setDataEditAC] = useState({})


    const [objLanguage, setObjLanguage] = useState([])
    const [dataEditLA, setDataEditLA] = useState({})

    const [objCertificate, setObjCertificate] = useState([])
    const [dataEditCer, setDataEditCer] = useState({})



    const [keyCounter, setKeyCounter] = useState(0);
    const [keyCounter2, setKeyCounter2] = useState(0);
    const [keyCounter3, setKeyCounter3] = useState(0);
    const [keyCounter4, setKeyCounter4] = useState(0);
    const [keyCounter5, setKeyCounter5] = useState(0);

    const [dateBirtht, setDateBirtht] = useState(new Date());
    const [datePickerOpent, setDatePickerOpent] = useState(false);
    const [dateBirth2, setDateBirth2] = useState(new Date());
    const [datePickerOpen2, setDatePickerOpen2] = useState(false);

    const [dateBirth3, setDateBirth3] = useState(new Date());
    const [datePickerOpen3, setDatePickerOpen3] = useState(false);
    const [dateBirth4, setDateBirth4] = useState(new Date());
    const [datePickerOpen4, setDatePickerOpen4] = useState(false);

    const [dateBirth5, setDateBirth5] = useState(new Date());
    const [datePickerOpen5, setDatePickerOpen5] = useState(false);
    const [dateBirth6, setDateBirth6] = useState(new Date());
    const [datePickerOpen6, setDatePickerOpen6] = useState(false);

    const [dateBirth7, setDateBirth7] = useState(new Date());
    const [datePickerOpen7, setDatePickerOpen7] = useState(false);

    const [levelLA, setLevelLA] = useState('Bình thường');

    const [objWrk, setOjbWrk] = useState({})
    const [objbBE, setOjbBE] = useState({})
    const [objbAC, setOjbAC] = useState({})
    const [objbLA, setOjbLA] = useState({})
    const [objbCer, setOjbCer] = useState({})

    const [showModalWE, setShowModalWE] = useState(false)
    const [showModalBE, setShowModalBE] = useState(false)
    const [showModalAC, setShowModalAC] = useState(false)
    const [showModalLA, setShowModalLA] = useState(false)
    const [showModalCer, setShowModalCer] = useState(false)


    const handleItalic = () => {
        setItalic(!italic)
    }


    const handleBold = () => {
        setBold(!bold)
    }

    const handleUnderline = () => {
        setUnderline(!underline)
    }

    const handleIntroduction = (value) => {
        setIntroduction(value)
        setDataCv({
            ...DataCv,
            introductionUserCV: value
        })
    }


    const handleItalic2 = () => {
        setItalic2(!italic2)
    }


    const handleBold2 = () => {
        setBold2(!bold2)

        console.log("Data đã dồn: " + JSON.stringify(objLanguage))
    }

    const handleUnderline2 = () => {
        setUnderline2(!underline2)
    }

    const handleIntroduction2 = (value) => {
        setIntroduction2(value)

        setDataCv({
            ...DataCv,
            desGoalCV: value
        })
    }




    const [dateBirth, setDateBirth] = useState(new Date());

    const [datePickerOpen, setDatePickerOpen] = useState(false);





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



    // EXPERIENCE

    const handleAddExperience = () => {
        setDataEditWorkEx({})
        setShowModalWE(true)
    }

    const handleDataFromChild = (data) => {

        const newData = { ...data, key: keyCounter };

        setObjWorkEx(objWorkEx => [...objWorkEx, newData]);

        if (objWorkEx.length >= 1) {
            setCheckLength(true)
        }
        else {
            setCheckLength(false)
        }

        setKeyCounter(prevKeyCounter => prevKeyCounter + 1);

        // setObjWorkEx(objWorkEx => [
        //     ...objWorkEx,
        //     data

        // ]);



    }

    const handleDeleteItemWE = (index) => {
        const updatedArray = objWorkEx.filter(item => item.key !== index);
        setObjWorkEx(updatedArray);
    }


    const handleEditWE = (index) => {

        let searchIndex = {};

        for (let i = 0; i < objWorkEx.length; i++) {
            if (objWorkEx[i].key === index) {
                searchIndex = objWorkEx[i];
                break;
            }
        }
        setDataEditWorkEx(searchIndex)
        setShowModalWE(true)

        //console.log("SEARCH RESULT: " + JSON.stringify(searchIndex))
    }

    const handleUpdateWorkEx = () => {
        let newObjWE = {
            ...dataEditWorkEx,
            ...objWrk
        }
        for (var i = 0; i < objWorkEx.length; i++) {
            if (newObjWE.key === objWorkEx[i].key) {
                objWorkEx[i] = newObjWE
                setShowModalWE(false)
            }
        }
    }

    const handleWEAddData = () => {
        handleDataFromChild(objWrk)
        console.log("DATA ĐÃ TỔNG: " + JSON.stringify(objWorkEx))
        setShowModalWE(false)
    }


    // BACKGROUND EDUCATION


    const handleAddEducation = () => {
        setDataEditBE({})
        setShowModalBE(true)
    }

    const handleUpdateBE = () => {

        let newObjBE = {
            ...dataEditBE,
            ...objbBE
        }
        for (var i = 0; i < objEducation.length; i++) {
            if (newObjBE.key === objEducation[i].key) {
                objEducation[i] = newObjBE
                setShowModalBE(false)
            }
        }

    }



    const handleEditBE = (index) => {

        let searchIndex = {};

        for (let i = 0; i < objEducation.length; i++) {
            if (objEducation[i].key === index) {
                searchIndex = objEducation[i];
                break;
            }
        }
        setDataEditBE(searchIndex)
        setShowModalBE(true)

        //console.log("SEARCH RESULT: " + JSON.stringify(searchIndex))
    }

    const handleDeleteItemBE = (index) => {
        const updatedArray = objEducation.filter(item => item.key !== index);
        setObjEducation(updatedArray);
    }

    const handleDataFromChildBE = (data) => {

        const newData = { ...data, key: keyCounter2 };

        setObjEducation(objEducation => [...objEducation, newData]);

        if (objEducation.length >= 1) {
            setCheckLength(true)
        }
        else {
            setCheckLength(false)
        }
        setKeyCounter2(prevKeyCounter => prevKeyCounter + 1);

    }

    // const handleDataFromChildBE = (data) => {

    //     const { nameSchool, major, description, dateStart, dateEnd } = data;

    //     const newData = {
    //         nameSchool: nameSchool || '',
    //         major: major || '',
    //         description: description || '',
    //         dateStart: dateStart || '',
    //         dateEnd: dateEnd || '',
    //         key: keyCounter2
    //     };

    //     setObjEducation(objEducation => [...objEducation, newData]);

    //     if (objEducation.length >= 1) {
    //         setCheckLength(true);
    //     } else {
    //         setCheckLength(false);
    //     }

    //     setKeyCounter2(prevKeyCounter => prevKeyCounter + 1);
    // };


    const handleBEAddData = () => {
        handleDataFromChildBE(objbBE)
        setShowModalBE(false)
    }



    // Activities

    const handleAddActivity = () => {
        setDataEditAC({})
        setShowModalAC(true)
    }

    const handleDataFromChildAC = (data) => {

        const newData = { ...data, key: keyCounter3 };

        setObjActivity(objActivity => [...objActivity, newData]);

        if (objActivity.length >= 1) {
            setCheckLength(true)
        }
        else {
            setCheckLength(false)
        }

        setKeyCounter3(prevKeyCounter => prevKeyCounter + 1);

        // setObjWorkEx(objWorkEx => [
        //     ...objWorkEx,
        //     data

        // ]);


    }

    const handleDeleteItemAC = (index) => {
        const updatedArray = objActivity.filter(item => item.key !== index);
        setObjActivity(updatedArray);
    }


    const handleEditAC = (index) => {

        let searchIndex = {};

        for (let i = 0; i < objActivity.length; i++) {
            if (objActivity[i].key === index) {
                searchIndex = objActivity[i];
                break;
            }
        }
        setDataEditAC(searchIndex)
        setShowModalAC(true)

        //console.log("SEARCH RESULT: " + JSON.stringify(searchIndex))
    }

    const handleUpdateAC = () => {
        let newObjAC = {
            ...dataEditAC,
            ...objbAC
        }
        for (var i = 0; i < objActivity.length; i++) {
            if (newObjAC.key === objActivity[i].key) {
                objActivity[i] = newObjAC
                setShowModalAC(false)
            }
        }
    }

    const handleACAddData = () => {
        handleDataFromChildAC(objbAC)
        console.log("DATA ĐÃ TỔNG: " + JSON.stringify(objbAC))
        setShowModalAC(false)
    }


    // Language


    const handleAddLanguage = () => {
        setDataEditLA({})
        setShowModalLA(true)
    }

    const handleDataFromChildLA = (data) => {

        const newData = { ...data, key: keyCounter4 };

        setObjLanguage(objLanguage => [...objLanguage, newData]);

        if (objLanguage.length >= 1) {
            setCheckLength(true)
        }
        else {
            setCheckLength(false)
        }

        setKeyCounter4(prevKeyCounter => prevKeyCounter + 1);

        // setObjWorkEx(objWorkEx => [
        //     ...objWorkEx,
        //     data

        // ]);


    }

    const handleDeleteItemLA = (index) => {
        const updatedArray = objLanguage.filter(item => item.key !== index);
        setObjLanguage(updatedArray);
    }


    const handleEditLA = (index) => {

        let searchIndex = {};

        for (let i = 0; i < objLanguage.length; i++) {
            if (objLanguage[i].key === index) {
                searchIndex = objLanguage[i];
                break;
            }
        }
        setDataEditLA(searchIndex)
        setShowModalLA(true)

        //console.log("SEARCH RESULT: " + JSON.stringify(searchIndex))
    }

    const handleUpdateLA = () => {
        let newObjLA = {
            ...dataEditLA,
            ...objbLA
        }
        for (var i = 0; i < objLanguage.length; i++) {
            if (newObjLA.key === objLanguage[i].key) {
                objLanguage[i] = newObjLA
                setShowModalLA(false)
            }
        }
    }

    const handleLAAddData = () => {
        handleDataFromChildLA(objbLA)
        console.log("DATA ĐÃ TỔNG: " + JSON.stringify(objbLA))
        setShowModalLA(false)
    }


    // Certificate


    const handleAddCertificate = () => {
        setDataEditCer({})
        setShowModalCer(true)
    }

    const handleDataFromChildCer = (data) => {

        const newData = { ...data, key: keyCounter5 };

        setObjCertificate(objCertificate => [...objCertificate, newData]);

        if (objCertificate.length >= 1) {
            setCheckLength(true)
        }
        else {
            setCheckLength(false)
        }

        setKeyCounter5(prevKeyCounter => prevKeyCounter + 1);

        // setObjWorkEx(objWorkEx => [
        //     ...objWorkEx,
        //     data

        // ]);


    }

    const handleDeleteItemCer = (index) => {
        const updatedArray = objCertificate.filter(item => item.key !== index);
        setObjCertificate(updatedArray);
    }


    const handleEditCer = (index) => {

        let searchIndex = {};

        for (let i = 0; i < objCertificate.length; i++) {
            if (objCertificate[i].key === index) {
                searchIndex = objCertificate[i];
                break;
            }
        }
        setDataEditCer(searchIndex)
        setShowModalCer(true)

        //console.log("SEARCH RESULT: " + JSON.stringify(searchIndex))
    }

    const handleUpdateCer = () => {
        let newObjCer = {
            ...dataEditCer,
            ...objbCer
        }
        for (var i = 0; i < objCertificate.length; i++) {
            if (newObjCer.key === objCertificate[i].key) {
                objCertificate[i] = newObjCer
                setShowModalCer(false)
            }
        }
    }

    const handleCerAddData = () => {
        handleDataFromChildCer(objbCer)
        console.log("DATA ĐÃ TỔNG: " + JSON.stringify(objbCer))
        setShowModalCer(false)
    }





    // Other fuction


    const handleImagePicker = async () => {
        ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            }
        ).then(e => {
            if (!e.canceled) {
                console.log("IMage" + JSON.stringify(e.assets[0].uri))
                setImageProfile(e.assets[0].uri)

                uploadImageToFireBase(e.assets[0].uri)
            }

        }).catch(e => {
            console.error("ERROR IMAGE: " + e)
        })
    }

    const getImageFromFirebase = (pathName) => {
        return new Promise(async (resolve, reject) => {
            try {
                const imageRef = storage().ref(pathName);
                const downloadURL = await imageRef.getDownloadURL();
                resolve(downloadURL);
            } catch (error) {
                console.error('Error getting image from Firebase:', error);
                reject(error);
            }
        });
    };

    const uploadImageToFireBase = async (imagePath) => {
        const fileName = `${Date.now()}.jpg`;
        const reference = storage().ref().child(fileName);

        try {
            await reference.putFile(imagePath);

            console.log("Image uploaded successfully");

            // Get the download URL and set it in the user object
            const downloadURL = await getImageFromFirebase(fileName);
            setDataCv({
                ...DataCv,
                imageUserCV: downloadURL
            })
            console.log("DATA đã upload ảnh: " + JSON.stringify(DataCv))

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleGetName = (name) => {
        setDataCv({
            ...DataCv,
            nameUserCV: name
        })
    }





    const formattedDate = (utcDate) => {
        const date = new Date(utcDate);
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);

        return `${day}/${month}/${year}`;
    };

    const WorkExperience = ({ item }) => {
        const dayStart = formattedDate(item.dateStart)

        const dayEnd = formattedDate(item.dateEnd)

        return (
                <View style={
                    checkLength ? styles.box : styles.empty
                }>
                    <View style={styles.WeItem}>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 50
                        }}>
                            <View style={styles.itemAbove}>
                                <View style={styles.wrapitemAbove}>
                                    <Text style={styles.nameField}>Tên công ty</Text>
                                    <Text style={styles.contentField}>{item.nameCompany}</Text>
                                </View>
                            </View>

                            <View style={styles.itemAbove}>
                                <View style={styles.wrapitemAbove}>
                                    <Text style={styles.nameField}>Vị trí</Text>
                                    <Text style={styles.contentField}>{item.position}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 50,
                            marginBottom: 10
                        }}>
                            <View style={styles.itemAbove}>
                                <View style={styles.wrapitemAbove}>
                                    <Text style={styles.nameField}>Ngày bắt đầu</Text>
                                    <Text style={styles.contentField}>{item.dateStart !== undefined ? dayStart : "không có thông tin"}</Text>
                                </View>
                            </View>

                            <View style={styles.itemAbove}>
                                <View style={styles.wrapitemAbove}>
                                    <Text style={styles.nameField}>Ngày kết thúc</Text>
                                    <Text style={styles.contentField}>{item.dateEnd !== undefined ? dayEnd : "không có thông tin"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.buttonOption}>
                        <TouchableOpacity onPress={() => handleDeleteItemWE(item.key)} style={{
                            backgroundColor: "#FFC1C5",
                            padding: 10,
                            borderRadius: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60
                        }}>
                            <Icon name="close-line"></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => handleEditWE(item.key)}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "#E9E9E9",
                                padding: 10,
                                flex: 1,
                                alignItems: "center",
                                paddingLeft: 20,
                                borderRadius: 20,
                                justifyContent: "space-between"
                            }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000"
                            }} >Edit</Text>
                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    const BackgroundEducation = ({ item }) => {

        const dayStart = formattedDate(item.dateStart)

        const dayEnd = formattedDate(item.dateEnd)
        return (
            <View style={
                checkLength ? styles.box : styles.empty
            } >
                <View style={styles.WeItem}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Tên trường</Text>
                                <Text style={styles.contentField}>{item.nameSchool}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngành nghề</Text>
                                <Text style={styles.contentField}>{item.major}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngày bắt đầu</Text>
                                <Text style={styles.contentField}>{dayStart}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngày kết thúc</Text>
                                <Text style={styles.contentField}>{dayEnd}</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <View style={styles.itemAbove}>
                    <View style={styles.wrapitemAbove}>
                        <Text style={styles.nameField}>Mô tả</Text>
                        <Text style={styles.contentField}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.buttonOption}>
                    <TouchableOpacity
                        onPress={() => handleDeleteItemBE(item.key)}
                        style={{
                            backgroundColor: "#FFC1C5",
                            padding: 10,
                            borderRadius: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60
                        }}>
                        <Icon name="close-line"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleEditBE(item.key)}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#E9E9E9",
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            paddingLeft: 20,
                            borderRadius: 20,
                            justifyContent: "space-between"
                        }}>
                        <Text style={{
                            fontFamily: "RukbikNormal",
                            color: "#000"
                        }} >Edit</Text>
                        <Icon name="arrow-right-s-line"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const Activities = ({ item }) => {

        const dayStart = formattedDate(item.dateStart)

        const dayEnd = formattedDate(item.dateEnd)
        return (
            <View style={
                checkLength ? styles.box : styles.empty
            } >
                <View style={styles.WeItem}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Tổ chức</Text>
                                <Text style={styles.contentField}>{item.nameOrganize}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Vị trí</Text>
                                <Text style={styles.contentField}>{item.position}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngày bắt đầu</Text>
                                <Text style={styles.contentField}>{dayStart}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngày kết thúc</Text>
                                <Text style={styles.contentField}>{dayEnd}</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <View style={styles.itemAbove}>
                    <View style={styles.wrapitemAbove}>
                        <Text style={styles.nameField}>Mô tả</Text>
                        <Text style={styles.contentField}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.buttonOption}>
                    <TouchableOpacity
                        onPress={() => handleDeleteItemAC(item.key)}
                        style={{
                            backgroundColor: "#FFC1C5",
                            padding: 10,
                            borderRadius: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60
                        }}>
                        <Icon name="close-line"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleEditAC(item.key)}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#E9E9E9",
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            paddingLeft: 20,
                            borderRadius: 20,
                            justifyContent: "space-between"
                        }}>
                        <Text style={{
                            fontFamily: "RukbikNormal",
                            color: "#000"
                        }} >Edit</Text>
                        <Icon name="arrow-right-s-line"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const Language = ({ item }) => {

        return (
            <View style={{ gap: 16, marginTop: 10 }}>
                <View style={styles.WeItem}>

                    <View style={{
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngôn ngữ</Text>
                                <Text style={styles.contentField}>{item.language}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Độ thông thạo</Text>
                                <Text style={styles.contentField}>{item.level}</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <View style={styles.itemAbove}>
                    <View style={styles.wrapitemAbove}>
                        <Text style={styles.nameField}>Mô tả</Text>
                        <Text style={styles.contentField}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.buttonOption}>
                    <TouchableOpacity
                        onPress={() => handleDeleteItemLA(item.key)}
                        style={{
                            backgroundColor: "#FFC1C5",
                            padding: 10,
                            borderRadius: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60
                        }}>
                        <Icon name="close-line"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleEditLA(item.key)}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#E9E9E9",
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            paddingLeft: 20,
                            borderRadius: 20,
                            justifyContent: "space-between"
                        }}>
                        <Text style={{
                            fontFamily: "RukbikNormal",
                            color: "#000"
                        }} >Edit</Text>
                        <Icon name="arrow-right-s-line"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const Certification = ({ item }) => {
        const dayStart = formattedDate(item.dateStart)
        return (
            <View style={
                checkLength ? styles.box : styles.empty
            }>
                <View style={styles.WeItem}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50
                    }}>
                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Tên chứng chỉ</Text>
                                <Text style={styles.contentField}>{item.nameCer}</Text>
                            </View>
                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Ngày</Text>
                                <Text style={styles.contentField}>{dayStart}</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <View style={styles.itemAbove}>
                    <View style={styles.wrapitemAbove}>
                        <Text style={styles.nameField}>Description</Text>
                        <Text style={styles.contentField}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.buttonOption}>
                    <TouchableOpacity

                        onPress={() => handleDeleteItemCer(item.key)}
                        style={{
                            backgroundColor: "#FFC1C5",
                            padding: 10,
                            borderRadius: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60
                        }}>
                        <Icon name="close-line"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleEditCer(item.key)}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#E9E9E9",
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            paddingLeft: 20,
                            borderRadius: 20,
                            justifyContent: "space-between"
                        }}>
                        <Text style={{
                            fontFamily: "RukbikNormal",
                            color: "#000"
                        }} >Edit</Text>
                        <Icon name="arrow-right-s-line"></Icon>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }





    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.createCv}>

                    <View style={{
                        paddingTop: 10
                    }}>

                        <View style={{
                            display: "flex",
                            gap: 18,
                            marginBottom: 10
                        }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }}>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.goBack()
                                    }}>
                                        <Icon name="arrow-left-s-line" size={30}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Image style={{
                                        width: 55,
                                        height: 55,
                                        backgroundColor: '#ccc',
                                        borderRadius: 100000,

                                    }}
                                        source={{ uri: cv ? cv.file_imagge : '' }}
                                    ></Image>
                                </View>

                                <View style={{flex: 1}}>
                                    <Text style={{
                                        ...STYLE.textTitle,
                                        fontSize: 28,
                                        
                                        fontWeight: "700",
                                        color: "#000"
                                    }}>{cv ? cv.cv_title : 'Không có tiêu đề'}</Text>
                                </View>
                            </View>

                            <View style={{
                                borderWidth: 1,
                                borderColor: "#B0B0B0"
                            }}></View>

                            <View style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                display: "flex",
                                gap: 20
                            }}>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 80
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 6,
                                        flex: 1
                                    }}>
                                        <Icon name="global-line"></Icon>
                                        <View style={{
                                            display: "flex",
                                        }}>
                                            <Text style={{
                                            }}>Ngôn ngữ</Text>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 16,
                                                fontWeight: "600"
                                            }}>{cv ? cv.ngon_ngu : 'Không có ngôn ngữ nào'}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 6,
                                        flex: 1
                                    }}>
                                        <Icon name="filter-line"></Icon>
                                        <View style={{
                                            display: "flex",
                                        }}>
                                            <Text style={{
                                            }}>Loại công việc</Text>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 16,
                                                fontWeight: "600"
                                            }}>{cv ? cv.loai_cong_viec : 'Không có'}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 85
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 6
                                    }}>
                                        <Icon name="timer-2-line"></Icon>
                                        <View style={{
                                            display: "flex",
                                        }}>
                                            <Text style={{
                                            }}>Kinh nghiệm</Text>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 16,
                                                fontWeight: "600"
                                            }}>{cv ? cv.kinh_nghiem : 'không có'}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 6,
                                        flex: 1
                                    }}>
                                        <Icon name="briefcase-line"></Icon>
                                        <View style={{
                                            display: "flex",
                                        }}>
                                            <Text style={{
                                            }}>Vị trí</Text>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 16,
                                                fontWeight: "600"
                                            }}>{cv ? cv.vi_tri_hien_tai : 'không có'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                borderWidth: 1,
                                borderColor: "#B0B0B0"
                            }}></View>

                            <View style={{

                            }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Icon name="user-line" size={32}></Icon>
                                    <Text style={styles.imgeWETitle}>Thông tin cá nhân</Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    gap: 20,
                                    marginTop: 10
                                }}>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            ...styles.imgeWETitle,
                                            fontSize: 16,
                                            color: '#000',
                                            marginBottom: 4
                                        }} >Ngày sinh</Text>
                                        <Text style={{
                                            backgroundColor: '#F1F1F1',
                                            padding: 15,
                                            borderRadius: 16,
                                            color: '#000',
                                            ...styles.imgeWETitle,
                                            fontSize: 14
                                        }}>{cv ? (new Date(cv.ngaysinh)).toLocaleDateString() : 'không có'}</Text>
                                    </View>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            ...styles.imgeWETitle,
                                            fontSize: 16,
                                            color: '#000',
                                            marginBottom: 4
                                        }} >Mô tả bản thân</Text>
                                        <Text style={{
                                            backgroundColor: '#F1F1F1',
                                            padding: 15,
                                            borderRadius: 16,
                                            color: '#000',
                                            ...styles.imgeWETitle,
                                            fontSize: 14
                                        }}>{cv ? cv.introduction : 'Không có'}</Text>
                                    </View>


                                    <View style={{

                                    }}>
                                        <Text style={{
                                            ...styles.imgeWETitle,
                                            fontSize: 16,
                                            color: '#000',
                                            marginBottom: 4
                                        }} >Mục tiêu cần đạt</Text>
                                        <Text style={{
                                            backgroundColor: '#F1F1F1',
                                            padding: 15,
                                            borderRadius: 16,
                                            color: '#000',
                                            ...styles.imgeWETitle,
                                            fontSize: 14
                                        }}>{cv ? cv.goal : 'Không có'}</Text>
                                    </View>


                                </View>
                            </View>


                        </View>



                        {/* Kinh nghiệm làm việc */}

                        <View style={styles.workExperience}>
                            <View style={styles.head}>
                                <Icon name="briefcase-line"
                                    size={28}
                                ></Icon>
                                <View style={styles.headTtitle}>
                                    <Text style={styles.imgeWETitle}>Kinh nghiệm làm việc</Text>
                                </View>
                            </View>

                        </View>

                        {/* Trình độ học vấn */}

                        <View style={styles.workExperience}>
                            <View style={styles.head}>
                                <Icon name="quill-pen-line"
                                    size={28}
                                ></Icon>
                                <View style={styles.headTtitle}>
                                    <Text style={styles.imgeWETitle}>Trình độ học vấn</Text>
                                </View>
                            </View>


                        </View>

                        {/* Hoạt động */}


                        <View style={styles.workExperience}>
                            <View style={styles.head}>
                                <Icon name="community-line"
                                    size={28}
                                ></Icon>
                                <View style={styles.headTtitle}>
                                    <Text style={styles.imgeWETitle}>Hoạt động</Text>
                                </View>
                            </View>


                        </View>

                        {/* Ngoại ngữ */}


                        <View style={styles.workExperience}>
                            <View style={styles.head}>
                                <Icon name="translate-2"
                                    size={28}
                                ></Icon>
                                <View style={styles.headTtitle}>
                                    <Text style={styles.imgeWETitle}>Ngôn ngữ</Text>
                                </View>
                            </View>


                        </View>

                        {/* Chứng chỉ, bằng cấp */}

                        <View style={styles.workExperience}>
                            <View style={styles.head}>
                                <Icon name="file-mark-line"
                                    size={28}
                                ></Icon>
                                <View style={styles.headTtitle}>
                                    <Text style={styles.imgeWETitle}>Chứng chỉ</Text>
                                </View>
                            </View>


                        </View>


                    </View>

                </View>

                {/* {isVisible && <PopUpAdd style={styles.popUpAdd} sendDataToParent={handleDataFromChild} sendSignalToParent={handleWhenRecieve} dataWEedited={dataEditWorkEx} />} */}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    optionFinal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        gap: 10
    },
    imageProfile: {
        padding: 10
    },
    imgeProfileTitle: {
        marginBottom: 20,
        color: "#000",
        fontFamily: "Rubik",
        fontSize: 20
    },
    createCv: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        marginBottom: 100
    },
    personnalInfo: {
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
        marginTop: 5,



        // fontFamily: 'RukbikNormal'

    },
    itemInputBody: {
        display: "flex",
        gap: 15,
        marginTop: 18
    },
    inputTitle: {
        fontFamily: "RukbikNormal",
        color: "#000",
        fontSize: 16,
        marginBottom: 4
    },
    inputArea: {
        backgroundColor: "#E9E9E9",
        padding: 10,
        borderRadius: 16
    },
    inputMain: {

    },
    optionText: {

    },
    optionText: {
        display: "flex",
        flexDirection: "row",
        gap: 14,
        paddingLeft: 4,
        paddingTop: 10
    },
    iconEdit: {

    },
    wrapCreateCV: {
        marginBottom: 200
    },
    contentTitle: {
        fontFamily: "RukbikNormal",
        fontSize: 16,
        color: "#000"

    },
    head: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "85%",
        alignItems: "center"
    },
    imgeWETitle: {
        color: "#000",
        fontFamily: "Rubik",
        fontSize: 20
    },
    workExperience: {
        marginTop: 24
    },
    headTtitle: {
        width: "100%"
    },
    body: {
        marginTop: 20,
        width: "100%",
        borderWidth: 2,
        borderColor: "#000",
        padding: 18,
        borderColor: "#B0B0B0",
        borderRadius: 20,
        gap: 16
    },
    nameField: {
        fontFamily: "RukbikNormal",
    },
    contentField: {
        fontFamily: "RukbikNormal",
        color: "#000",
        fontSize: 16
    },
    wrapitemAbove: {
        display: "flex",
        width: "100%",
    },
    WeItem: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flexWrap: "wrap",
        gap: 10,
    },
    itemAbove: {
        flex: 1

    },
    buttonOption: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16
    },
    box: {
        borderTopWidth: 2,
        borderColor: "#B0B0B0",
        paddingTop: 10,
        marginTop: 15,
        marginBottom: 20
    },
    empty: {
        marginBottom: 10
    }
    ,
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1
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
        padding: 18,
        paddingLeft: 18,
        paddingRight: 18,
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

export default CvDetail








































