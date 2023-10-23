import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { create } from "react-test-renderer";
import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { API_URL } from "../ipConfig"
import Carousel from 'react-native-snap-carousel';
import STYLE from '../assets/css/universal'


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
                <Image source={{ uri: item }} style={{ width: 300, height: 250, borderRadius: 16, elevation: 10 }} />
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



    const { postData, dataDN } = route.params;

    const idNTD = {
        id_ntd: postData.id_ntd,
        id_post: postData.id_post
    }

    console.log(postData.id_ntd + " " + postData.id_post)

    const [infoNTD, setInfoNTD] = useState({})



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

    console.log("thông tin đã lấy: " + JSON.stringify(infoNTD));

    return (

        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>

                <View style={styles.main}>
                    <View style={styles.companyHeader}>
                        <View style={styles.companyHeaderText}>
                            <Image style={{ width: 45, height: 45 }} source={require('../assets/logo_gg.png')}></Image>
                            <View style={styles.companyTitle}>
                                <Text style={styles.companyName}>{infoNTD.info ? infoNTD.info.name_dn : ''}</Text>
                                <Text style={styles.companyDes}>Enterprise</Text>
                            </View>
                        </View>
                        <View style={styles.wrapButton}>
                            <TouchableOpacity style={styles.buttonApplyJob}>
                                <Icon name="heart-line" size={28} ></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.companyBody}>
                        <Image source={require('../assets/banner.png')} style={{
                            marginTop: -20
                        }}></Image>

                        <View style={styles.companyBodyInfo}>
                            <Text style={styles.companyBodyInfoTitile}>Enterprise Description</Text>
                            <Text style={styles.companyBodyInfoContent}>
                                {infoNTD.description}
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
                        <TouchableOpacity style={{
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

                        </TouchableOpacity>
                    </View>


                </View>


                <View style={{
                    paddingLeft: 25,
                    paddingRight: 25
                }}>
                    <Text style={{...STYLE.textTitle, marginBottom: 10}}>Review</Text>
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
        gap: 150,
        padding: 20,
        justifyContent: "center"
    },
    companyHeaderText: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center"

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
    },
    main: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    companyBodyInfo: {
        paddingLeft: 20,
        paddingRight: 20,
        width: "80%"
    },
    companyBodyInfoTitile: {
        fontFamily: "Rubik",
        fontSize: 16,
        color: "#000"
    },
    companyBodyInfoContent: {
        fontFamily: "RukbikNormal",
        fontSize: 14,
        color: "#000"
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
        height: "75%",
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
        alignItems: "center"
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
    }

})


export default ChildCompany