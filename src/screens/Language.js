import React from 'react'
import theme from '../theme'
import { observer } from 'mobx-react'
import Overlay from '../components/Overlay'
import Octagon from '../components/Octagon'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { changeLanguage, currentLang } from '../locale/locale'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'

const langs = [
  {title: 'English', flag: require('../assets/flags/en.png'), lang: 'en'},
  {title: 'Русский', flag: require('../assets/flags/ru.png'), lang: 'ru'},
  {title: 'Ўзбекча', flag: require('../assets/flags/uz.png'), lang: 'uzc'},
  {title: 'O\'zbekcha', flag: require('../assets/flags/uz.png'), lang: 'uz'},
]

export default observer(class Language extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Overlay />
        <ScrollView contentContainerStyle={styles.cont}>
          <View style={[styles.bar, {width: '80%'}]}/>
          {langs.map(lang => (
            <Lang
              {...lang}
              key={lang.title}
              onPress={() => {
                changeLanguage(lang.lang)
                this.props.navigation.popToTop()
              }}
              selected={lang.lang === (currentLang.get() || 'en')}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
})

const Lang = props => (
  <View style={styles.buttonCont}>
    <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.7}>
      {/* <Octagon backgroundColor={theme.palette.p.l}> */}
        <Image source={props.flag} style={styles.flag} resizeMode='cover'/>
      {/* </Octagon> */}
      <Text style={styles.text}>{props.title}</Text>
      {props.selected && <Icon style={styles.icon} name='check-double'/>}
    </TouchableOpacity>
    <View style={styles.bar}/>
  </View>
)

const styles = StyleSheet.create({
  buttonCont: {width: '80%'},
  cont: {flexGrow: 1, alignItems: 'center', justifyContent: 'center'},
  button: {paddingVertical: 10, alignItems: 'center', flexDirection: 'row'},
  icon: {right: 0, fontSize: 16, position: 'absolute', color: theme.palette.p.l},
  bar: {height: 0.5, opacity: 0.5, width: '100%', backgroundColor: theme.palette.c.g},
  text: {fontSize: 16, marginLeft: '5%', fontWeight: '500', color: theme.palette.c.g},
  flag: {width: 36, height: 36, borderWidth: 1, borderColor: theme.palette.c.w, borderRadius: 18},
})