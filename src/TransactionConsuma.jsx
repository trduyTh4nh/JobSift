import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

const TransactionConsume = () => {
    const history = [
        { id: '1', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '2', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '3', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '4', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '5', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '6', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '7', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '8', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '9', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
        { id: '10', time: '23:40 - 22/09/2023', name: 'Post đầu tiên X1', money: '- 15 KC' },
    ];
    return (
        <View style={styles.container}>

            <FlatList
                keyExtractor={(item) => item.id}
                data={history}
                renderItem={({ item }) => (
                    <View style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        <TouchableOpacity style={styles.item}>
                        
                            <View style={{
                                flexDirection: 'row',
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <View style={{
                                    flexDirection: "column",
                                    display: "flex",
                                    gap: 10
                                }}>
                                    <Text style={styles.time}>{item.time}</Text>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>

                                <Text style={styles.money}>{item.money}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({


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
        marginStart: 70,
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

    },

    txtConsume: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
    },

    txtLine: {
        width: 85,
        height: 5,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },

    item: {
        marginTop: 24,
        padding: 20,
        backgroundColor: '#FFECE2',
        fontSize: 24,
        borderRadius: 10,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.55,
        shadowRadius: 4.84,
        elevation: 5,
        width: "98%"
    },

    time: {
        fontSize: 16,
        fontWeight: '400'
    },

    name: {
        fontSize: 16,
        fontWeight: '900',
    },

    money: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#F36767',
        fontSize: 16,
        marginTop: 10,
        textShadowColor: '#000',
    },
});
export default TransactionConsume;
