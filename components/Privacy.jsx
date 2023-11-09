import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-remix-icon';
import { useFonts } from 'expo-font';
const Policy = () => {

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


    return (
        <ScrollView>
            <View>
                <View style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: 'space-evenly',
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                    width: "85%",
                    gap: 20

                }}>
                    <Icon name="shield-line" size={50}></Icon>
                    <Text style={{
                        fontFamily: "Rubik",
                        color: "#000",
                        fontSize: 18
                    }}>Danh sách quyền riêng tư của chúng tôi</Text>
                </View>


                <View style={{
                    padding: 14,
                }}>
                    <Text style={{
                        textAlign: "left",
                        fontFamily: "RukbikNormal",
                        fontSize: 15
                    }}>Lorem ipsum dolor sit amet consectetur. Cras ullamcorper morbi massa ut. In elit urna enim massa. Quisque enim suspendisse ridiculus nec euismod. Ullamcorper morbi ullamcorper sit est magnis est nunc in ornare.
                        Risus in sagittis amet eu. Pellentesque nisl at feugiat et sem. A blandit dignissim dignissim pellentesque lacus. Cursus mus velit ut dolor. In sit morbi egestas cursus enim massa. At purus mattis mollis lacus imperdiet mauris faucibus. Facilisis eget dictumst fermentum arcu aliquam pharetra enim pellentesque. Mi ullamcorper vel vitae in est urna eros. Integer pharetra quis lorem aliquet volutpat enim. Ipsum diam rhoncus sollicitudin arcu morbi nulla quam. Diam elit sagittis egestas proin integer sit habitant. A urna scelerisque iaculis nibh in velit quis.
                        Risus vulputate porttitor mauris nulla enim ornare ut ac. Blandit donec et amet faucibus est varius. In iaculis nunc tellus massa eu pretium commodo. Diam felis pellentesque nunc sed aliquam amet convallis. Rhoncus orci ridiculus pharetra turpis et nulla auctor aenean velit. Mi sed vitae sem platea sem.
                        Nec mi massa quam velit elementum. Sit non cras purus dolor. Mauris erat dignissim elit sit montes nec gravida. Vulputate et eros condimentum feugiat. Massa nibh amet nulla ullamcorper. Orci sit viverra auctor et massa nibh gravida lectus. Fermentum amet tincidunt urna etiam fringilla fermentum gravida libero. Faucibus egestas tristique aliquam mi at ut. Eget scelerisque in metus at imperdiet aliquam ac et. Lorem commodo non ut nullam fames vel senectus faucibus nunc. Mauris mi leo sed massa. Turpis ornare augue tristique vel leo phasellus nec tincidunt eget. Ullamcorper quam non diam commodo nec. Quis in donec sit nisi vulputate curabitur.
                        Dictumst suspendisse sollicitudin nulla bibendum quam lorem vitae nibh. Sit mauris et eu dolor congue risus aenean lectus tellus. Adipiscing faucibus mattis netus nisl augue turpis nec. Tristique sem id amet ultricies molestie auctor. Adipiscing quis netus tempor turpis mauris nunc bibendum. Suspendisse molestie sed iaculis lectus.</Text>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    img_txtpolicies: {
        flexDirection: 'row',
        marginTop: 12,
        marginStart: 5
    },

    imageButton: {
        width: 20,
        height: 20,
        marginTop: 30,
        marginStart: 25,
    },

    textPolicies: {
        position: 'absolute',
        fontSize: 35,
        marginStart: 75,
        marginTop: 13,
        fontWeight: '700',
        color: '#000000',
        fontfamily: 'Rubik-Bold',
    },

    privacy_legal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 60,
        marginTop: 25,
    },

    textPoli_imgLine: {
        flexDirection: 'column'
    },

    textPrivacy: {
        fontSize: 25,
        fontWeight: '800',
        color: '#000000',
    },

    imgLine: {
        width: 86,
        height: 5
    },

    textLegal: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '400',
        marginEnd: 60,
        marginTop: 10,
    },

    imgsheild_txtShield: {
        flexDirection: 'row',
        marginStart: 20,
        marginTop: 20,
        justifyContent: 'flex-start'
    },

    imgShield: {
        width: 60,
        height: 60,
    },

    txtShield: {
        fontSize: 30,
        fontWeight: '800',
        marginStart: 75,
        marginTop: 10,
        color: '#000000',
        position: 'absolute',
        fontfamily: 'Rubik-Bold',
    },
    longtxt: {
        textAlign: 'left',
        padding: 25,
        color: '#000000',
        fontSize: 20
    }
});
export default Policy