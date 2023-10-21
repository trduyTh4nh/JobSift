import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native"
import { COLORS } from "../constants"
import { TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import STYLE from "../assets/css/universal"
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import Icon from "react-native-remix-icon"
const GrossToNet = ({navigation}) => {
    const [data, setData] = useState(0)
    const [dependent, setDependent] = useState(0)
    const [result, setResult] = useState(0)
    const [taxedSalary, setTaxedSalary] = useState(0)
    const [taxedSalaryDisplay, setTaxedSalaryDisplay] = useState('0')
    const [error, setError] = useState({type: 'normal', message: ''})
    const handleUp = () => {
        setDependent(prev => { 
            return prev + 1
        })
    }
    useEffect(() => {
        handleSalaryEnter(data)
    }, [dependent])
    const handleCalculate = () => {
        let temp = taxedSalary
        const ensurance = data * 0.105
        let taxPercentage = 0
        while(temp > 0){
            if(temp > 80000000){
                taxPercentage = .35
                temp -= 80000000
            } else if(temp > 52000000){
                taxPercentage = .3
                temp -= 80000000
            } else if(temp > 32000000){
                taxPercentage = .25
                temp -= 52000000
            } else if(temp > 18000000){
                taxPercentage = .2
                temp -= 32000000
            } else if(temp > 10000000){
                taxPercentage = .15
                temp -= 18000000
            } else if(temp > 5000000){
                taxPercentage = .1
                temp -= 10000000
            } else {
                taxPercentage = .05
                temp -= 5000000
            }
        }
            setResult((data - ensurance - (data * taxPercentage)).toLocaleString())
            console.log(result)
    }
    useEffect(() => {
        handleCalculate()
    }, [taxedSalary])
    const handleDown = () => {
        if(dependent > 0){
            setDependent((dependent-1))
        }
    }
    const handleSalaryEnter = (e) => {
        const salary = Number(e)
        if(isNaN(salary)){
            setError({type: 'nan', message: 'Not a number'})
            return
        }
        if(salary < 0){
            setError({type: 'negative', message: 'Salary cannot be negative'})
            return
        }
        if(salary > 10000000000){
            setError({type: 'too rich',message: 'Salary cannot be over 10 billion VND'})
            return
        }
        setError({type: 'normal', message: ''})
        setData(salary)
        const result = salary - (salary * .105) - (dependent * 4400000)
        setTaxedSalary(result)
        if(result < 0){
            setTaxedSalaryDisplay("0")
            return
        }
        setTaxedSalaryDisplay((Math.round(result)).toLocaleString())
        const salaryAfterInsurance = salary * .105
    }
    return (
        <View style={{height: '100%'}}>
            <ScrollView style={{...STYLE.body, paddingTop: 16, gap: 16}}>
                <View style={{gap: 16}}>
                    <View>
                        <Text>Salary</Text>
                        <View>
                            <View style={error.type == 'normal' ? {...style.inputSearch} : {...style.inputSearch, backgroundColor: '#FFC2C2'}}>
                                <TextInput onChangeText={(e) => handleSalaryEnter(e)} placeholder="Enter amount" placeholderTextColor={'rgba(0,0,0,0.2)'} keyboardType="numeric" style={style.input}/>
                                <TouchableOpacity>
                                    <Icon name="ri-question-line"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            error.type != 'normal' ?
                            (
                                <Text>{error.message}</Text>
                            ) : ('')
                        }
                        </View>
                    <View>
                        <Text>Dependent people</Text>
                        <View>
                            <View style={{...style.inputSearch, width: '45%'}}>
                                <TouchableOpacity onPress={handleDown}>
                                    <Icon name="arrow-left-s-line"/>
                                </TouchableOpacity>
                                <TextInput value={dependent.toString()} placeholder="Enter amount" placeholderTextColor={'rgba(0,0,0,0.2)'} keyboardType="numeric" style={{...style.input, flex: 0}}/>
                                <TouchableOpacity onPress={handleUp}>
                                    <Icon name="arrow-right-s-line"/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="ri-question-line"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>Additional Information</Text>
                        <View style={{...style.inputSearch, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto', padding: 10, gap: 5}}>
                            <Text style={{...STYLE.textBold, fontSize: 20}}>Insurance: 10.5%</Text>       
                            <Text>Social insurance: 8%</Text>
                            <Text>Health insurance: 1.5%</Text>
                            <Text>Unemployment insurance: 1%</Text>
                        </View>
                    </View>
                    <View style={{...style.inputSearch, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto', padding: 10, gap: 5}}>
                            <Text style={{...STYLE.textBold, fontSize: 20}}>Taxed salary: {taxedSalaryDisplay} VND</Text>       
                    </View>
                </View>
            </ScrollView>
            
            <View style={style.bottomBarWrap}>
                <View style={style.bar}>
                    <View style={style.rowWrap}>
                        <Text style={style.textCalc}><Text style={{color: '#fff'}}>{result}</Text> VND</Text>
                        <Text style={style.textWhite}>Net salary</Text>
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
    calculateBtn: {
        padding: 10,
        paddingLeft: 18,
        paddingRight: 18,
        backgroundColor: '#E2F367',
        borderRadius: 50
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
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop:5,

       
       
        // fontFamily: 'RukbikNormal'

    },
    input: {
        flex: 1,
        
    },
 })
 export default GrossToNet