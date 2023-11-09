import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList, ToastAndroid } from "react-native";
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { create } from "react-test-renderer";
import { useFonts } from "expo-font";
import Icon from 'react-native-remix-icon';
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../ipConfig"

import STYLE from '../assets/css/universal'
import Error from "../components/Error";
import { useIsFocused } from "@react-navigation/native";

const IPcuaQuang = "192.168.1.113"
const IPlD = "192.168.116.1"

const ChildInFoJob = ({ route }) => {
    const showToast = () => {
        ToastAndroid.show("Upload Success!", ToastAndroid.SHORT)
    }

    const { postData, dataDN } = route.params;

    const userDB = global.user



    const [business, setBusiness] = useState({})


    useEffect(() => {
        let isMounted = true;

        axios.post(`http://${API_URL}:3001/ntd/${postData.id_ntd}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (isMounted) {
                setBusiness(response.data)
            }

        }).catch((error) => {
            console.error('Business' + error);
        });

        return () => {
            isMounted = false;
        };
    }, []);






    // console.log(business)

    const dataTag = [
        { tagID: 1, text: "Font-end" },
        { tagID: 2, text: "Senior" },
        { tagID: 3, text: "Swift" },
        { tagID: 4, text: "SwiftUI" },
        { tagID: 5, text: "Apple" },
    ]
    const [rating, setRating] = useState(0)
    const [myStar, setMystar] = useState(0)

    const [comment, setComment] = useState('')

    const handleComment = (cmt) => {
        setComment(cmt)
    }

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    const focused = useIsFocused()
    const currentTime = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec

    const formDataFB = {
        iduser: userDB.user.id_user,
        idpost: postData.id_post,
        content: comment,
        time: currentTime
    }



    const upLoadFB = () => {
        handleSubmit()
        showToast()
        setCheckUpload(true)

    }

    const [checkUpLoad, setCheckUpload] = useState(false)

    const [fb, setFb] = useState({})

    const handleSubmit = () => {

        axios.post(`http://${API_URL}:3001/upfeedback`, formDataFB, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            //console.log(JSON.stringify(response.data))
            showToast()
            getFeed()
        }).catch((error) => {
            console.error('Feedback' + error)
        })
    }

    const handleRating = (star) => {
        const dataRating = {
            iduser: userDB.user.id_user,
            id_post: postData.id_post,
            numberstar: star
        }

        axios.post(`http://${API_URL}:3001/addrating`, dataRating, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).
            then((response) => {
                console.log('Successfully!')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const starPress = (starNumber) => {
        setRating(starNumber)
        handleRating(starNumber)

    }



    useEffect(() => {

        const iduser = userDB.user.id_user
        const idpost = postData.id_post

        axios.post(`http://${API_URL}:3001/getcurrentstar/${iduser}/${idpost}`)
            .then((response) => {
                if (response.status === 200) {
                    const currentstar = response.data.cur;
                   
                        setRating(currentstar.numberstar)
                   
                } else {
                    console.error('Error lỗi nè:', response.data.error);
                }
            })
            .catch((error) => {
                console.log('Lỗi nè:', error);
            });


    }, [focused])





    const datePost = new Date(postData.ngay_hethan)

    const renderTag = ({ item }) => {
        return (
            <TouchableOpacity style={styles.wrapATag}>
                <Icon name="hashtag" color="#B0B0B0" size={22}></Icon>
                <Text style={styles.textTag}>{item.text}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getFeed()
    }, [])

    const getFeed = () => {
        fetch(`http://${API_URL}:3001/upfeedback/${postData.id_post}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                //  console.log(data.fbs)
                setFb(data.fbs)
            })
            .catch(error => {
                console.log('Feedback' + error);
            })
    }

    const renderComment = ({ item }) => {

        const date = new Date(item.time)
        return (
            <View style={styles.componentCmt}>
                <View style={styles.headerCmt}>
                    <View style={styles.infoUserCmt}>
                        <Image source={require('../assets/favicon.png')} />
                        <Text style={styles.userNameCmt}>{item.full_name}</Text>
                    </View>
                    <Text style={styles.timeCmt}>{date.toLocaleDateString()}</Text>
                </View>

                <View style={styles.bodyCmt}>
                    <Text style={styles.bodyCmtContent}>{item.content}</Text>
                </View>
            </View>
        );
    };




    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.JobSumary}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>Thông tin chung</Text>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="briefcase-4-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Loại công việc</Text>
                            <Text style={styles.jobCateDetailContent}>{postData.job_category}</Text>
                        </View>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="map-pin-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Địa chỉ làm việc</Text>
                            <Text style={styles.jobCateDetailContent}>{postData.dia_chi}</Text>
                        </View>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="money-dollar-circle-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Mức lương</Text>
                            <Text style={styles.jobCateDetailContent}>${postData.luong} - ${Math.round(postData.luong) + 300}</Text>
                        </View>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="time-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Kinh nghiệm yêu cầu</Text>
                            <Text style={styles.jobCateDetailContent}>{postData.kinh_nghiem_yeu_cau}</Text>
                        </View>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="user-2-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Vị trí</Text>
                            <Text style={styles.jobCateDetailContent}>{postData.position}</Text>
                        </View>
                    </View>

                    <View style={styles.jobCate}>
                        <Icon size={24} name="check-line"></Icon>
                        <View style={styles.jobCateDeTail}>
                            <Text style={styles.jobCateDeTailTitle}>Hạn chót ứng tuyển</Text>
                            <Text style={styles.jobCateDetailContent}>{datePost.toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.JobDescription}>
                    <Text style={styles.JobDescriptionTitle}>Miêu tả công việc</Text>
                    <Text style={styles.JobDescriptionConent}>{postData.note}
                    </Text>
                </View>

                <View style={styles.JobReview}>
                    <Text style={styles.JobReviewTitle}>Đánh giá</Text>
                    <View style={styles.JobWrapRankStar}>
                        <View style={styles.wrapRank}>
                            <View style={styles.wrapJobstart}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => starPress(star)}
                                    >
                                        <Icon
                                            name={star <= rating ? "star-fill" : "star-line"}
                                            color={star <= rating ? "#E2F367" : "#000"}
                                            size={40}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.JobRankNumber}>
                                <Text style={styles.wrapNumberStartUp}>{rating}
                                    <Text style={styles.wrapNumberStart}>/5</Text></Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.wrapComment}>
                        <TextInput
                            style={styles.inputCmt}
                            placeholder="Nhập phản hồi"
                            placeholderTextColor={"#000"}

                            onChangeText={handleComment}
                            value={comment}></TextInput>

                        <TouchableOpacity style={styles.buttonCmt} onPress={upLoadFB}>
                            <Icon name="check-line"></Icon>
                            <Text style={{ fontFamily: "Rubik", color: "#000", alignSelf: 'center' }}>Đăng tải</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.wrapUserCmt}>

                    <View style={styles.wraptitleCmt}>
                        <Text style={styles.titleCmt}>Phản hồi</Text>
                    </View>
                    {
                        fb.length > 0 ?
                            (<FlatList
                                data={fb}
                                scrollEnabled={false}
                                renderItem={renderComment}
                                keyExtractor={(item) => item.idfb.toString()}
                            />) : <Error message={'Hãy là người đầu tiên đăng phản hồi.'} title={'Chưa có phản hồi nào'} icon={'ri-chat-3-line'} />
                    }
                </View>


                <View style={styles.tagTitle}>
                    <Text style={styles.textTagTitle}>Tag</Text>
                </View>

                <View style={styles.wrapTags}>
                    <FlatList
                        ItemSeparatorComponent={() => (<View style={{ width: 10 }}></View>)}
                        style={styles.styleForListTags}
                        horizontal={true}
                        data={dataTag}
                        renderItem={renderTag}
                        keyExtractor={(item) => item.tagID.toString()}
                        contentContainerStyle={styles.flatListContent}>
                    </FlatList>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 100,
        backgroundColor: "#fff",
        width: "90%",
        fontWeight: "900",

    },
    label: {
        fontWeight: "600",
        color: "#fff"
    },
    container: {
        gap: 16,
        padding: 32,
        paddingBottom: 150,
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
        padding: 24,
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
        marginTop: 0,
        padding: 0
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
        padding: 0,
        gap: 16,
    },
    JobReviewTitle: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 18
    },
    wrapRank: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop: 0
    },
    wrapNumberStart: {
        fontFamily: "RubikNormal",
        fontSize: 18

    },
    wrapJobstart: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    JobRankNumber: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    wrapNumberStartUp: {
        fontFamily: "Rubik",
        fontSize: 30,
        color: "#000"
    },
    JobWrapRankStar: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center"
    },
    buttonCmt: {
        backgroundColor: "#E2F367",
        flexDirection: "row",
        alignItems: 'center',
        gap: 5,
        borderRadius: 16,
        elevation: 3,
        padding: 10,
        width: 100,
    },
    inputCmt: {
        backgroundColor: "#F1F1F1",
        flex: 1,
        padding: 20,
        fontFamily: "RubikNormal",
        borderRadius: 16,
        elevation: 2,

    },
    wrapComment: {
        display: "flex",
        flexDirection: "row",
        marginTop: 0,
        gap: 10
    },
    wrapUserCmt: {
        marginTop: 0,
        gap: 16,
    },
    componentCmt: {
        borderColor: "#B0B0B0",
        borderWidth: 2,
        padding: 22,
        borderRadius: 18,
        marginTop: 18
    },
    infoUserCmt: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    userNameCmt: {
        fontSize: 16,
        fontFamily: "RukbikNormal",
        color: "#000"
    },
    timeCmt: {
        fontFamily: "RukbikNormal"
    },
    headerCmt: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    bodyCmtContent: {
        fontFamily: "RukbikNormal",
        marginTop: 10,
        fontSize: 15,
        color: "#000"
    },
    wrapATag: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        padding: 12,
        borderRadius: 16,
        borderColor: "#B0B0B0"
    },
    wrapTags: {

        display: "flex",
        flexDirection: "row",
        marginBottom: 300,
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "flex-start",

    },
    styleForListTags: {

    },
    flatListContent: {
        flexGrow: 1,
    },
    textTag: {
        fontFamily: "RukbikNormal",
        color: "black"
    },
    tagTitle: {


    },
    textTagTitle: {
        fontFamily: "Rubik",
        color: "#000",
        fontSize: 18
    },
    titleCmt: {
        ...STYLE.textTitle
    },
    wraptitleCmt: {
        margin: 0
    }



})

export default ChildInFoJob