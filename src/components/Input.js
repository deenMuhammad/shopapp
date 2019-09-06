import React from 'react'
import theme from '../theme'
import { StyleSheet, TextInput } from 'react-native'

export default props => (
  <TextInput
    {...props}
<<<<<<< HEAD
    autoFocus={props.autoFocus == true ? true: false}
=======
    autoFocus={false}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    autoCorrect={false}
    enablesReturnKeyAutomatically
    placeholderTextColor='#a1a1a1'
    textBreakStrategy='highQuality'
    style={[styles.input, props.style]}
    underlineColorAndroid='transparent'
    autoCapitalize={props.autoCapitalize || 'none'}
    clearButtonMode={props.clearButtonMode || 'while-editing'}
  />
)

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 2,
    borderBottomWidth: 1,
    color: theme.palette.p.m,
    borderBottomColor: theme.palette.p.l,
  }
})