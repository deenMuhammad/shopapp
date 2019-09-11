import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'

import en from './languages/en'
import uz from './languages/uz'
import ru from './languages/ru'
import uzc from './languages/uzc'

export const currentLang = observable.box('en')
AsyncStorage.getItem('teliera:currentLanguage', action((error, lang) => {
  if(error)
    currentLang.set('en')
  else
    currentLang.set(lang)
}))


export const changeLanguage = action((l) => {
  AsyncStorage.setItem('teliera:currentLanguage', l)
  currentLang.set(l)
})

const lang = observable({ 
  t: l => {
    let tmp = ''

    if('en' === currentLang.get()) tmp =  en[l]
    else if('uz' === currentLang.get()) tmp =  uz[l]
    else if('ru' === currentLang.get()) tmp =  ru[l]
    else if('uzc' === currentLang.get()) tmp =  uzc[l]
    else tmp = en[l]

    return tmp || `.${l}`
  },
})

export default lang.t