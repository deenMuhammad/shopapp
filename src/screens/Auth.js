import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import {StyleSheet, Dimensions, Animated, UIManager, LayoutAnimation} from 'react-native'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export default class Auth extends React.Component {
  state = {keyboard: false, login: true, x: new Animated.Value(0)}
  toggle = () => {
    Animated.spring(this.state.x, {toValue: this.state.login ? -dw : 0}).start()
    this.setState({login: !this.state.login})
  }
  onKeyboardShow = () => this.setState({keyboard: true}, () => LayoutAnimation.easeInEaseOut())
  onKeyboardHide = () => this.setState({keyboard: false}, () => LayoutAnimation.easeInEaseOut())
  render() {
    const toggleStyle = {marginLeft: this.state.x}
    const keyboardAvoidingStyle = {justifyContent: this.state.keyboard ? 'flex-start' : 'center'}
    return (
      <Animated.View style={[styles.cont, keyboardAvoidingStyle]}>
        <Animated.View style={[styles.animated, toggleStyle]}>
          <Login onToggle={this.toggle} onFocus={this.onKeyboardShow} onBlur={this.onKeyboardHide}/>
          <Signup onToggle={this.toggle} onFocus={this.onKeyboardShow} onBlur={this.onKeyboardHide}/>
        </Animated.View>
      </Animated.View>
    )
  }
}

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  cont: {flex: 1},
  animated: {flexDirection: 'row', width: '100%'},
})