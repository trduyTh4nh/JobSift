// import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
//import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import CardJob from "../Job/CardJob";
import NearbyJob from "../Job/NearbyJob";
import JobDetail from "../Job/JobDetail";
import DatePicker from "react-native-date-picker"
import axios from "axios";
import { API_URL } from "../constants/etc";
import * as ImagePicker from 'expo-image-picker'
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import PickerModal from "./PickerModal";

const EditProfile = ({ navigation }) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dateBirth, setDateBirth] = useState(new Date(global.user.user.ngaysinh)); // Initialize with a default date
    const [urlDowloaded, setUrlDownloaded] = useState('')
    const [visible, setVisible] = useState(false)
    const [gender, setGender] = useState('Male');
    const [user, setUser] = useState(global.user.user);

    const [image, setImage] = useState('');




    const handleEditProfile = () => {
        setIsLoading(true);

        axios.post(API_URL + '/updateUser', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((e) => {
                //console.log(e);
                global.user.user = user;
                console.log(image)
                if (image != global.user.user.profile_picture) {
                    uploadImageToFireBase(image)
                }
                navigation.goBack()
            })
            .catch((e) => {
                setIsLoading(false);
                Alert.alert('Error saving user data: ' + e);
            });
    };



    useEffect(() => {
        console.log(global.user.user)
        setImage(user.profile_picture)
    }, [])


    const handleEditImage = async () => {
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
                setImage(e.assets[0].uri)
            }
        }
        ).catch(e => {
            console.error("ERROR IMAGE: " + e)
        })



    }

    const uploadImageToFireBase = async (imagePath) => {
        const fileName = `${Date.now()}.jpg`;
        const reference = storage().ref().child(fileName);

        try {
            await reference.putFile(imagePath);

            console.log("Image uploaded successfully");

            // Get the download URL and set it in the user object
            const downloadURL = await getImageFromFirebase(fileName);
            global.user.user = {
                ...user,
                profile_picture: downloadURL
            }
            const FormData = {
                id_user: user.id_user,
                image_picture: downloadURL
            }
            console.log("Form data: " + JSON.stringify(FormData))

            updateAvatarUser(FormData)

            // setUser((prevUser) => ({
            //     ...prevUser,
            //     profile_picture: downloadURL,
            // }));




        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const updateAvatarUser = (formData) => {
        axios.post(`${API_URL}/updateAvatarUser`, formData, {
            headers: {
                'Content-Type': 'application/json', // Use 'multipart/form-data' for file uploads
            },
        })
            .then((response) => {
                console.log("Update Success:", response.data);
                navigation.goBack();
            })
            .catch((error) => {
                console.error("Update Error:", error);
            });
    };


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
    return (
        <ScrollView style={{ paddingBottom: 200 }}>
            <PickerModal isVisible={visible} hideModal={() => { setVisible(false) }} onItemSelected={(e) => { setUser({ ...user, gioitinh: e }) }} items={['Nam', 'Nữ']} title={'Hãy chọn 1 giới tính'} />
            <View style={styles.wrap}>
                <View style={styles.container}>
                    <View style={{ gap: 25, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleEditImage}>
                            <Image source={{ uri: image ? image : 'https://images-ext-2.discordapp.net/external/J0CmYBrUaclT-rSO1X80iEkJ-Sp39yEPnqdiokPwfaU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/515061888258670602/9e4b204e2b74d3264f42fbb933b1e18b.png?width=512&height=512' }}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.chucuaslart}>Họ tên</Text>
                            <View style={styles.inputSearch}>

                                <TextInput
                                    defaultValue={user.full_name}
                                    editable={true}
                                    style={styles.input}
                                    placeholder="0908290382"
                                    placeholderTextColor="rgba(0,0,0,0.15)"
                                    fontWeight="700"
                                    onChangeText={(e) => {
                                        setUser({
                                            ...user,
                                            full_name: e
                                        })
                                    }}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{ gap: 10 }}>
                        <View>
                            <Text style={styles.chucuaslart}>Ngày sinh</Text>
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
                                        setUser({
                                            ...user,
                                            ngaysinh: date
                                        })
                                    }}
                                    onCancel={
                                        () => { setDatePickerOpen(false) }
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.chucuaslart}>Giới tính</Text>
                            <TouchableOpacity onPress={() => { setVisible(true) }} style={styles.inputSearch}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>{user.gioitinh}</Text>
                                <Icon name="arrow-down-s-line"></Icon>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.chucuaslart}>Số điện thoại</Text>
                            <View style={styles.inputSearch}>
                                <TextInput

                                    defaultValue={user.phone}
                                    editable={true}
                                    style={styles.input}
                                    placeholder="0908290382"
                                    placeholderTextColor="rgba(0,0,0,0.15)"
                                    fontWeight="700"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.chucuaslart}>Email</Text>
                            <View style={styles.inputSearch}>
                                <TextInput
                                    defaultValue={user.email}
                                    style={styles.input}
                                    placeholder="email@example.com"
                                    placeholderTextColor="rgba(0,0,0,0.15)"
                                    fontWeight="700"
                                >
                                </TextInput>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.chucuaslart}>Địa chỉ</Text>
                            <View style={styles.inputSearch}>
                                <TextInput
                                    defaultValue={user.diachi}
                                    //placeholder="Quận 3"
                                    placeholderTextColor="rgba(0,0,0,0.15)"
                                    fontWeight="700"
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleEditProfile} style={styles.searchBtn}>
                            {
                                isLoading ? (<ActivityIndicator />) : (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <Icon name="check-line" size={27} color="#000"></Icon>
                                        <Text style={styles.chucuaslart1}>Lưu</Text>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrap: {
        paddingTop: 24,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 100,
        backgroundColor: 'white',
    },
    input: {
        flex: 1
    },
    container: {
        container: {

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            gap: 10
            // fontFamily: 'Raleway-Bold'
        },

        text: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginTop: 30,
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
        },

    },
    userName: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000'
        // fontFamily: 'Rubik',

    },
    Xuongdong: {
        display: 'flex',
        flexDirection: 'column',
    },

    wrap_welcome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
    },

    sayhi: {
        fontSize: 18,
        color: '#000'
        // fontFamily: 'RukbikNormal',
    },
    wrapSearch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: "center",
        marginTop: 16
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
    searchBtn: {


        backgroundColor: '#E2F367',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        elevation: 4,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },


    chucuaslart: {
        fontSize: 16,
        // fontWeight:'900',
        color: '#626262',
        marginTop: 0,
        fontFamily: 'Rubik'
    },
    chucuaslart1: {
        fontSize: 16,
        // fontWeight:'900',
        color: '#000',

    },


}
)

export default EditProfile