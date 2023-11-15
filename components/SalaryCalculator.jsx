import { Dimensions, Pressable, ScrollView, StyleSheet } from "react-native"
import { COLORS } from "../constants"
import { TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import NetToGross from "./NetToGross"
import GrossToNet from "./GrossToNet"

const { useEffect } = require("react")
const { View } = require("react-native")
const { default: STYLE } = require("../assets/css/universal")
const { Text } = require("react-native")

const SalaryCalculator = ({navigation}) => {
    useEffect(() => {
        navigation.getParent()?.setOptions(
            {
                tabBarStyle: {
                    display: "none"
                }
            }
        )
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: STYLE.tabBarStyle
          });
    }, [navigation])
    const Tab = createMaterialTopTabNavigator()
    return (
        <View style={{height: '100%'}}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarStyle: STYLE.headerWrap
                        }}
                    >
                        
                         <Tab.Screen
                         name='Gross to Net' component={GrossToNet}
                            options={{
                        title: "Net to Gross",
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{
                                color: focused ? 'black' : 'gray', fontSize: 16, fontFamily: "Rubik"
                            }}>
                                Gross to Net
                            </Text>
                        ),

                        tabBarIndicatorStyle: {
                            display: 'none',
                            width: 30,
                            height: 5,
                            left: ((Dimensions.get('window').width / 1 - 30) / 1),
                            backgroundColor: '#000',


                        },
                        tabBarIndicatorContainerStyle: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',


                        }

                    }}
                         />
                    </Tab.Navigator>
                
            
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

export default SalaryCalculator