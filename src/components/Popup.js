import React from 'react'
import theme from '../theme'
import { observer } from 'mobx-react'
import { AlertContainer } from './Alert'
import { observable, action } from 'mobx'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Modal, View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'

const popup = observable({visible: false})
export const togglePopup = action(() => popup.visible = !popup.visible)

export default observer(class Popup extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          transparent
          hardwareAccelerated
          animationType='slide'
          visible={popup.visible}
          onRequestClose={() => {}}
        >
          <PopupContentContainer onPress={() => popup.visible = false}>
            {this.props.content}
          </PopupContentContainer>
          <AlertContainer/>
        </Modal>
        {this.props.children}
      </View>
    )
  }
})

export const PopupContentContainer = props => (
<<<<<<< HEAD
  <SafeAreaView style={[styles.cont, props.style]}>
=======
  <SafeAreaView style={styles.cont}>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    <ScrollView scrollEnabled={false} contentContainerStyle={{flex: 1}}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.closerCont}>
          {props.additionalComponent}
          <Icon name='close' style={styles.closer}/>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>{props.children}</View>
    </ScrollView>
  </SafeAreaView>
)

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  closerCont: {
    opacity: 0.9,
    width: dw*0.12,
    borderWidth: 1,
    height: dw*0.10,
    marginLeft: dw*0.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: dw*0.06,
    borderColor: theme.palette.p.m,
    borderBottomLeftRadius: dw*0.06,
    backgroundColor: theme.palette.c.w,
  },
  content: {flex: 1},
  closer: {fontSize: 20, color: theme.palette.p.m},
  cont: {flex: 1, backgroundColor: 'rgba(255,255,255,0.9)'},
})