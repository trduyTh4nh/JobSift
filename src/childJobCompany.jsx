import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { create } from "react-test-renderer";
import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";


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


const ChildCompany = () => {
    return (

        <View style={styles.container}>

            <ScrollView style={styles.scrollContainer}>

                <View style={styles.main}>
                    <View style={styles.companyHeader}>
                        <View style={styles.companyHeaderText}>
                            <Image style={{ width: 45, height: 45 }} source={require('../assets/logo_gg.png')}></Image>
                            <View style={styles.companyTitle}>
                                <Text style={styles.companyName}>Google LLC</Text>
                                <Text style={styles.companyDes}>Enterprise</Text>
                            </View>
                        </View>
                        <View style={styles.wrapButton}>
                            <TouchableOpacity style={styles.buttonApplyJob}>
                                <Icon name="heart-line" size={28} ></Icon>
                            </TouchableOpacity>

                            <View>
                                <TouchableOpacity>
                                    <Icon name="more-fill" size={32}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.companyBody}>
                        <Image source={require('../assets/banner.png')} style={{
                            marginTop: -20
                        }}></Image>

                        <View style={styles.companyBodyInfo}>
                            <Text style={styles.companyBodyInfoTitile}>Enterprise Description</Text>
                            <Text style={styles.companyBodyInfoContent}>
                                Lorem ipsum dolor sit amet consectetur.
                                Venenatis massa enim pretium eleifend tellus urna suspendisse nisl lorem.
                                Faucibus diam ornare aliquet donec sit suspendisse.
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
                                    <Text style={styles.jobCateDetailContent}>Computer Science & Information Technology</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="map-pin-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Headquarters</Text>
                                    <Text style={styles.jobCateDetailContent}>1600 Amphitheatre ParkwayMountain View, CA 94043</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="user-2-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Open Position</Text>
                                    <Text style={styles.jobCateDetailContent}>65</Text>
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
                                    <Text style={styles.jobCateDetailContent}>email@domain.com</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="map-pin-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Phone</Text>
                                    <Text style={styles.jobCateDetailContent}>0937454345354</Text>
                                </View>
                            </View>

                            <View style={styles.jobCate}>
                                <Icon size={24} name="user-2-line"></Icon>
                                <View style={styles.jobCateDeTail}>
                                    <Text style={styles.jobCateDeTailTitle}>Person in charge</Text>
                                    <Text style={styles.jobCateDetailContent}>Mr. steve</Text>
                                </View>
                            </View>


                            <View styles={{ display: "flex", flexDirection: "row" }}>


                                <View style={styles.iconContainer}>
                                    <Icon name="facebook-circle-fill" style={styles.icon} />
                                    <Icon name="twitter-fill" style={styles.icon} />
                                    <Icon name="linkedin-box-fill" style={styles.icon} />
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

                    <View style={styles.girdImageWrap}>
                        {/* <ImageGird></ImageGird> */}
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
        gap: 100,
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
        marginBottom: 200

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
        marginTop: 10,
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
        marginTop: 20
    }

})


export default ChildCompany