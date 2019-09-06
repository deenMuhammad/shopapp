import React from 'react'
import theme from '../theme'
import {StyleSheet, Dimensions, View, Platform} from 'react-native'

const radius = 5
const dw = Dimensions.get('window').width

export default props => {
  const computed = {
    width: dw/(11 - (props.size || 3)),
    height: (dw/(11 - (props.size || 3))) * 0.4141999 + radius
  }
  const computedCont = {
    width: dw/(11 - (props.size || 3)),
    height: (dw/(11 - (props.size || 3)))
  }
  const bgColor = {
    backgroundColor: props.backgroundColor
      || ((props.android && Platform.OS !== 'ios') && '#f1f1f1')
      || theme.palette.c.w,
  }
  return (
    <View style={[styles.octagon, computedCont, props.style]}>
      <View style={styles.shape}>
        <View
          style={[
            styles.bar, computed, bgColor,
          ]}
        />
        <View style={[styles.flat, styles.bar, computed, bgColor]}/>
        <View style={[styles.left, styles.bar, computed, bgColor]}/>
        <View style={[styles.right, styles.bar, computed, bgColor]}/>
        <View style={styles.content}>{props.children}</View>
      </View>
    </View>
  )
}

const common = {top: 0, left: 0, position: 'absolute', borderRadius: radius}

const styles = StyleSheet.create({
  bar: {borderRadius: radius},
  flat: {...common, transform: [{rotate: '90deg'}]},
  left: {...common, transform: [{rotate: '-45deg'}]},
  right: {...common, transform: [{rotate: '45deg'}]},
  octagon: {alignItems: 'center', justifyContent: 'center'},
  content: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '-22.5deg'}],
  },
  shape: {
    elevation: 10,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowColor: '#777',
    position: 'absolute',
    transform: [{rotate: '22.5deg'}],
    shadowOffset: {width: 0, height: 5},
  },
})