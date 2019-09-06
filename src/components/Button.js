import React from 'react'
import theme from '../theme'
import LinearGradient from 'react-native-linear-gradient'
import {StyleSheet, View, Text, TouchableOpacity, Animated, Easing} from 'react-native'
import Spinner from './Spinner';

export default class Button extends React.Component {
  state = {z: new Animated.Value(1)}
  animate = () => {
    Animated.sequence([
      Animated.timing(this.state.z, {toValue: 0.9, duration: 50, useNativeDriver: true}),
      Animated.timing(this.state.z, {toValue: 1, duration: 50, easing: Easing.ease, useNativeDriver: true})
    ]).start(this.props.onPress && this.props.onPress)
  }
  render() {
    const props = this.props
    return (
      <TouchableOpacity onPress={this.animate} activeOpacity={1}>
        <Animated.View style={{transform: [{scale: this.state.z}]}}>
          {(() => {
            if(props.fill) {
              return (
                <LinearGradient style={[styles.button, props.style]} colors={[theme.palette.p.l, theme.palette.p.d]}>
                  {props.loading ? (
                    <Spinner size={15} color={theme.palette.c.w} style={styles.text}/>
                  ) : (
                    <BtnTxt style={{color: theme.palette.c.w}}>{props.title}</BtnTxt>
                  )}
                </LinearGradient>
              )
            }else if(props.text) {
              return (
                <View style={[styles.textButton, props.style]}>
                  {props.loading ? (
                    <Spinner size={15} style={styles.text}/>
                  ) : (
                    <BtnTxt style={{color: theme.palette.p.m}}>{props.title}</BtnTxt>
                  )}
                </View>
              )
            }else {
              return (
                <View style={[styles.outlinedButton, props.style]}>
                  {props.loading ? (
                    <Spinner size={15} style={styles.text}/>
                  ) : (
                    <BtnTxt style={{color: theme.palette.p.m}}>{props.title}</BtnTxt>
                  )}
                </View>
              )
            }
          })()}
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const BtnTxt = props => <Text style={[styles.text, props.style]}>{props.children}</Text>

const common = {borderRadius: 500, alignItems: 'center', justifyContent: 'center'}

const styles = StyleSheet.create({
  button: {
    ...common,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.palette.p.m,
    backgroundColor: theme.palette.p.m,
  },
  textButton: {...common},
  text: {paddingVertical: 12, paddingHorizontal: 15},
  outlinedButton: {...common, borderWidth: 1, borderColor: theme.palette.p.m},
})