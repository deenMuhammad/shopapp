import React from 'react'
import theme from '../theme'
import { observer } from 'mobx-react'
import Spinner from '../components/Spinner'
import { View, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'
import { currentLang } from '../locale/locale'

export default observer(class Privacy extends React.Component {
  getLang = () => {
    let lang = currentLang.get()
    if(lang !== null) {
      if(lang === 'uzc') {
        return 'uz'
      }else return lang
    }else return 'en'
  }
  render() {
    return (
      <View style={{flex: 1}}>
<<<<<<< HEAD
=======
        <StatusBar barStyle='dark-content' backgroundColor={theme.palette.c.w}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        <WebView
          startInLoadingState
          renderLoading={() => <Spinner fill/>}
          source={{
            uri: this.props.navigation.state.params ? (
              this.props.navigation.state.params.url
            ) : (
              `https://yuz1.org/privacy/${this.getLang()}`
            )
          }}
        />
      </View>
    )
  }
})