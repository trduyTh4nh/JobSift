import ActionSheet, { SheetManager, SheetProps } from "react-native-actions-sheet"
import STYLE from "../assets/css/universal"
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import { ScrollView } from "react-native-gesture-handler"
import Icon from 'react-native-remix-icon'
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../ipConfig"
import { useNavigation } from "@react-navigation/native"
const RenderComponent = ({item, onClick}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{...style.cvWrap, borderColor: item ? item.isSelected ? '#E2F367' : '#B0B0B0' : '#B0B0B0'}}>
            <Text style={STYLE.textTitle}>{item?.cv_title ? item?.cv_title : 'CV không tên'}</Text>
            <View style={{ gap: 10 }}>
                <View style={style.CVDetailsSection}>
                    <Icon name="briefcase-4-line" />
                    <View>
                        <Text style={{ color: '#B0B0B0', fontSize: 12 }}>Loại</Text>
                        <Text style={{ fontSize: 18 }}>{item?.loai_cong_viec}</Text>
                    </View>
                </View>
                <View style={style.CVDetailsSection}>
                    <Icon name="user-2-line" />
                    <View>
                        <Text style={{ color: '#B0B0B0', fontSize: 12 }}>Vị trí</Text>
                        <Text style={{ fontSize: 18 }}>{item?.position}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const ApplySheet = (props) => {
    const user = global.user.user
    const [cvList, setCvAdded] = useState([])
    const [selectedCV, setSelected] = useState()
    useEffect(() => {
        axios.post(`http://${API_URL}:3001/getallcv/${user.id_user}`)
        .then((result) => {
            setCvAdded(result.data.result.map((object) => {
                if(object.cv_title){
                    return {...object, isSelected: false}
                }
                
            }))
        })
        .catch((error) => {
            console.log("ERROR: " + error)
        })
    }, [])
    const handleCVChoose = (item) => {
        setCvAdded(cvList.map((object) => {
            if(object.isSelected){
                return {...object, isSelected: false}
            }
            if(item == object)
                return {...object, isSelected: true}
            return {...object, isSelected: false}
        }))
        setSelected(item)
    }
    const handleApply = () => {
        console.log(props.payload)
        axios.post(`http://${API_URL}:3001/apply/`, {
            "idcv": selectedCV.id_cv,
            "id_post": props.payload?.id_post,
            "id_user": user.id_user
        }).then(e => {
            SheetManager.hide(props.sheetId, {
                payload: {
                    type: 'Apply',
                    data: selectedCV
                }
            })
        }).catch(e => {
            Alert.alert("Lỗi khi ứng tuyển", e)
        })
    }
    const handleCreateCV = () => {
        SheetManager.hide(props.sheetId, {
            payload: {
                type: 'CreateCV'
            }
        })
    }
    return(
        <ActionSheet onClose={() => {}} gestureEnabled>
            <View style={{...STYLE.modalChild, paddingBottom: 16}}>
                <Text style={{...STYLE.textTitle, fontSize: 25}}>{props.payload?.title}</Text>
                <Text style={STYLE.textTitle}>Chọn CV</Text>
                <ScrollView style={{maxHeight: 400}}>
                    <FlatList
                        data={cvList}
                        renderItem={({item}) => (<RenderComponent onClick={() => handleCVChoose(item)} item={item}/>)}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => (<View style={{height: 10}}></View>)}
                    />
                </ScrollView>
                <View style={{gap: 16}}>
                    <TouchableOpacity onPress={handleCreateCV} style={style.buttonStyle}>
                        <Text>Tạo CV</Text>
                        <View style={style.priceTag}>
                            <Text>💎 20</Text>
                            <Icon name="arrow-right-s-line"/>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        {
                            selectedCV ? (
                                <TouchableOpacity onPress={handleApply} style={{...style.buttonStyle, flex: 1}}>
                                    <Text>Ứng tuyển</Text>
                                    <View style={style.priceTag}>
                                        <Text>💎 10</Text>
                                        <Icon name="arrow-right-s-line"/>
                                    </View>
                                </TouchableOpacity>
                            ) : ''
                        }
                        <TouchableOpacity onPress={() => {
                            SheetManager.hide(props.sheetId)
                        }} style={{...style.buttonStyle, backgroundColor: '#E9E9E9', flex: selectedCV ? 0 : 1}}>
                            <Text>Huỷ</Text>
                            <View style={style.priceTag}>
                                <Icon name="close-line"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ActionSheet>
    )
}
const style = StyleSheet.create({
    cvWrap: {
        gap: 16,
        borderColor: '#B0B0B0',
        borderWidth: 2,
        padding: 20,
        borderRadius: 16,
        gap: 10,
    },
    priceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
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
    CVDetailsSection: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})
export default ApplySheet