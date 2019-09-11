import React from 'react'
import theme from '../theme'
import t from '../locale/locale'
import Button from '../components/Button'
import Overlay from '../components/Overlay'
import Octagon from '../components/Octagon'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class AboutUs extends React.Component {
  render() {
    return (
      <View style={styles.cont}>
        <Overlay />
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo}/>
          <Text style={styles.description}>{t('motto')}</Text>
        </View>
        <Button title={t('callUs')} onPress={() => Linking.openURL('tel:+998998149094')}/>
        <View>
          <View style={styles.socialCont}>
            <SocialBtn url='https://www.instagram.com/yuz1app/' icon='instagram'/>
            <SocialBtn url='https://www.facebook.com/yuz1.admin' icon='facebook'/>
            <SocialBtn url='https://t.me/yuz1_app' icon='telegram-plane'/>
            <SocialBtn url='https://ok.ru/group/56240552542229' icon='odnoklassniki'/>
          </View>
          <Text style={styles.address}>{t('actualAddress')}</Text>
        </View>
      </View>
    )
  }
}

const SocialBtn = props => (
  <TouchableOpacity onPress={() => Linking.openURL(props.url)}>
    <Octagon size={2} backgroundColor={theme.palette.p.l}>
      <Icon name={props.icon} style={styles.socialIcon}/>
    </Octagon>
  </TouchableOpacity>
)

const dh = Dimensions.get('window').height

const styles = StyleSheet.create({
  socialIcon: {color: theme.palette.c.w, fontSize: 20},
  logo: {width: 60, height: 60, borderRadius: 10, marginBottom: '5%'},
  socialCont: {width: '90%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'},
  address: {fontSize: 14, fontWeight: '300', color: theme.palette.p.l, marginTop: 20, textAlign: 'center'},
  cont: {width: '100%',marginTop: '5%',alignItems: 'center', justifyContent: 'space-between', height: '60%'},
  description: {fontSize: 26, fontWeight: '200', color: theme.palette.c.g, paddingHorizontal: 10, textAlign: 'center'},
})