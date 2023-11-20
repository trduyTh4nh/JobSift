import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const TransactionHistory = () => {
    const history = [
        { id: '1', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '2', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '3', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '4', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '5', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '6', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '7', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '8', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '9', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
        { id: '10', time: '23:40 - 22/09/2023', name: 'Tặng kim cương từ hệ thống', money: '+ 2 KC (0 đ)' },
    ];
    return (
    <ScrollView>
        <View style={{
            
        }}>
            <FlatList
                style={{paddingBottom: 300}}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                data={history}
                renderItem={({ item }) => (
                    <View style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        <View style={styles.item}>

                            <View style={{
                                flexDirection: 'row',
                                display: "flex",
                                alignItems: 'center',
                                justifyContent: "space-between"
                            }}>
                                <View style={{
                                    flexDirection: "column",
                                    display: "flex",
                                    gap: 5,
                                    flex: 1
                                }}>
                                    <Text style={styles.time}>{item.time}</Text>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>

                                <Text style={styles.money}>{item.money}</Text>
                            </View>
                        </View>

                    </View>
                )}
            />
        </View>
    </ScrollView>


    );
}
const styles = StyleSheet.create({
    imageButton: {
        width: 20,
        height: 20,
        marginTop: 40,

    },

    txtTransHistory: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Rubik',
        marginStart: 25,
        marginTop: 20,
    },

    imageDiamond: {
        width: 30,
        height: 30,
        marginTop: 35,
    },

    numberofDiamond: {
        fontSize: 25,
        fontWeight: '900',
        color: '#000',
        fontFamily: 'Rubik',
        marginTop: 30,
        marginStart: 10,
    },

    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Rubik',
        marginTop: 10,
        marginStart: 8,
    },

    txtPurchase: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
    },

    txtConsume: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Rubik',
    },

    txtLine: {
        width: 85,
        height: 5,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
    },

    item: {
        marginTop: 24,
        padding: 20,
        backgroundColor: '#D4FFB9',
        fontSize: 24,
        borderRadius: 10,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 7,
        width: "90%",

    },

    time: {
        fontSize: 16,
        fontWeight: '400'
    },

    name: {
        fontSize: 17,
        fontWeight: '900',
    },

    money: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#286900',
        fontSize: 16,
        textShadowColor: '#000',
    },
});
export default TransactionHistory;