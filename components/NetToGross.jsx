import { Pressable, ScrollView, StyleSheet } from "react-native"
import { COLORS } from "../constants"
import { TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import STYLE from "../assets/css/universal"
import { View, Text } from "react-native"

const NetToGross = ({navigation}) => {
    return (
        <View style={{height: '100%'}}>
            <ScrollView style={{...STYLE.body, paddingTop: 16}}>
                <View style={{paddingBottom: 100}}>
                    <Text>1</Text>
                </View>
            </ScrollView>
            
            <View style={style.bottomBarWrap}>
                <View style={style.bar}>
                    <View style={style.rowWrap}>
                        <Text style={style.textCalc}><Text style={{color: '#fff'}}>0</Text> VND</Text>
                        <Text style={style.textWhite}>Gross salary</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{...style.textCalc}}>See details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
} 
const style = StyleSheet.create({
    bottomBarWrap: {
     position: 'absolute',
     bottom: 0,
     width: '100%',
    },
    bar: {
     ...STYLE.tabBarStyle,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingLeft: 20,
     paddingRight: 20,
    },
    textCalc: {
     ...STYLE.textBold,
     color: '#E2F367'
    },
    textWhite: {
     ...STYLE.textBold,
     color: '#fff'
    },
    rowWrap: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 10
    }
 })
 export default NetToGross