import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { uploadFile } from "../firebase/storage";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Animated, Easing, ActivityIndicator, SafeAreaView, Pressable, Alert } from "react-native";
import Icon from 'react-native-remix-icon';
import { COLORS, FONT } from "../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildInFoJob from "../src/childJob";
import ChildCompany from "../src/childJobCompany";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from 'expo-font'
import BottomPopup from "../navigation/bottomPopUp";
import { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../constants/socket.io/socket";
import storage from '@react-native-firebase/storage'
import { API_URL } from "../ipConfig"
import Modal from 'react-native-modal'
import STYLE from "../assets/css/universal";
import * as DocumentPicker from 'expo-document-picker';
import { ProgressBar } from "react-native-paper";
const IPcuaQuang = "192.168.1.113"
const IPlD = "192.168.116.1"
// const Tab = createBottomTabNavigator();
import { API_URL as URL } from "../constants/etc";
const Tab = createMaterialTopTabNavigator();


const JobDetail = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [hide, setHidden] = useState(true)
    const fadeAnim = new Animated.Value(100);
    const [showPDFCV, setShowPDFCV] = useState(false)
    const [showUngTuyen, setShowUngTuyen] = useState(false)
    const [doanhNghiep, setDoanhNghiep] = useState({})

    const [file, setFile] = useState()
    const [showSuccess, setSuccess] = useState(false)

    const handleDataFromChild = (data) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setHidden(false);
        });
    }
    const handleUploadFile = () => {
        DocumentPicker.getDocumentAsync().then((e) => {

            if (!e.canceled) {
                const fileName = e.assets[0].name
                const fileNameArr = fileName.split('.')
                console.log(fileNameArr[fileNameArr.length - 1])
                if (fileNameArr[fileNameArr.length - 1] != 'PDF' && fileNameArr[fileNameArr.length - 1] != 'pdf') {
                    setFile({ assets: [{ name: 'Please upload a PDF file' }] })
                } else {
                    setFile(e)
                }

            }
            console.log(e)
        })
    }
    useEffect(() => {
        if (hide) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }
    }, [hide]);

    const postData = route.params ? route.params.postData : null;
    const [isFav, setFav] = useState(false)
    const fetchFav = () => {
        console.log('begin fetch fav')
        axios.post(`http://${API_URL}:3001/getpostfavourite`, {
            "id_user": global.user.user.id_user,
            "id_job": postData.id_post
        }).then(e => {
            setFav(e.data)
        }).catch(e => {
            console.error('error fetch fav: ' + e)
        })
    }
    const fav = () => {
        axios.post(`http://${API_URL}:3001/addfavourite`, {
            "id_user": global.user.user.id_user,
            "id_job": postData.id_post
        }).then(e => {
            fetchFav()
        }).catch(e => {
            Alert.alert('Error', 'There is an error during the upload process, please try again. Details: ' + e)
        })
    }

    const datePost = new Date(postData.ngay_post)
    const [totalStar, setTotalStar] = useState('')
    const [quantityUser, setQuantityUser] = useState('')
    const ratingMain = Math.round(totalStar / quantityUser)

    const [cv, setCV] = useState('')
    const [isLoading, setLoading] = useState(false)



    const [dataPostCurrent, setDataPostCurrent] = useState({})
    useEffect(() => {
        console.log('e')
        fetchFav()
    }, [dataPostCurrent])
    useEffect(() => {
        
        const dataPostID = {
            id_post: postData.id_post
        }

        axios.post(`http://${API_URL}:3001/getpostby`, dataPostID, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setDataPostCurrent(response.data.dataPost)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [focus])


    const focus = useIsFocused()
    useEffect(() => {
        
        const dataUpdateViews = {
            id_post: postData.id_post,
            numberView: postData.views + 1
        }

        axios.post(`http://${API_URL}:3001/updateView`, dataUpdateViews, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log('Successfully!')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [focus])













    useEffect(() => {
        axios.get(`http://${API_URL}:3001/upfeedback/getrate/${postData.id_post}`, {

        })
            .then((response) => {
                setTotalStar(response.data.rate[0].start)
                setQuantityUser(response.data.rate[0].user)
                console.log(response.data.rate)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        if (postData) {
            console.log(postData)
            axios.post(URL + '/getcv', {
                "id_post": postData.id_post,
                "id_user": global.user.user.id_user
            }).then(e => {
                setCV(e.data[0])
                console.log(e.data[0])
            }).catch(e => {
            })
        }
    }, [postData])
    const getCV = () => {
        axios.post(URL + '/getcv', {
            "id_post": postData.id_post,
            "id_user": global.user.user.id_user
        }).then(e => {
            setTimeout(() => {
                setSuccess(true)
            }, 500)
            setCV(e.data[0])
            console.log(e.data[0])
        }).catch(e => {
        })
    }
    const [fileName, setFileName] = useState()
    const [apply, setApply] = useState()
    useEffect(() => {
        if (cv) {
            setLoading(true)
            console.log(cv.file)
            fetch(cv.file).then(e => {
                console.log(e._bodyBlob.data.name)
                setFileName(e._bodyBlob.data.name)
                setLoading(false)
            }).catch(e => {
                setLoading(false)
                console.log(e)
            })
            axios.post(URL + '/application', {
                "id_post": postData.id_post,
                "id_user": global.user.user.id_user
            }).then(e => {
                const data = e.data
                setApply({
                    ...data,
                    status: data.status == 0 ? 'Pending' : data.status == 1 ? 'Accepted' : 'Rejected'
                })
            }).catch(e => {
                console.error(e)
            })
        }
    }, [cv])
    // console.log(postData)
    const gotoChat = () => {
        axios.post(`http://${API_URL}:3001/createchat`, {
            "id_user": global.user.user.id_user,
            "id_ntd": postData.id_ntd,
            "tieu_de": postData.tieu_de
          }).then(e => {
            const data = e.data[0]
            navigation.navigate('Chat Details', { chatHeader: data })
          })
    }
    useEffect(() => {
        let isMounted = true;
        axios.post(`http://${API_URL}:3001/ntd/${postData.id_ntd}`, {}, {

        }).then((response) => {
            if (isMounted) {
                setDoanhNghiep(response.data);
            }
        }).catch((error) => {
            console.error(error);
        });
        return () => {
            isMounted = false;
        };
    }, []);
    
    if (!postData) {
        return (
            <Text>Opps...</Text>
        );
    }







    let popupRef = React.createRef()

    const onShowPopUp = () => {
        popupRef.show()
    }

    const closePopUp = () => {
        popupRef.close()
    }



    const popUpList = [
        {
            id: 1,
            name: "Ẩn header",
            iconName: "eye-close-line",
            colorTag: "#fff",
            tColor: "#000"
        },
        {
            id: 2,
            name: "Tố cáo",
            iconName: "flag-2-line",
            colorTag: "#FF6969",
            tColor: "#000"


        },

    ]





    const StarRating = ({ totalStars, userRating }) => {
        const filledStars = ratingMain;

        const renderStars = () => {
            const starIcons = [];
            for (let i = 1; i <= 5; i++) {
                const starName = i <= filledStars ? "star-s-fill" : "star-s-line";
                starIcons.push(
                    <Icon
                        key={i}
                        name={starName}
                        size={32}
                        color={i <= filledStars ? "#BACF21" : "#000"}
                    />
                );
            }
            return starIcons;
        };

        return (
            <View style={styles.quantityStart}>
                {renderStars()}
            </View>
        );
    };


    const totalStars = 1;
    const userRating = 0;
    const [diamond, setDiamond] = useState(global.user.user.diamond_count)
    const totalRate = Math.ceil(userRating / (totalStars / 5));
    const [isEnoughDiamond, setEnough] = useState(true);
    const handlePDFCVChoose = () => {
        setShowUngTuyen(false)
        setSuccess(false)
        axios.post('http://' + API_URL + ':3001' + '/diamond/' + global.user.user.id_user).then(e => {
            if(e.data.diamond_count >= 30){
                setEnough(true)
            } else {
                setEnough(false)
            }
            setDiamond(e.data.diamond_count)
            setTimeout(() => {
                setShowPDFCV(true)
            }, 400)
        })
        



    }
    const handlePDFCVCancel = () => {
        setShowPDFCV(false)
        setFile(null)

    }
    const convertSize = (size) => {
        if (size < 1024) {
            return size + ' bytes'
        } else if (size >= 1073741824) {
            return Math.round(size / 1000000000 * 100) / 100 + ' GB'
        } else if (size >= 1048576) {
            return Math.round(size / 1000000 * 100) / 100 + ' MB'
        } else {
            return Math.round(size / 1000 * 100) / 100 + ' KB'
        }
    }
    const handleUpload = () => {
        uploadFile(file.assets[0].uri, taskSnapshot => {
            setIsUploading(true)
            setUploadProgress(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)
        }, file.assets[0].name).then(e => {
            console.log(e)
            const ref = storage().ref(e.metadata.fullPath)
            ref.getDownloadURL().then(e => {
                console.log('uploaded with url: ' + e)
                axios.post(URL + '/createcv', {
                    "file": e,
                    "id_ungvien": global.user.user.id_user
                }).then(f => {
                    console.log('posted cv with id: ' + f.data[0].id_cv)
                    axios.post(URL + '/apply', {
                        "idcv": f.data[0].id_cv,
                        "id_post": postData.id_post,
                        "id_user": global.user.user.id_user
                    }).then((e) => {
                        setIsUploading(false)
                        handlePDFCVCancel()
                        getCV()
                        axios.post(URL + '/diamond/set', {
                            "id_user": global.user.user.id_user,
                            "diamond_count": diamond - 30
                        }).then(e => {
                            setDiamond(diamond - 30)
                            socket.emit('kcValChange', {kcInfo: diamond - 30})
                        }).catch(e => {
                            Alert.alert('ERROR subtracting diamond (FATAL): ' + e)
                        })
                    }).catch(e => {
                        console.log(e)
                    })
                }).catch(g => {
                    console.log('error posting cv but file is uploaded.' + g)
                })
            }).catch(err => {
                console.error('failed to get download url but file is uploaded with error: ' + err)
            })

        }).catch(e => {
            console.error(e)
        })
    }
    const getStatus = () => {
        switch (apply.status) {
            case 'Accepted':
                return {
                    icon: 'check-line',
                    color: '#67C1F3'
                }

            case 'Rejected':
                return {
                    icon: 'close-line',
                    color: '#F36767'
                }
            default:
                return {
                    icon: 'loader-fill',
                    color: '#B0B0B0'
                }

        }

    }
    return (
        <View style={styles.wrapMain}>
            <View style={styles.containerJobDetail}>
                {hide ?
                    (
                        <Animated.View
                            style={[
                                styles.headerJobInFoWrap,
                                {
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            <View style={styles.headerJobInFoWrap} >
                            
                                <View style={styles.headerJobInFo} >
                                    <View style={styles.wrapInfoJob}>
                                        <Text style={styles.nameJob}>{postData.tieu_de}</Text>

                                    </View>
                                    <View style={styles.wrapFeartureJob} >

                                        <TouchableOpacity onPress={() => { if (cv) { setSuccess(true); return } setShowUngTuyen(true) }} style={styles.buttonApplyJob}>

                                            <Icon name="check-fill" size={24} ></Icon>
                                        </TouchableOpacity>

                                        <View style={styles.wrapDiamond}>

                                            <Text
                                                style={styles.numberOfDiamond}
                                            >💎 10</Text>
                                        </View>

                                        <TouchableOpacity onPress={onShowPopUp} >
                                            <Icon name="more-line" size={24}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.wrapCompany}>
                                    <Text style={styles.nameCompany}>
                                        {doanhNghiep.ntd ? doanhNghiep.ntd.name_dn : "null"} •
                                    </Text>
                                    <Text style={styles.datePost}>
                                        Đăng ngày {datePost.toLocaleDateString()}
                                    </Text>
                                </View>
                                <View style={styles.headerRate}>

                                    <View style={styles.rateStar}>
                                        <View style={styles.quantityStart}>
                                            <StarRating totalStars={totalStars} userRating={userRating} />
                                        </View>
                                        <View style={styles.textStart}>
                                            <View style={styles.JobRankNumber}>
                                                <Text style={styles.wrapNumberStartUp}>{!isNaN(ratingMain) ? ratingMain : 0}
                                                    <Text style={styles.wrapNumberStart}>/5</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.rateReview}>
                                        <Text style={styles.rateReviewDetal}>{dataPostCurrent.views ? dataPostCurrent.views : "0"} lượt xem</Text>
                                    </View>
                                    
                                </View>
                                <View style={{flexDirection: 'row', gap: 16, marginTop: 16}}>
                                    <TouchableOpacity onPress={gotoChat} style={{...styles.buttonApplyJob, flex: 1, flexDirection: 'row', gap: 10, paddingLeft: 16, paddingRight: 16}}>
                                        <Icon name="chat-3-line" size={24}></Icon>
                                        <Text style={{...STYLE.textTitle, fontSize: 16}}>Chat với nhà tuyển dụng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={fav} style={{...styles.buttonApplyJob, flexDirection: 'row', gap: 10, paddingLeft: 16, paddingRight: 16}}>
                                        <Icon name={isFav ? "heart-fill" : "heart-line"} size={24}></Icon>
                                    </TouchableOpacity>
                                </View>


                                <BottomPopup
                                    ref={(target) => (popupRef = target)}
                                    onTouchOutside={closePopUp}
                                    data={popUpList}
                                    onDataFromChild={handleDataFromChild}>
                                </BottomPopup>

                            </View>
                        </Animated.View>

                    )

                    : (
                        <View style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity onPress={() => setHidden(true)}
                                style={{
                                    width: "70%", display: "flex",
                                    alignItems: "center"
                                }}>
                                <Icon name="arrow-down-s-line" size={35}></Icon>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            <View style={styles.wrapModal}>
                <Modal
                    style={{ margin: 0 }}
                    isVisible={showSuccess}
                    onBackdropPress={() => { setSuccess(false) }}
                    onBackButtonPress={() => { setSuccess(false) }}
                    swipeDirection={'down'}
                    onSwipeComplete={() => { setSuccess(false) }}
                >
                    <SafeAreaView style={styles.modal}>
                        {cv && !isLoading && apply ? (
                            <View style={styles.modalChild}>

                            <View>
                                <Text style={STYLE.textTitle}>{apply.status == 'Accepted' ? 'Xin chúc mừng!' : apply.status == 'Rejected' ? 'Vẫn còn hy vọng cho cơ hội tiếp theo...' : 'Ứng tuyển thành công!'}</Text>
                            </View>
                            <Text style={{...STYLE.textBold, fontSize: 16}}>{apply.status == 'Accepted' ? 'Bạn đã ĐỖ ỨNG TUYỂN. Vui lòng liên hệ với nhà tuyển dụng để biết thêm về thời gian phỏng vấn và các vấn đề khác.' : apply.status == 'Rejected' ? 'Đơn ứng tuyển của bạn đã bị TRƯỢT ỨNG TUYỂN. Đừng từ bỏ hy vọng, vẫn còn cơ hội thứ hai.' : `Đơn ứng tuyển của bạn đã được gửi đến ${doanhNghiep.ntd ? doanhNghiep.ntd.name_dn : 'Loading'}. Hãy chill và chờ sự phản hồi của nhà tuyển dụng.`}</Text>
                            <View style={{...styles.applicationStatus, borderColor: getStatus().color}}>
                                <Icon name={getStatus().icon}/>
                                <View>
                                    <Text style={{color: '#B0B0B0', fontSize: 12}}>Tình trạng ứng tuyển</Text>
                                    <Text style={{fontSize: 18}}>{apply.status == 'Accepted' ? 'Đỗ ứng tuyển' : apply.status == 'Rejected' ? 'Trượt ứng tuyển' : 'Đang chờ phản hồi'}</Text>
                                </View>
                            </View>
                                <Text style={{...STYLE.textBold, fontSize: 16}}>Chi tiết CV</Text>

                                <View style={styles.CVDetails}>
                                    <Text style={{ ...STYLE.textBold, fontSize: 16 }}>{cv.cv_title ? cv.cv_title : 'Untitiled CV'}</Text>
                                    {
                                        !fileName ? (
                                            <View style={{ gap: 10 }}>
                                                <View style={styles.CVDetailsSection}>
                                                    <Icon name="briefcase-4-line" />
                                                    <View>
                                                        <Text style={{ color: '#B0B0B0', fontSize: 12 }}>Category</Text>
                                                        <Text style={{ fontSize: 18 }}>cate</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.CVDetailsSection}>
                                                    <Icon name="user-2-line" />
                                                    <View>
                                                        <Text style={{ color: '#B0B0B0', fontSize: 12 }}>Category</Text>
                                                        <Text style={{ fontSize: 18 }}>cate</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.CVDetailsSection}>
                                                <Icon name="file-line" />
                                                <View>
                                                    <Text style={{ color: '#B0B0B0', fontSize: 12 }}>File</Text>
                                                    <Text style={{ fontSize: 18 }}>{fileName}</Text>
                                                </View>
                                            </View>
                                        )
                                    }


                                </View>
                                {

                                    apply.status == 'Rejected' ? 
                                    (
                                        <View style={{gap: 16}}>
                                            <View style={{borderBottomColor: '#B0B0B0', borderBottomWidth: 2}}></View>
                                            <Text>Cảm thấy mình đã cải thiện?</Text>
                                            <TouchableOpacity style={styles.buttonStyle}>
                                                <Text>Ứng tuyển với CV đã có</Text>
                                                <View style={styles.priceTag}>
                                                    <Text>💎 10</Text>
                                                    <Icon name="arrow-right-s-line"/>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handlePDFCVChoose} style={styles.buttonStyle}>
                                                <Text>Ứng tuyển với CV PDF</Text>
                                                <View style={styles.priceTag}>
                                                    <Text>💎 30</Text>
                                                    <Icon name="arrow-right-s-line"/>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{borderBottomColor: '#B0B0B0', borderBottomWidth: 2}}></View>
                                        </View>
                                    ) : ''
                                }
                                
                                <TouchableOpacity onPress={() => {setSuccess(false)}} style={styles.buttonStyle}>
                                    <Text>Xong</Text>

                                    <View style={styles.priceTag}>
                                        <Icon name="arrow-right-s-line" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <ActivityIndicator size={128} />
                        )}

                    </SafeAreaView>
                </Modal>
            </View>
            <View style={styles.wrapModal}>
                <Modal
                    style={{ margin: 0 }}
                    isVisible={showPDFCV}
                    onBackdropPress={() => { setShowPDFCV(false) }}
                    onBackButtonPress={() => { setShowPDFCV(false) }}
                    swipeDirection={'down'}
                    onSwipeComplete={() => { setShowPDFCV(false) }}
                >
                    <SafeAreaView style={styles.modal}>

                        {
                            isEnoughDiamond ? (
                                <View style={styles.modalChild}>
                                    <View>
                                        <Text style={STYLE.textTitle}>Đăng tải CV</Text>
                                        <Text>Vui lòng đăng tải CV của bạn (các loại file được chấp nhận: .pdf)</Text>
                                    </View>
                                    {isUploading ? (
                                        <View style={{gap: 16}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
                                                <ActivityIndicator size={16} style={{width: 16}}/>
                                                <Text>Đăng đăng tải ({Math.round(uploadProgress * 100)}%)</Text>
                                            </View>
                                            <ProgressBar progress={uploadProgress} color="#000" style={{backgroundColor: '#E9E9E9', borderRadius: 16, flex: 1}}/>
                                        </View>
                                    ) : ''}
                                    <View>

                                        <TouchableOpacity disabled={isUploading} onPress={handleUploadFile} style={{...styles.buttonStyle, paddingLeft: 24, paddingRight: 24,paddingTop: 20, paddingBottom: 20, backgroundColor: '#E9E9E9', borderRadius: 16}}>
                                            {file ? (<View>
                                                <Text style={{...STYLE.textBold, fontSize: 18}}>{file.assets[0].name}</Text>
                                                {
                                                    !isNaN(file.assets[0].size) ? 
                                                    (<Text>{convertSize(file.assets[0].size)}</Text>)
                                                    : ''
                                                }
                                            </View>)
                                            : ( <Text>Đăng tải file</Text>)}
                                            <Icon name={file ? 'file-line' : 'add-line'}/>
                                        </TouchableOpacity>
                                    </View>
                                        <TouchableOpacity onPress={handleUpload} style={styles.buttonStyle}>

                                        <Text>Ứng tuyển</Text>
                                        <View style={styles.priceTag}>
                                            <Text>💎 30</Text>
                                            <Icon name="arrow-right-s-line" />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handlePDFCVCancel} style={{...styles.buttonStyle, backgroundColor: '#E9E9E9'}}>

                                        <Text>Huỷ</Text>
                                        <View style={styles.priceTag}>
                                            <Icon name="close-line" />
                                        </View>
                                    </TouchableOpacity>


                                </View>
                            ) : (
                                <View style={styles.modalChild}>
                                    <Text style={{...STYLE.textTitle, fontSize: 25}}>Không đủ kim cương</Text>
                                    <Text style={STYLE.textTitle}>Bạn không có đủ kim cương để ứng tuyển vị trí này.</Text>
                                    <View style={{...styles.applicationStatus, borderColor: '#FC3903'}}>
                                        <Icon name={'error-warning-line'}/>
                                        <View>
                                            <Text style={{color: '#B0B0B0', fontSize: 12}}>Số kim cương</Text>
                                            <Text style={{...STYLE.textNormal, fontSize: 18}}>{diamond} <Text style={{...STYLE.textBold, color: 'rgba(0,0,0,0.65)', fontSize: 18}}>&lt; 30</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{gap: 16}}>
                                    <TouchableOpacity style={styles.buttonStyle}>
                                        <Text>Mua kim cương</Text>
                                        <View style={styles.priceTag}>
                                            <Text>199.000 VND</Text>
                                            <Icon name="arrow-right-s-line"/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {setShowPDFCV(false)}} style={styles.buttonStyle}>
                                        <Text>Xong</Text>
                                        <View style={styles.priceTag}>
                                            <Icon name="arrow-right-s-line"/>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                        
                    </SafeAreaView>
                </Modal>
            </View>
            <View style={styles.wrapModal}>
                <Modal
                    style={{ margin: 0 }}
                    isVisible={showUngTuyen}
                    onBackdropPress={() => { setShowUngTuyen(false) }}
                    onBackButtonPress={() => { setShowUngTuyen(false) }}
                    swipeDirection={'down'}
                    onSwipeComplete={() => { setShowUngTuyen(false) }}
                >
                    <SafeAreaView style={styles.modal}>
                        <View style={styles.modalChild}>
                            <Text style={STYLE.textTitle}>Đang ứng tuyển cho <Text>{postData.tieu_de}</Text> @ {doanhNghiep.ntd ? doanhNghiep.ntd.name_dn : 'Loading'}</Text>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text>Ứng tuyển với CV đã có</Text>
                                <View style={styles.priceTag}>
                                    <Text>💎 10</Text>
                                    <Icon name="arrow-right-s-line" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePDFCVChoose} style={styles.buttonStyle}>
                                <Text>Ứng tuyển với CV PDF</Text>
                                <View style={styles.priceTag}>
                                    <Text>💎 30</Text>
                                    <Icon name="arrow-right-s-line" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
            <View style={styles.bodyJobDetail}>

                <Tab.Navigator style={styles.tabInFoJob}
                    screenOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                        tabBarPressColor: 'lightgray',
                        tabBarPressOpacity: 0.5,
                        indicatorStyle: {
                            backgroundColor: '#BACF21',
                            height: 4,
                            width: 100
                        },
                        style: { backgroundColor: 'white' },
                    }}
                >
                    <Tab.Screen
                        style={styles.tabInFoJob_test}
                        name="ChildInFoJob"
                        component={ChildInFoJob}
                        initialParams={{
                            postData: postData,
                            dataDN: doanhNghiep,
                        }}
                        options={{
                            title: "Công việc",
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{
                                    color: focused ? 'black' : 'gray',
                                    fontSize: 16,
                                    fontFamily: "Rubik"
                                }}>
                                    Công việc
                                </Text>
                            ),
                            tabBarIndicatorStyle: {
                                width: 75,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 75) / 2),
                                backgroundColor: '#000',
                            },
                            tabBarIndicatorContainerStyle: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />




                    <Tab.Screen name="ChildCompany" component={ChildCompany}
                        options={{
                            title: "Company",
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{ color: focused ? 'black' : 'gray', fontSize: 16, fontFamily: "Rubik" }}>
                                    Doanh nghiệp
                                </Text>
                            ),

                            tabBarIndicatorStyle: {
                                width: 80,
                                height: 5,
                                left: ((Dimensions.get('window').width / 2 - 80) / 2),
                                backgroundColor: '#000',
                            },
                        }}
                        initialParams={{
                            postData: postData,
                            dataDN: doanhNghiep,
                        }} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E2F367',
        borderRadius: 50
    },
    priceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    wrapModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        borderRadius: 16,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: '#fff'
    },
    modalChild: {
        padding: 24,
        paddingBottom: 0,
        gap: 16
    },
    wrapMain: {
        backgroundColor: "#fff"
    },
    containerJobDetail: {
        padding: 16
    },
    headerJobDetail: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerJobInFo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    wrapInfoJob: {
        width: "50%",
        display: 'flex',
        gap: 10
    },
    wrapFeartureJob: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'flex-end'
    },
    wrapCompany: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
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
    wrapDiamond: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameJob: {
        fontSize: 28,
        color: '#323232',
        fontFamily: "Rubik"
    },
    nameCompany: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "Rubik"
    },
    datePost: {
        fontSize: 14,
        color: '#323232',
        fontFamily: "RukbikNormal"

    },
    wrapDiamond: {
        display: "flex",

        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    headerJobInFoWrap: {
        gap: 5
    },
    headerRate: {
    }
    ,
    quantityStart: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    rateStar: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center"

    },
    textStartDetail: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Rubik"
    },
    rateReviewDetal: {
        marginTop: 8,
        color: "#000",
        fontFamily: "RukbikNormal"

    },
    bodyJobDetail: {
        height: 750
    },
    tabInFoJob: {
        fontFamily: "Rubik"

    },
    tabInFoJob_test: {
        fontFamily: "Rubik"

    },
    numberOfDiamond: {
        fontSize: 16,
        fontFamily: "RukbikNormal"
    },
    JobRankNumber: {
        display: "flex",
        flexDirection: "row",

    },
    wrapNumberStartUp: {
        fontFamily: "Rubik",
        fontSize: 30,
        color: "#000"
    },
    JobWrapRankStar: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }, wrapNumberStart: {
        fontFamily: "RubikNormal",
        fontSize: 16
    },
    menuPopUp: {
        width: 100,
        height: 100
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuItem: {
        fontSize: 20,
        padding: 15,
        backgroundColor: 'white',
    },
    popUpBottomMenu: {
    },
    wrapPopMenu: {
        elevation: 4
    },
    wrapMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        elevation: 5,
        backgroundColor: "red"
    }, optionOnMenu: {
        backgroundColor: "#ccc"
    },
    applicationStatus: {
        flexDirection: 'row',
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 10,
        borderRadius: 16,
        alignItems: "center"
    },
    CVDetails: {
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 20,
        borderRadius: 16,
        gap: 10
    },
    CVDetailsSection: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})


export default JobDetail 