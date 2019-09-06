import {
  View,
  Text,
  Easing,
  Animated,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import theme from '../theme'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

const dw = Dimensions.get('window').width
const dh = Dimensions.get('window').height

const popup = observable({message: '', visible: false})

export default action(m => {
  popup.message = m
  popup.visible = true
})

export const AlertContainer = observer(() => popup.visible && <Container />)

class Container extends React.Component {
  state = {y: new Animated.Value(dh*0.4), a: new Animated.Value(0)}
  componentDidMount = () => this.show()
  componentDidUpdate = () => this.show()
  show = () => Animated.parallel([
    Animated.timing(this.state.y, {toValue: 0, duration: 200, easing: Easing.linear, useNativeDriver: true}),
    Animated.timing(this.state.a, {toValue: 0.7, duration: 200, easing: Easing.linear, useNativeDriver: true})
  ]).start()
  hide = () => Animated.parallel([
    Animated.timing(this.state.a, {toValue: 0, duration: 200, easing: Easing.easeOut, useNativeDriver: true}),
    Animated.timing(this.state.y, {toValue: dh*0.4, duration: 200, easing: Easing.linear, useNativeDriver: true}),
  ]).start(() => popup.visible = false)
  render() {
    return (
      <View style={styles.cont}>
        <Animated.View style={[styles.overlay, {backgroundColor: '#000', opacity: this.state.a}]}/>
        <TouchableOpacity activeOpacity={1} style={styles.overlay} onPress={this.hide}/>
        <Animated.View style={[styles.alertCont, {transform: [{translateY: this.state.y}]}]}>
          <TouchableOpacity style={styles.closerCont} onPress={this.hide}>
            <View style={styles.closer}/>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.info}>
            <Text style={styles.infoText}>{popup.message}</Text>
          </ScrollView>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  alertCont: {
    width: dw,
    opacity: 0.9,
    minHeight: dh*0.15,
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
    backgroundColor: theme.palette.c.w,
  },
  info: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : -20,
  },
  overlay: {width: dw, height: dh, position: 'absolute'},
<<<<<<< HEAD
  cont: {width: dw, height: dh, position: 'absolute', justifyContent: 'flex-end', bottom: 0},
=======
  cont: {width: dw, height: dh, position: 'absolute', justifyContent: 'flex-end'},
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  infoText: {fontSize: 16, fontWeight: '100', color: theme.palette.p.m, textAlign: 'center'},
  closerCont: {width: dw, alignItems: 'center', justifyContent: 'center', position: 'absolute'},
  closer: {width: 40, height: 4, borderRadius: 30, marginTop: 10, marginBottom: 5, backgroundColor: '#ccc'},
})