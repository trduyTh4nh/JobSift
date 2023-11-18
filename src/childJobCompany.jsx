import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ToastAndroid, SafeAreaView, Alert } from "react-native";
import { create } from "react-test-renderer";
import { isLoading, useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../ipConfig"
import Carousel from 'react-native-snap-carousel';
import STYLE from '../assets/css/universal'
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";

// import { ActivityIndicator } from "react-native";


const imageGirdData = [
    { id: "1", source: require('../assets/logo_gg.png') },
    { id: "2", source: require('../assets/logo_gg.png') },
    { id: "3", source: require('../assets/logo_gg.png') },
    { id: "4", source: require('../assets/logo_gg.png') },
    { id: "5", source: require('../assets/logo_gg.png') },
    { id: "6", source: require('../assets/logo_gg.png') },
]



const ImageGird = () => {
    const renderItem = ({ item }) => {
        return (  // Add this 'return' statement
            <View style={styles.girdItem}>
                <Image source={item.source} style={styles.image} />
            </View>
        );
    }



    return (
        <FlatList
            data={imageGirdData}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={renderItem}
        />
    );
}
const data = [
    'https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg',
    'https://img.timviec.com.vn/2020/10/cong-ty-google-2.jpg',
    'https://vcdn-sohoa.vnecdn.net/2022/09/19/-8050-1663572757.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUsALr1TMK7r_jxv05AGklZCkQxa7by1AAw&usqp=CAU',
    'https://cms.dailysocial.id/wp-content/uploads/2014/12/shutterstock_192086165.jpg'
];


const MyCarousel = ({ data }) => {
    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <Image source={{ uri: item }} style={{ width: 300, height: 250, borderRadius: 16 }} />
            </View>
        );
    };

    return (
        <Carousel
            data={data}
            renderItem={_renderItem}
            sliderWidth={350}
            itemWidth={300}
        />
    );
};


