import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Animated, FlatList } from 'react-native'
import { useFonts } from "expo-font"
import { useState } from "react"
import DatePicker from "react-native-date-picker"
import Icon from "react-native-remix-icon"
import * as ImagePicker from 'expo-image-picker'
import PopUpAdd from "../src/PopUpAdd"
import Modal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';




const CreateCV = ({ route }) => {

    const dataInfoBasic = route.params.basicInFo

    console.log("data: " + JSON.stringify(dataInfoBasic))

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

    const [dateBirtht, setDateBirtht] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpent, setDatePickerOpent] = useState(false);
    const [dateBirth2, setDateBirth2] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpen2, setDatePickerOpen2] = useState(false);

    const [dateBirth3, setDateBirth3] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpen3, setDatePickerOpen3] = useState(false);
    const [dateBirth4, setDateBirth4] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpen4, setDatePickerOpen4] = useState(false);

    const [dateBirth5, setDateBirth5] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpen5, setDatePickerOpen5] = useState(false);
    const [dateBirth6, setDateBirth6] = useState(new Date(global.user.user.ngaysinh));
    const [datePickerOpen6, setDatePickerOpen6] = useState(false);

    const [dateBirth7, setDateBirth7] = useState(new Date(global.user.user.ngaysinh));
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




    const [dateBirth, setDateBirth] = useState(new Date(global.user.user.ngaysinh));

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
            console.log("IMage" + JSON.stringify(e.assets[0].uri))
            setImageProfile(e.assets[0].uri)
            setDataCv({
                imageUserCV: e.assets[0].uri
            })
        }).catch(e => {
            console.error("ERROR IMAGE: " + e)
        })
    }

    const handleGetName = (name) => {
        setDataCv({
            ...DataCv,
            nameUserCV: name
        })


    }

    const handleDoneInfoCV = () => {
        console.log("DATA CV: " + JSON.stringify(DataCv))
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
            <View>
                <View style={styles.WeItem}>

                    <View style={{
                        display: "flex",
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
        <ScrollView>
            <View style={styles.createCv}>

                <View style={styles.wrapCreateCV}>
                    <View style={styles.imageProfile}>
                        <Text style={styles.imgeProfileTitle}>Ảnh cá nhân</Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            gap: 10
                        }}>
                            <Image style={{ width: 55, height: 55, borderRadius: 16 }} source={{ uri: imageProfile ? imageProfile : "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}></Image>
                            <TouchableOpacity onPress={handleImagePicker} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#E9E9E9",
                                flex: 1,
                                borderRadius: 24,
                                flexDirection: "row",
                                gap: 10
                            }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000",
                                    fontSize: 16
                                }}>Upload Image</Text>

                                <Icon name="upload-2-fill"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.itemInputBody}>
                        <View style={styles.personnalInfo}>
                            <View style={styles.inputInfo}>
                                <Text style={styles.inputTitle} >Họ và tên</Text>
                                <TextInput onChangeText={handleGetName} style={{
                                    backgroundColor: "#E9E9E9",
                                    paddingLeft: 12,
                                    borderRadius: 12
                                }}>
                                </TextInput>
                            </View>
                        </View>



                        <View style={styles.personnalInfo}>
                            <View style={styles.inputInfo}>
                                <Text style={styles.inputTitle}>Ngày sinh</Text>
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
                                            setDataCv({
                                                ...DataCv,
                                                birthUserCV: date
                                            })
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
                        </View>


                        <View style={styles.personnalInfo}>
                            <View style={styles.inputInfo}>
                                <Text style={styles.inputTitle} >Giới thiệu bản thân</Text>
                                <View style={styles.inputArea}>
                                    <View style={styles.optionText}>
                                        <TouchableOpacity onPress={handleItalic} style={{
                                            backgroundColor: italic ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="italic" color={italic ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleBold} style={{
                                            backgroundColor: bold ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="bold" color={bold ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleUnderline} style={{
                                            backgroundColor: underline ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="underline" color={underline ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        style={{
                                            fontStyle: italic ? "normal" : "italic",
                                            fontWeight: bold ? "500" : "900",
                                            fontSize: 16,
                                            borderBottomColor: '#000',
                                            borderBottomWidth: underline ? 0 : 2,
                                            borderTopWidth: 2,
                                            marginTop: 16,
                                            marginBottom: 16,
                                            paddingTop: -10

                                        }}
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={handleIntroduction}
                                        value={introduction}

                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>


                        <View style={styles.personnalInfo}>
                            <View style={styles.inputInfo}>
                                <Text style={styles.inputTitle} >Mục tiêu nghề nghiệp</Text>
                                <View style={styles.inputArea}>
                                    <View style={styles.optionText}>
                                        <TouchableOpacity onPress={handleItalic2} style={{
                                            backgroundColor: italic2 ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="italic" color={italic2 ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleBold2} style={{
                                            backgroundColor: bold2 ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="bold" color={bold2 ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleUnderline2} style={{
                                            backgroundColor: underline2 ? "#fff" : "#000",
                                            padding: 5,
                                            borderRadius: 4
                                        }}>
                                            <Icon name="underline" color={underline2 ? "#000" : "#fff"} ></Icon>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        style={{
                                            fontStyle: italic2 ? "normal" : "italic",
                                            fontWeight: bold2 ? "500" : "900",
                                            fontSize: 16,
                                            borderBottomColor: '#000',
                                            borderBottomWidth: underline2 ? 0 : 2,
                                            borderTopWidth: 2,
                                            marginTop: 16,
                                            marginBottom: 16,
                                            paddingTop: -10

                                        }}
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={handleIntroduction2}
                                        value={introduction2}

                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>

                    </View>

                    {/* Kinh nghiệm làm việc */}
                    <Modal
                        isVisible={showModalWE}
                        onSwipeComplete={() => { setShowModalWE(false) }}
                        onBackdropPress={() => { setShowModalWE(false) }}
                        swipeDirection={'down'}
                        style={{ margin: 0 }}
                    >
                        <View style={{
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            height: "70%",
                            width: "100%",
                            paddingTop: 30,
                            display: "flex/",
                            gap: 20,
                            paddingLeft: 18,
                            paddingRight: 18,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Tên công ty</Text>
                                <TextInput
                                    placeholder={dataEditWorkEx ? dataEditWorkEx.nameCompany : ""}
                                    onChangeText={(text) => {
                                        setOjbWrk(
                                            { ...objWrk, nameCompany: text })
                                    }}
                                    style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Vị trí</Text>
                                <TextInput
                                    placeholder={dataEditWorkEx ? dataEditWorkEx.position : ""}
                                    onChangeText={(text) => {
                                        setOjbWrk({
                                            ...objWrk,
                                            position: text
                                        })
                                    }} style={styles.textInput} ></TextInput>
                            </View>

                            <View>
                                <Text style={styles.textTitle}>Ngày bắt đầu</Text>
                                <View style={styles.inputSearch}>
                                    <Text style={{ fontWeight: 'bold' }}>{dateBirtht.toLocaleDateString()}</Text>
                                    <TouchableOpacity onPress={() => { setDatePickerOpent(true) }}>
                                        <Icon name="calendar-line"></Icon>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode="date"
                                        open={datePickerOpent}
                                        date={dateBirtht}
                                        onConfirm={(date) => {
                                            setDatePickerOpent(false)
                                            setDateBirtht(date)
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
                                    onPress={() => {
                                        setShowModalWE(false)
                                    }}
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
                                    onPress={() => {



                                        if (dataEditWorkEx === undefined || Object.keys(dataEditWorkEx).length === 0) {
                                            handleWEAddData();
                                        } else {
                                            handleUpdateWorkEx();
                                        }
                                    }}
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


                    </Modal>


                    <View style={styles.workExperience}>
                        <View style={styles.head}>
                            <Icon name="briefcase-line"
                                size={28}
                            ></Icon>
                            <View style={styles.headTtitle}>
                                <Text style={styles.imgeWETitle}>Kinh nghiệm làm việc</Text>
                                <Text style={styles.contentTitle}>
                                    If you have no work experience,
                                    you can also add your personal projects or your part-time jobs here.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View style={styles.workExperienceWrap}>
                                <View>
                                    <FlatList
                                        data={objWorkEx}
                                        renderItem={({ item }) => <WorkExperience item={item} />}
                                        keyExtractor={(item) => item.key.toString()}
                                    />
                                </View>

                                <TouchableOpacity onPress={handleAddExperience} style={{
                                    backgroundColor: "#E2F367",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    borderRadius: 20,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                    <Text style={{
                                        fontFamily: "RukbikNormal",
                                        color: "#000"
                                    }}>Add Experience</Text>

                                    <Icon name="arrow-right-s-line"></Icon>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </View>

                    {/* Trình độ học vấn */}


                    <Modal
                        isVisible={showModalBE}
                        onSwipeComplete={() => { setShowModalBE(false) }}
                        onBackdropPress={() => { setShowModalBE(false) }}
                        swipeDirection={'down'}
                        style={{ margin: 0 }}
                    >
                        <ScrollView style={{
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            paddingTop: 30,
                            display: "flex/",
                            gap: 20,
                            paddingLeft: 18,
                            paddingRight: 18,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Tên trường</Text>
                                <TextInput
                                    placeholder={dataEditBE ? dataEditBE.nameSchool : ""}
                                    onChangeText={(text) => {
                                        setOjbBE(
                                            { ...objbBE, nameSchool: text })
                                    }}
                                    style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Ngành học</Text>
                                <TextInput
                                    placeholder={dataEditBE ? dataEditBE.major : ""}
                                    onChangeText={(text) => {
                                        setOjbBE({
                                            ...objbBE,
                                            major: text
                                        })
                                    }} style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Mô tả</Text>
                                <TextInput
                                    placeholder={dataEditBE ? dataEditBE.description : ""}
                                    onChangeText={(text) => {
                                        setOjbBE({
                                            ...objbBE,
                                            description: text
                                        })
                                    }} style={{
                                        fontFamily: "RukbikNormal",
                                        borderWidth: 2,
                                        borderColor: "#B0B0B0",
                                        marginTop: 4,
                                        borderRadius: 16,
                                        marginBottom: 2,
                                        paddingBottom: 60,
                                        paddingLeft: 16

                                    }} ></TextInput>
                            </View>



                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10
                            }}>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={styles.textTitle}>Ngày bắt đầu</Text>
                                    <View style={styles.inputSearch}>
                                        <Text style={{ fontWeight: 'bold' }}>{dateBirth3.toLocaleDateString()}</Text>
                                        <TouchableOpacity onPress={() => { setDatePickerOpen3(true) }}>
                                            <Icon name="calendar-line"></Icon>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={datePickerOpen3}
                                            date={dateBirth3}
                                            onConfirm={(date) => {
                                                setDatePickerOpen3(false)
                                                setDateBirth3(date)
                                                setOjbBE({
                                                    ...objbBE,
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
                                                () => { setDatePickerOpen3(false) }
                                            }
                                        />
                                    </View>
                                </View>




                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={styles.textTitle}>Ngày tốt nghiệp</Text>
                                    <View style={styles.inputSearch}>
                                        <Text style={{ fontWeight: 'bold' }}>{dateBirth4.toLocaleDateString()}</Text>
                                        <TouchableOpacity onPress={() => { setDatePickerOpen4(true) }}>
                                            <Icon name="calendar-line"></Icon>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={datePickerOpen4}
                                            date={dateBirth4}
                                            onConfirm={(date) => {
                                                setDatePickerOpen4(false)
                                                setDateBirth4(date)
                                                setOjbBE({
                                                    ...objbBE,
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
                                                () => { setDatePickerOpen4(false) }
                                            }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.buttonOption}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalBE(false)
                                    }}
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
                                    onPress={() => {

                                        if (dataEditBE === undefined || Object.keys(dataEditBE).length === 0) {
                                            handleBEAddData();
                                        } else {
                                            handleUpdateBE();
                                        }
                                    }}
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


                        </ScrollView>


                    </Modal>

                    <View style={styles.workExperience}>
                        <View style={styles.head}>
                            <Icon name="quill-pen-line"
                                size={28}
                            ></Icon>
                            <View style={styles.headTtitle}>
                                <Text style={styles.imgeWETitle}>Trình độ học vấn</Text>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View>
                                <View>
                                    <FlatList
                                        data={objEducation}
                                        renderItem={({ item }) => <BackgroundEducation item={item} />}
                                        keyExtractor={(item) => item.key.toString()}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity onPress={handleAddEducation} style={{
                                backgroundColor: "#E2F367",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                borderRadius: 20,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000"
                                }}>Add Education</Text>

                                <Icon name="arrow-right-s-line"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Hoạt động */}

                    <Modal
                        isVisible={showModalAC}
                        onSwipeComplete={() => { setShowModalAC(false) }}
                        onBackdropPress={() => { setShowModalAC(false) }}
                        swipeDirection={'down'}
                        style={{ margin: 0 }}
                    >
                        <ScrollView style={{
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            paddingTop: 30,
                            display: "flex/",
                            gap: 20,
                            paddingLeft: 18,
                            paddingRight: 18,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Tên tổ chức</Text>
                                <TextInput
                                    placeholder={dataEditAC ? dataEditAC.nameOrganize : ""}
                                    onChangeText={(text) => {
                                        setOjbAC(
                                            { ...objbAC, nameOrganize: text })
                                    }}
                                    style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Vị trí</Text>
                                <TextInput
                                    placeholder={dataEditAC ? dataEditAC.postition : ""}
                                    onChangeText={(text) => {
                                        setOjbAC({
                                            ...objbAC,
                                            position: text
                                        })
                                    }} style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Mô tả</Text>
                                <TextInput
                                    placeholder={dataEditAC ? dataEditAC.description : ""}
                                    onChangeText={(text) => {
                                        setOjbAC({
                                            ...objbAC,
                                            description: text
                                        })
                                    }} style={{
                                        fontFamily: "RukbikNormal",
                                        borderWidth: 2,
                                        borderColor: "#B0B0B0",
                                        marginTop: 4,
                                        borderRadius: 16,
                                        marginBottom: 2,
                                        paddingBottom: 60,
                                        paddingLeft: 16
                                    }} ></TextInput>
                            </View>



                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10
                            }}>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={styles.textTitle}>Ngày bắt đầu</Text>
                                    <View style={styles.inputSearch}>
                                        <Text style={{ fontWeight: 'bold' }}>{dateBirth5.toLocaleDateString()}</Text>
                                        <TouchableOpacity onPress={() => { setDatePickerOpen5(true) }}>
                                            <Icon name="calendar-line"></Icon>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={datePickerOpen5}
                                            date={dateBirth5}
                                            onConfirm={(date) => {
                                                setDatePickerOpen5(false)
                                                setDateBirth5(date)
                                                setOjbAC({
                                                    ...objbAC,
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
                                                () => { setDatePickerOpen5(false) }
                                            }
                                        />
                                    </View>
                                </View>




                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={styles.textTitle}>Ngày kết thúc</Text>
                                    <View style={styles.inputSearch}>
                                        <Text style={{ fontWeight: 'bold' }}>{dateBirth6.toLocaleDateString()}</Text>
                                        <TouchableOpacity onPress={() => { setDatePickerOpen6(true) }}>
                                            <Icon name="calendar-line"></Icon>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={datePickerOpen6}
                                            date={dateBirth6}
                                            onConfirm={(date) => {
                                                setDatePickerOpen6(false)
                                                setDateBirth6(date)
                                                setOjbAC({
                                                    ...objbAC,
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
                                                () => { setDatePickerOpen6(false) }
                                            }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.buttonOption}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalAC(false)
                                    }}
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
                                    onPress={() => {

                                        if (dataEditAC === undefined || Object.keys(dataEditAC).length === 0) {
                                            handleACAddData();
                                        } else {
                                            handleUpdateAC();
                                        }
                                    }}
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


                        </ScrollView>


                    </Modal>


                    <View style={styles.workExperience}>
                        <View style={styles.head}>
                            <Icon name="community-line"
                                size={28}
                            ></Icon>
                            <View style={styles.headTtitle}>
                                <Text style={styles.imgeWETitle}>Hoạt động</Text>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View>
                                <View>
                                    <FlatList
                                        data={objActivity}
                                        renderItem={({ item }) => <Activities item={item} />}
                                        keyExtractor={(item) => item.key.toString()}
                                    />
                                </View>
                            </View>


                            <TouchableOpacity
                                onPress={handleAddActivity}
                                style={{
                                    backgroundColor: "#E2F367",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    borderRadius: 20,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000"
                                }}>Add Acitivity</Text>

                                <Icon name="arrow-right-s-line"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Ngoại ngữ */}

                    <Modal
                        isVisible={showModalLA}
                        onSwipeComplete={() => { setShowModalLA(false) }}
                        onBackdropPress={() => { setShowModalLA(false) }}
                        swipeDirection={'down'}
                        style={{ margin: 0 }}
                    >
                        <ScrollView style={{
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            paddingTop: 30,
                            display: "flex/",
                            gap: 20,
                            paddingLeft: 18,
                            paddingRight: 18,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Ngôn ngữ</Text>
                                <TextInput
                                    placeholder={dataEditLA ? dataEditLA.language : ""}
                                    onChangeText={(text) => {
                                        setOjbLA(
                                            { ...objbLA, language: text })
                                    }}
                                    style={styles.textInput} ></TextInput>
                            </View>

                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Trình độ</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#E2F367", borderRadius: 16, justifyContent: "space-between", borderWidth: 2, borderColor: "#000", width: "100%", marginTop: 6 }}>
                                    <Picker
                                        selectedValue={levelLA}
                                        style={{ height: 50, width: 240 }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setLevelLA(itemValue);
                                            setOjbLA({ ...objbLA, level: itemValue });
                                        }}
                                    >
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Bình thường" value="Bình thường" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Lưu loát" value="Lưu loát" />
                                        <Picker.Item style={{
                                            fontSize: 16,
                                            fontWeight: "800"
                                        }} label="Bản Xứ" value="Bản xứ" />
                                    </Picker>
                                </View>
                            </View>



                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Mô tả</Text>
                                <TextInput
                                    placeholder={dataEditLA ? dataEditLA.description : ""}
                                    onChangeText={(text) => {
                                        setOjbLA({
                                            ...objbLA,
                                            description: text
                                        })
                                    }} style={{
                                        fontFamily: "RukbikNormal",
                                        borderWidth: 2,
                                        borderColor: "#B0B0B0",
                                        marginTop: 4,
                                        borderRadius: 16,
                                        marginBottom: 2,
                                        paddingBottom: 60,
                                        paddingLeft: 16
                                    }} ></TextInput>
                            </View>


                            <View style={styles.buttonOption}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalLA(false)
                                    }}
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
                                    onPress={() => {

                                        if (dataEditLA === undefined || Object.keys(dataEditLA).length === 0) {
                                            handleLAAddData();
                                        } else {
                                            handleUpdateLA();
                                        }
                                    }}
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


                        </ScrollView>


                    </Modal>


                    <View style={styles.workExperience}>
                        <View style={styles.head}>
                            <Icon name="translate-2"
                                size={28}
                            ></Icon>
                            <View style={styles.headTtitle}>
                                <Text style={styles.imgeWETitle}>Ngôn ngữ</Text>
                            </View>
                        </View>

                        <View style={styles.body}>
                            <View>
                                <FlatList
                                    data={objLanguage}
                                    renderItem={({ item }) => <Language item={item} />}
                                    keyExtractor={(item) => item.key.toString()}
                                />
                            </View>


                            <TouchableOpacity
                                onPress={handleAddLanguage}
                                style={{
                                    backgroundColor: "#E2F367",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    borderRadius: 20,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000"
                                }}>Add Language</Text>

                                <Icon name="arrow-right-s-line"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chứng chỉ, bằng cấp */}

                    <Modal
                        isVisible={showModalCer}
                        onSwipeComplete={() => { setShowModalCer(false) }}
                        onBackdropPress={() => { setShowModalCer(false) }}
                        swipeDirection={'down'}
                        style={{ margin: 0 }}
                    >
                        <ScrollView style={{
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            paddingTop: 30,
                            display: "flex/",
                            gap: 20,
                            paddingLeft: 18,
                            paddingRight: 18,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Tên chứng chỉ</Text>
                                <TextInput
                                    placeholder={dataEditCer ? dataEditCer.nameCer : ""}
                                    onChangeText={(text) => {
                                        setOjbCer(
                                            { ...objbCer, nameCer: text })
                                    }}
                                    style={styles.textInput} ></TextInput>
                            </View>



                            <View style={styles.itemAdd}>
                                <Text style={styles.textTitle}>Mô tả</Text>
                                <TextInput
                                    placeholder={dataEditCer ? dataEditCer.description : ""}
                                    onChangeText={(text) => {
                                        setOjbCer({
                                            ...objbCer,
                                            description: text
                                        })
                                    }} style={{
                                        fontFamily: "RukbikNormal",
                                        borderWidth: 2,
                                        borderColor: "#B0B0B0",
                                        marginTop: 4,
                                        borderRadius: 16,
                                        marginBottom: 2,
                                        paddingBottom: 60,
                                        paddingLeft: 16
                                    }} ></TextInput>
                            </View>



                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10
                            }}>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={styles.textTitle}>Ngày cấp</Text>
                                    <View style={styles.inputSearch}>
                                        <Text style={{ fontWeight: 'bold' }}>{dateBirth7.toLocaleDateString()}</Text>
                                        <TouchableOpacity onPress={() => { setDatePickerOpen7(true) }}>
                                            <Icon name="calendar-line"></Icon>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={datePickerOpen7}
                                            date={dateBirth7}
                                            onConfirm={(date) => {
                                                setDatePickerOpen7(false)
                                                setDateBirth7(date)
                                                setOjbCer({
                                                    ...objbCer,
                                                    dateStart: date
                                                })
                                            }}
                                            onCancel={
                                                () => { setDatePickerOpen7(false) }
                                            }
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={styles.buttonOption}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalCer(false)
                                    }}
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
                                    onPress={() => {

                                        if (dataEditCer === undefined || Object.keys(dataEditCer).length === 0) {
                                            handleCerAddData();
                                        } else {
                                            handleUpdateCer();
                                        }
                                    }}
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


                        </ScrollView>


                    </Modal>


                    <View style={styles.workExperience}>
                        <View style={styles.head}>
                            <Icon name="file-mark-line"
                                size={28}
                            ></Icon>
                            <View style={styles.headTtitle}>
                                <Text style={styles.imgeWETitle}>Chứng chỉ</Text>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View>
                                <FlatList
                                    data={objCertificate}
                                    renderItem={({ item }) => <Certification item={item} />}
                                    keyExtractor={(item) => item.key.toString()}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleAddCertificate}
                                style={{
                                    backgroundColor: "#E2F367",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    borderRadius: 20,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>
                                <Text style={{
                                    fontFamily: "RukbikNormal",
                                    color: "#000"
                                }}>Add Experience</Text>

                                <Icon name="arrow-right-s-line"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>




                    {/*  đặt component đã comment ở đây */}

                    <View style={styles.optionFinal}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#E9E9E9",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "48%",
                                borderRadius: 30,

                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 10,
                                paddingBottom: 10


                            }}
                        >
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                fontSize: 20
                            }}>Cancel</Text>
                            <Icon name="close-line"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={handleDoneInfoCV}
                            style={{
                                backgroundColor: "#E2F367",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "48%",
                                borderRadius: 30,

                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 10,
                                paddingBottom: 10


                            }}
                        >
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                fontSize: 20
                            }}>Next</Text>
                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            {/* {isVisible && <PopUpAdd style={styles.popUpAdd} sendDataToParent={handleDataFromChild} sendSignalToParent={handleWhenRecieve} dataWEedited={dataEditWorkEx} />} */}

        </ScrollView>
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
        gap: 16,
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

export default CreateCV

{/* <View style={styles.workExperience}>
                    <View style={styles.head}>
                        <Icon name="quill-pen-line"
                            size={28}
                        ></Icon>
                        <View style={styles.headTtitle}>
                            <Text style={styles.imgeWETitle}> Trình độ học vấn</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.WeItem}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 50
                            }}>
                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Tên trường</Text>
                                        <Text style={styles.contentField}>ABC</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Ngành nghề</Text>
                                        <Text style={styles.contentField}>Senior</Text>
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
                                        <Text style={styles.contentField}>12/3/2019</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Ngày kết thúc</Text>
                                        <Text style={styles.contentField}>12/3/2023</Text>
                                    </View>
                                </View>
                            </View>


                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Mô tả</Text>
                                <Text style={styles.contentField}>Lorem ipsum dolor sit amet consectetur hello hi hi aaa shi ba.</Text>
                            </View>
                        </View>

                        <View style={styles.buttonOption}>
                            <TouchableOpacity style={{
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
                            <TouchableOpacity style={{
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

                        <TouchableOpacity style={{
                            backgroundColor: "#E2F367",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000"
                            }}>Add Experience</Text>

                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.workExperience}>
                    <View style={styles.head}>
                        <Icon name="community-line"
                            size={28}
                        ></Icon>
                        <View style={styles.headTtitle}>
                            <Text style={styles.imgeWETitle}>Hoạt động</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.WeItem}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 50
                            }}>
                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Tổ chức</Text>
                                        <Text style={styles.contentField}>WHO</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Vị trí</Text>
                                        <Text style={styles.contentField}>Senior</Text>
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
                                        <Text style={styles.contentField}>12/3/2019</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Tình trạng</Text>
                                        <Text style={styles.contentField}>Đang làm việc</Text>
                                    </View>
                                </View>
                            </View>


                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Mô tả</Text>
                                <Text style={styles.contentField}>Lorem ipsum dolor sit amet consectetur hello hi hi aaa shi ba.</Text>
                            </View>
                        </View>

                        <View style={styles.buttonOption}>
                            <TouchableOpacity style={{
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
                            <TouchableOpacity style={{
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

                        <TouchableOpacity style={{
                            backgroundColor: "#E2F367",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000"
                            }}>Add Experience</Text>

                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.workExperience}>
                    <View style={styles.head}>
                        <Icon name="translate-2"
                            size={28}
                        ></Icon>
                        <View style={styles.headTtitle}>
                            <Text style={styles.imgeWETitle}>Ngôn ngữ</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.WeItem}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 50
                            }}>
                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Ngôn ngữ</Text>
                                        <Text style={styles.contentField}>English</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Độ thông thạo</Text>
                                        <Text style={styles.contentField}>Tốt</Text>
                                    </View>
                                </View>
                            </View>




                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Mô tả</Text>
                                <Text style={styles.contentField}>Lorem ipsum dolor sit amet consectetur hello hi hi aaa shi ba.</Text>
                            </View>
                        </View>

                        <View style={styles.buttonOption}>
                            <TouchableOpacity style={{
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
                            <TouchableOpacity style={{
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

                        <TouchableOpacity style={{
                            backgroundColor: "#E2F367",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000"
                            }}>Add Experience</Text>

                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.workExperience}>
                    <View style={styles.head}>
                        <Icon name="file-mark-line"
                            size={28}
                        ></Icon>
                        <View style={styles.headTtitle}>
                            <Text style={styles.imgeWETitle}>Chứng chỉ</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.WeItem}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 50
                            }}>
                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Tên chứng chir</Text>
                                        <Text style={styles.contentField}>IELTS</Text>
                                    </View>
                                </View>

                                <View style={styles.itemAbove}>
                                    <View style={styles.wrapitemAbove}>
                                        <Text style={styles.nameField}>Ngày</Text>
                                        <Text style={styles.contentField}>01/12/2023</Text>
                                    </View>
                                </View>
                            </View>




                        </View>

                        <View style={styles.itemAbove}>
                            <View style={styles.wrapitemAbove}>
                                <Text style={styles.nameField}>Description</Text>
                                <Text style={styles.contentField}>Lorem ipsum dolor sit amet consectetur hello hi hi aaa shi ba.</Text>
                            </View>
                        </View>

                        <View style={styles.buttonOption}>
                            <TouchableOpacity style={{
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
                            <TouchableOpacity style={{
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

                        <TouchableOpacity style={{
                            backgroundColor: "#E2F367",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontFamily: "RukbikNormal",
                                color: "#000"
                            }}>Add Experience</Text>

                            <Icon name="arrow-right-s-line"></Icon>
                        </TouchableOpacity>
                    </View>
                </View> */}






































