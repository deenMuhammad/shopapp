import React from 'react'
import theme from '../theme'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text, Dimensions, StyleSheet, Animated } from 'react-native'

export default observer(class Empty extends React.Component {
  state = { z: new Animated.Value(0), a: new Animated.Value(0) }
  componentDidMount = () => {
    Animated.parallel([
      Animated.spring(this.state.z, {toValue: 1, useNativeDriver: true}),
      Animated.spring(this.state.a, {toValue: 1, useNativeDriver: true})
    ]).start()
  }
  render() {
    return (
      <Animated.View style={[styles.cont, {opacity: this.state.a, transform: [{scale: this.state.z}]}]}>
        <Icon name='earlybirds' style={styles.icon}/>
        <Text style={styles.text}>{t('noItemsHere')}</Text>
      </Animated.View>
    )
  }
})

const dw = Dimensions.get('screen').width

const styles = StyleSheet.create({
  cont: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontWeight: '300', fontSize: 20, color: theme.setOpacity(theme.palette.p.l, 0.7)},
  icon: {fontSize: dw*0.25, color: theme.setOpacity(theme.palette.p.l, 0.7), marginBottom: 20},
})