import Modal from 'react-native-modal'
import { FlatList, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import STYLE from '../assets/css/universal'
const { useState, useEffect } = require("react")

const PickerModal = ({ title, items, onItemSelected, isVisible, hideModal }) => {
    const [visible, setVisible] = useState(isVisible)
    useEffect(() => {
        setVisible(isVisible)
    }, [isVisible])
    const SelectItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {onItemSelected(item); setVisible(false); hideModal()}} style={style.item}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View style={style.wrapModal}>
            <Modal
                style={{margin: 0}}
                isVisible={visible}
                onBackdropPress={() => {setVisible(false); hideModal()}}
                onSwipeComplete={() => {setVisible(false); hideModal()}}
                swipeDirection={'down'}
            >
                <SafeAreaView style={style.modal}>
                    <View style={style.modalChild}>
                        <Text style={STYLE.textTitle}>{title}</Text>
                        <FlatList
                            data={items}
                            renderItem={({item}) => (<SelectItem item={item}/>)}
                            ItemSeparatorComponent={() => (<View style={{height: 16}}/>)}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}


const style = StyleSheet.create({
    item: {
        padding: 16,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 16
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
        backgroundColor: '#fff',
    },
    modalChild: {
        maxHeight: '75vh',
        padding: 24,
        paddingBottom: 0,
        gap: 16
    },
})
export default PickerModal