const ChildCompany = ({ route }) => {

    const showToast = (title) => {
        ToastAndroid.show(title, ToastAndroid.SHORT)
    }

    const user = global.user.user

    const { postData, dataDN } = route.params;

    const idNTD = {
        id_ntd: postData.id_ntd,
        id_post: postData.id_post
    }

    const [iconButton, setIconButton] = useState(false)

    const [infoNTD, setInfoNTD] = useState({})

    // const data = {
    //     id_user: user.id_user,
    //     id_dn: infoNTD.info.id_dn
    // }


    const changeInboxPage = () => {
        console.log("chuyển sang trang tin nhắn")
    }

    const [isShow, setShow] = useState(false)


    const handleUnFollow = () => {
        createTwoButtonAlert()
    }

    const createTwoButtonAlert = () => {


        const data = {
            id_user: user.id_user,
            id_dn: infoNTD.info ? infoNTD.info.id_dn : null
        }

        Alert.alert('Unfollow?', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    axios.post(`http://${API_URL}:3001/unfollow`, data, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((respone) => {
                            setStatusChange(false)
                            setStatus(true)
                            showToast("Successfully!")
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            },
        ]);
    }

    const handleFollow = () => {
        const data = {
            id_user: user.id_user,
            id_dn: infoNTD.info ? infoNTD.info.id_dn : null
        }
        axios.post(`http://${API_URL}:3001/follow`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setIconButton(true)
                setStatusChange(true)
                showToast("Follow Successfully!")
            })
            .catch((error) => {
                console.error(error)
            })

        console.log("Data: " + JSON.stringify(data))
    }

    const [statusChange, setStatusChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [status, setStatus] = useState(false)

    const focus = useIsFocused()

    useEffect(() => {

        const data = {
            id_user: user.id_user,
            id_dn: infoNTD.info ? infoNTD.info.id_dn : null,
        }

        axios.post(`http://${API_URL}:3001/checkfollow`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {

            setIsLoading(true)
            setStatusChange(respone.data.checked)
            setIconButton(respone.data.checked)
        }).catch((error) => {
            console.error(error)
        })
    }, [focus, status])


    // bug ngay đây m chưa hiểu rõ useEffect
    useEffect(() => {
        axios.post(`http://${API_URL}:3001/getinfontd`, idNTD, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const data = response.data;
                setInfoNTD({
                    info: data.ntd,
                    numberPost: data.numberpost,
                    dataUserOfNtd: data.user_ntd
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (

        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>

                <View style={styles.main}>
                    <View style={styles.companyHeader}>

                        <View style={styles.companyHeaderText}>
                            <Image style={{ width: 45, height: 45 }} source={{uri: infoNTD.info ? infoNTD.info.logo_dn: "https://assets.materialup.com/uploads/01d7570f-01ca-4e3a-8dc1-b8a16864f916/preview.jpg"}}></Image>
                            <View style={{flex: 1}}>
                                <Text style={styles.companyName}>{infoNTD.info ? infoNTD.info.name_dn : ''}</Text>
                                <Text style={styles.companyDes}>Doanh nghiệp</Text>
                            </View>
                        </View>
                        <View style={styles.wrapButton}>

                            <TouchableOpacity style={styles.buttonApplyJob} onPress={statusChange === true ? changeInboxPage : handleFollow} >
                                {isLoading || iconButton ? <Icon name={iconButton && statusChange ? "messenger-line" : "heart-line"} size={28}  ></Icon> : <ActivityIndicator></ActivityIndicator>}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setShow(true) }}>
                                <Icon name="more-fill"></Icon>
                            </TouchableOpacity>
                        </View>

                        <Modal isVisible={isShow}
                            swipeDirection={'down'}
                            onSwipeComplete={() => { setShow(false) }}
                            onBackdropPress={() => { setShow(false) }}
                            style={{ margin: 0 }}>
                            <SafeAreaView style={STYLE.modal}>
                                <View style={STYLE.modalChild}>
                                    <View style={styles.wrapTextOption}>
                                        <Text style={{
                                            ...STYLE.textTitle
                                        }}>Options</Text>
                                    </View>

                                    <TouchableOpacity style={styles.itemModel} onPress={handleUnFollow}>
                                        <Icon name="dislike-line" size={26}></Icon>
                                        <Text style={{
                                            ...STYLE.textTitle,
                                            fontSize: 15,
                                            color: "#393939"
                                        }}>Unfollow</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.itemModel} onPress={() => setShow(false)}>
                                        <Icon name="close-line" size={26}></Icon>
                                        <Text style={{
                                            ...STYLE.textTitle,
                                            fontSize: 15,
                                            color: "#393939"
                                        }}>Cancel</Text>
                                    </TouchableOpacity>


                                </View>
                            </SafeAreaView>
                        </Modal>


                    </View>

                    <View style={styles.companyBody}>
                        <Image source={require('../assets/banner.png')} style={{
                            marginTop: -20,

                        }}></Image>

                        <View style={styles.companyBodyInfo}>
                            <Text style={styles.companyBodyInfoTitile}>Enterprise Description</Text>
                            <Text style={styles.companyBodyInfoContent}>
                                {infoNTD.info ? infoNTD.info.description : 'No description'}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.wrapInFoCpn}>
                        <View style={{
                            borderWidth: 2,
                            borderColor: "#B0B0B0",
                            display: "flex",
                            marginTop: 28,
                            padding: 28,
                            borderRadius: 18,
                            width: "90%"
                        }} >

                            <View style={styles.title}>
                                <Text style={styles.textTitle}>Enterprise Summary</Text>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="briefcase-4-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Category</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.info ? infoNTD.info.category : ''}</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="map-pin-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Headquarters</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.info ? infoNTD.info.address : ''}</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="user-2-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Open Position</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.numberPost ? infoNTD.numberPost.count : ''}</Text>
                                </View>
                            </View>


                        </View>
                    </View>

                    <View style={styles.wrapInFoCpn}>
                        <View style={{
                            borderWidth: 2,
                            borderColor: "#B0B0B0",
                            display: "flex",
                            marginTop: 28,
                            padding: 28,
                            borderRadius: 18,
                            width: "90%"
                        }}>

                            <View style={styles.title}>
                                <Text style={styles.textTitle}>Contacts</Text>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="mail-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Email</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.info ? infoNTD.info.email_dn : ''}</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="map-pin-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Phone</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.info ? infoNTD.info.phone_dn : ''}</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="user-2-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Person in charge</Text>
                                    <Text style={styles.jobCateDetailContent}>{infoNTD.dataUserOfNtd ? infoNTD.dataUserOfNtd.full_name : 'no name'}</Text>
                                </View>
                            </View>


                            <View styles={{ display: "flex", flexDirection: "row" }}>


                                <View style={styles.iconContainer}>

                                    <TouchableOpacity>
                                        <Icon name="facebook-circle-fill" style={styles.icon} size={30} color="#1877F2" />
                                    </TouchableOpacity>


                                    <TouchableOpacity>
                                        <Icon name="twitter-fill" style={styles.icon} size={30} color="#1DA1F2" />
                                    </TouchableOpacity>


                                    <TouchableOpacity>
                                        <Icon name="linkedin-box-fill" style={styles.icon} size={30} color="#0077B5" />
                                    </TouchableOpacity>

                                </View>
                            </View>


                        </View>
                    </View>

                    <View style={{
                        marginTop: 10,
                        padding: 20
                    }}>
                        {/* <TouchableOpacity style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderTopWidth: 2,
                            borderBottomWidth: 2,
                            borderColor: "#B0B0B0",
                            width: "98%",
                            padding: 18,
                            justifyContent: "space-between"
                        }}>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 10

                            }}>
                                <Icon name="briefcase-4-line"></Icon>
                                <Text>See available jobs</Text>
                            </View>

                            <Icon name="arrow-right-s-line"></Icon>

                        </TouchableOpacity> */}
                    </View>


                </View>


                <View style={{
                    paddingLeft: 25,
                    paddingRight: 25
                }}>
                    <Text style={{ ...STYLE.textTitle, marginBottom: 10 }}>Review</Text>
                    <View style={{ marginBottom: 200, width: "100%", display: "flex", alignItems: "center" }}>
                        <MyCarousel data={data}></MyCarousel>
                    </View>
                </View>


            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    buttonApplyJob: {
        backgroundColor: '#E2F367',
        width: 58,
        height: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 1)',
        elevation: 10,
    },

    companyHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: "center"
    },
    companyHeaderText: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        flex: 1
    },
    wrapButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,

    },
    companyName: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 20
    },
    companyDes: {
        fontFamily: "RukbikNormal",
    },
    companyBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    main: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    companyBodyInfo: {
        width: "90%",
    },
    companyBodyInfoTitile: {
        fontFamily: "Rubik",
        fontSize: 18,
        color: "#000",
    },
    companyBodyInfoContent: {
        fontFamily: "RukbikNormal",
        fontSize: 15,
        color: "#676767",
        lineHeight: 20
    },
    JobSumary: {
        borderWidth: 2,
        borderColor: "#B0B0B0",
        display: "flex",
        marginTop: 28,
        padding: 28,
        borderRadius: 18,
        width: "90%"
    },
    jobCateDeTail: {
        width: 200
    }, jobCateDeTailTitle: {
        fontFamily: "RukbikNormal",
        fontSize: 12
    },
    jobCateDetailContent: {
        fontFamily: "RukbikNormal",
        color: "#000"

    },
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        alignContent: "center",
        backgroundColor: "#fff"
    },
    scrollContainer: {
        height: "100%",
    },
    JobSumary: {
        borderWidth: 2,
        borderColor: "#B0B0B0",
        display: "flex",
        marginTop: 28,
        padding: 28,
        borderRadius: 18
    },
    textTitle: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 18
    }
    ,
    jobCate: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop: 16
    },
    jobCateDeTail: {
        width: 200
    }, jobCateDeTailTitle: {
        fontFamily: "RukbikNormal",
        fontSize: 12
    },
    jobCateDetailContent: {
        fontFamily: "RukbikNormal",
        color: "#000"

    },
    JobDescription: {
        marginTop: 10,
        padding: 10
    },
    JobDescriptionTitle: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 18

    },
    JobDescriptionConent: {
        fontFamily: "RukbikNormal",
        width: 280,
    },
    JobReview: {
        padding: 10
    },
    JobReviewTitle: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 18
    },
    social: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        gap: 20
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        gap: 16
    },
    icon: {
        fontSize: 24,
    },
    wrapInFoCpn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    gridItem: {
        flex: 1,
        margin: 10,
    },
    image: {
        width: '100%',
        height: 200, // Set the desired image height
        resizeMode: 'cover', // You can use other values like 'contain' as well
        borderRadius: 10, // Optional: add rounded corners
    },
    girdImageWrap: {
        display: "flex",
        flexDirection: "row",
        gap: 40,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap"

    },
    imgChild: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    imgChild: {
        width: "50%",
        height: "30%"
    },
    wrapModalCpn: {

    },
    itemModel: {
        borderWidth: 2,
        borderBlockColor: "#393939",
        display: "flex",
        flexDirection: "row",
        padding: 15,
        borderRadius: 16,
        gap: 10,
        alignItems: "center"

    },


})


export default ChildCompany