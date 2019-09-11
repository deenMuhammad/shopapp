import theme from '../theme'
import React, { Component } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

export default class Spinner extends Component {
  state = {rotation: new Animated.Value(0)}
  componentDidMount() {
    Animated.loop(
      Animated.timing(
        this.state.rotation,
        {toValue: 360, duration: 600, easing: Easing.linear, useNativeDriver: true},
      )
    ).start()
  }
  render() {
    const computed = {
      width: this.props.size || 26,
      height: this.props.size*0.42 || 26*0.42,
      borderColor: this.props.color || theme.palette.p.l
    }
    const computedCont = {width: this.props.size || 26, height: this.props.size || 26}
    const degree = this.state.rotation.interpolate({inputRange: [0, 360], outputRange: ['0deg', '360deg']})
    return (
      <View style={[this.props.fill && styles.cont, this.props.style]}>
        <Animated.View style={[computedCont, {transform: [{rotate: degree}]}]}>
          <View style={styles.shape}>
            <View style={[styles.bar, computed]}/>
            <View style={[styles.flat, computed]}/>
            <View style={[styles.left, computed]}/>
            <View style={[styles.right, computed]}/>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const common = {top: 0, left: 0,  borderWidth: 1, borderRadius: 0,  borderRadius: 1, position: 'absolute'}

const styles = StyleSheet.create({
  bar: {...common},
  flat: {...common, transform: [{rotate: '90deg'}]},
  left: {...common, transform: [{rotate: '-45deg'}]},
  right: {...common, transform: [{rotate: '45deg'}]},
  shape: {marginTop: '29%', alignItems: 'center', justifyContent: 'center'},
  cont: {flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -30},
})