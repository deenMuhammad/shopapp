import React from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native'

//Slider ietm component
export default SliderItem = (props) => (
    <TouchableOpacity activeOpacity={1} style={styles.sliderItemPanel} onPress={() => props.push('SingleShop', 
    { 
        Shop: {
            _id: props.value.shop 
        }
    })}>
        <Image resizeMode="cover" source={{uri: props.value.images[0]}} style={styles.sliderItemPanelImage}/>
    </TouchableOpacity>
)

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
    sliderItemPanel: {
        width: dw - 10,
        height: (dw - 10)*3/5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 3,
        overflow: 'hidden'
    },
    sliderItemPanelImage: {
        width: dw - 10,
        height: (dw - 10)*3/5,
    }
});