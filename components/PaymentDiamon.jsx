import React from "react";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity, FlatList, Image, TextInput, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-remix-icon';
import { useRoute } from '@react-navigation/native';

import { StripeProvider, usePaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { API_URL } from "../constants/etc";
import axios from "axios";
import { socket } from "../constants/socket.io/socket"

const PaymentDiamon = () => {

    const [paymentInfo, setPaymentInfo] = useState({})
    const user = global.user.user
    const route = useRoute();
    const diamond = route.params?.KC;
    const price = route.params?.price;
    const priceText = route.params?.priceText;
    const [ready, setReady] = useState(false);
    // const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const fetchPaymentSheetParams = async () => {

        const response = await fetch(`${API_URL}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: price }),
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,

        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };



    const openPaymentSheet = async () => {
        try {

            await initializePaymentSheet()

            const { error } = await presentPaymentSheet();

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
                return;
            }

            const iduser = user.id_user;
            const paymentInfo = {
                iduser: iduser,
                kc: diamond,
            };

            let data = JSON.stringify(paymentInfo);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${API_URL}/buykc`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);

            console.log('Server response:', response.data);

            const e = await axios.post(`${API_URL}/diamond/${iduser}`);

            const d = e.data;

            await axios.post(`${API_URL}/diamond/set`, {
                "diamond_count": d.diamond_count + (diamond - diamond),
                "id_user": iduser
            });

            socket.emit('kcValChange', { diamond_count: d.diamond_count + (diamond - diamond) });

            Alert.alert('Success', 'Payment successful!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios network errors
                if (error.response) {
                    console.error('Server responded with error:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Request failed:', error.message);
                }
            } else {
                // Handle other errors
                console.error('Error handling payment or server update:', error);
            }
            // Handle errors appropriately (logging, informing the user, etc.)
        }
    };



    // const openPaymentSheet = async () => {
    //     try {
    //         const { error } = await presentPaymentSheet();
    //         const iduser = user.id_user;
    //         const paymentInfo = {
    //             iduser: iduser,
    //             kc: diamond,
    //         };

    //         if (error) {
    //             Alert.alert(`Error code: ${error.code}`, error.message);
    //         } else {

    //             //executeAPICall()

    //             // const response = await axios.post(`http://${API_URL}:3001/buykc`, paymentInfo, {
    //             //     headers: {
    //             //         'Content-Type': 'application/json',
    //             //     },
    //             // });

    //             // console.log('Server response:', response.data);

    //             let data = JSON.stringify({
    //                 "iduser": iduser,
    //                 "kc": diamond
    //             });

    //             let config = {
    //                 method: 'post',
    //                 maxBodyLength: Infinity,
    //                 url: 'http://192.168.116.1:3001/buykc',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 data: data
    //             };

    //             axios.request(config)
    //                 .then((response) => {
    //                     console.log(JSON.stringify(response.data));

    //                     axios.post(`${API_URL}:3001/diamond/${iduser}`).then(e => {
    //                         const d = e.data
    //                         axios.post(`${API_URL}:3001/diamond/set`, {
    //                             "diamond_count": e.data.diamond_count + diamond,
    //                             "id_user": iduser
    //                         }).then((e) => {
    //                             socket.emit('kcValChange', { diamond_count: d.diamond_count + diamond })
    //                             Alert.alert('Thành công', 'Thanh toán thành công!');
    //                         }).catch((error) => {
    //                             console.log("ERRROR here: " +  error)
    //                         })
    //                     })
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });

    //         }
    //     } catch (error) {
    //         console.error('Error handling payment or server update:', error);
    //     }
    // };

    useEffect(() => {
        initializePaymentSheet();
    }, []);


    // useEffect(() => {
    //     if (loading) {
    //         openPaymentSheet();
    //     }
    // }, [loading]);

    // const number = price * 100 ;
    // const formattedNumber = number.toLocaleString('vi-VN'); // Kết quả: "100.000"
    // console.log(formattedNumber);



    return (
        <ScrollView style={{ paddingBottom: 200 }}>
            <StripeProvider
                publishableKey="pk_test_51ODOjFDqDQ31HEFQwTDCiTH1AyfrMZGiFNjgitItFOyPkQliWEUJEC4RkcspbyNpm8n7sxwH5VZEdc7oy9ZHqGOT00LByYtfnn"
                urlScheme="your-url-scheme"
                merchantIdentifier="merchant.com.{{JobSift}}"
            >
                <View style={{ ...styles.wrap, paddingBottom: 100 }}>

                    <View style={{
                        elevation: 10,
                        backgroundColor: '#fff',
                        borderRadius: 60
                    }}>
                        <Image source={require('../assets/images/diamonVIP.png')} style={styles.vienhinh} />
                    </View>

                    <View style={styles.container}>
                        <View style={{ alignItems: "center", }}>
                            <View style={styles.vienicondautrang}>
                                <Image source={require('../assets/images/diamond_mini.png')}>
                                </Image>
                            </View>
                        </View>

                        <View style={{ alignItems: "center" }}>

                            <Text style={styles.chucuaslart}>Thông tin chi tiết về gói Normal</Text>
                        </View>
                        <View style={{ padding: 16, gap: 16 }}>
                            <View style={styles.vien}>
                                <View style={{ marginEnd: 10, marginStart: 10 }}>
                                    <Text style={styles.chucuaslart3}>Gói Normal</Text>
                                    <View style={styles.dongngang}>
                                        <Icon name="ri-money-dollar-circle-line"></Icon>
                                        <View style={styles.dongdoc}>
                                            <Text style={{ fontSize: 20 }}> Giá </Text>
                                            <View style={styles.dongngang}>
                                                <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', }}>{priceText}</Text>
                                                <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', }}>vnd</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.dongngang1} >
                                    <Text style={{ fontSize: 17, color: "#000000", fontWeight: "500" }}>{diamond} 💎</Text>

                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 16 }}>
                            <View style={styles.vien1}>
                                <View style={{ alignItems: "center", marginTop: 17 }}>
                                    <Text style={styles.chucuaslart4}>Thông tin về điều khoản và dịch vụ</Text>

                                </View>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: '400' }}>
                                        1. Mục Đích và Phạm Vi: Mô tả mục tiêu và phạm vi của ứng dụng hoặc dịch vụ, bao gồm chức năng cụ thể và dịch vụ được cung cấp.
                                    </Text>
                                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: '400' }}>
                                        2. Giá và Thanh Toán: Liệt kê thông tin về giá của ứng dụng hoặc dịch vụ, cách thanh toán, chính sách hủy và tái đăng ký nếu có.
                                    </Text>
                                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: '400' }}>
                                        3. Điều Khoản Sử Dụng: Xác định các quy tắc mà người dùng phải tuân theo khi sử dụng ứng dụng hoặc dịch vụ, bao gồm giới hạn về mục đích sử dụng và hạn chế về nội dung không phù hợp.
                                    </Text>
                                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: '400' }}>
                                        4. Quyền Sở Hữu Trí Tuệ: Đề cập đến quyền sở hữu trí tuệ của ứng dụng hoặc dịch vụ, bao gồm bản quyền và giấy phép
                                    </Text>
                                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: '400' }}>
                                        5. Chính Sách Bảo Mật: Trình bày cách dữ liệu cá nhân..........
                                    </Text>
                                </View>

                            </View>

                        </View>


                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                elevation: 10,
                                marginBottom: 30,
                                backgroundColor: "#fff",
                                width: "90%",
                                padding: 6,
                                marginTop: 20,
                                borderRadius: 30,
                                justifyContent: "space-between"
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: "#ccc",
                                    display: "flex",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 8,
                                    gap: 10,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    alignItems: "center",
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    flex: 0.4
                                }}>
                                    <Icon name="close-line"></Icon>
                                    <Text style={{
                                        color: "#000",
                                        fontWeight: "600",
                                    }}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={openPaymentSheet}
                                    disabled={!loading}
                                    style={{
                                        backgroundColor: "#E2F367",
                                        display: "flex",
                                        flexDirection: "row",
                                        borderRadius: 30,
                                        padding: 8,
                                        flex: 1,
                                        gap: 10,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        alignItems: "center",
                                        paddingTop: 15,
                                        paddingBottom: 15

                                    }}>
                                    <Icon name="wallet-2-line"></Icon>
                                    <Text style={{
                                        color: "#000",
                                        fontWeight: "600",
                                    }}>Thanh toán</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </StripeProvider>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrap: {
        // paddingTop:24 ,
        // paddingRight: 20,
        // paddingLeft: 20,
        // paddingBottom: 100,
        backgroundColor: 'white',
    },
    container: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
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
        width: 341,
        height: 54,
        backgroundColor: '#E2F367',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 30 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 4,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },


    chucuaslart: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',

    },
    chucuaslart1: {
        fontSize: 20,
        // fontWeight:'900',
        color: '#000',

    },
    chucuaslart3: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',

    },
    chucuaslart4: {
        fontSize: 19,
        fontWeight: '900',
        color: '#000',

    },
    vienhinh: {
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "black",
        width: "100%",
    },
    vienicondautrang: {
        backgroundColor: "#E2F367",
        borderRadius: 14,
        justifyContent: "center",
        width: 72,
        height: 65,
        alignItems: "center",
        marginTop: "-10%",
        elevation: 10
    },
    vien: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        // alignItems: "center",
        borderColor: "#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 20,
        padding: 20,
        width: "100%"
    },
    vien1: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        // alignItems: "center",
        borderColor: "#B0B0B0",
        borderWidth: 3,
        borderRadius: 20,

        padding: 10,

        width: "100%"
    },
    dongngang: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,

    },
    dongdoc: {
        display: "flex",
        flexDirection: "column",

    },
    dongngang1: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        gap: 7,

    },
    searchBtn: {
        width: "90%",
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 30 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 40,
        display: "flex",
        flexDirection: "row"
    },

}
)

export default PaymentDiamon