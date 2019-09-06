import React from 'react'
import theme from '../theme'
import { observer } from 'mobx-react'
import { View, StyleSheet, Dimensions } from 'react-native'

export default Overlay = observer(props => (
  <View style={styles.cont}>
    <View style={styles.overlay}/>
    <View style={[styles.overlay, {left: dw*0.4}]}/> 
  </View>
))

const dw = Dimensions.get('window').width
const dh = Dimensions.get('window').height

const styles = StyleSheet.create({
  overlay: {
    width: dw,
    height: dw,
    left: dw*0.1,
    bottom: -220,
    opacity: 0.5,
    position: 'absolute',
    borderTopEndRadius: dw*0.5,
    transform: [{rotate: '-30deg'}],
    backgroundColor: theme.palette.p.l,
  },
  cont: {width: dw, height: dh, position: 'absolute'},
})
