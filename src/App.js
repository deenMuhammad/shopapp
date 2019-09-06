import React from 'react'
import User from './User'
import Root from './Router'
import Auth from './screens/Auth'
import { observer } from 'mobx-react'
import Popup from './components/Popup'
<<<<<<< HEAD
import { YellowBox, View, Image, Dimensions } from 'react-native'
=======
import { YellowBox } from 'react-native'
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { API_URL } from 'react-native-dotenv'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { AlertContainer } from './components/Alert'
import { InMemoryCache } from 'apollo-cache-inmemory'
import SplashScreen from 'react-native-splash-screen'

YellowBox.ignoreWarnings(['source.uri', 'Task orphaned', 'Remote debugger'])

<<<<<<< HEAD
const httpLink = createHttpLink({ credentials: 'same-origin', uri: `https://yuz1.org/graphql` })

const authLink = setContext((_, { headers }) => (
  { headers: { ...headers, authorization: User.get('token') ? `${User.get('token')}` : '' } }
))

const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() })

class App extends React.Component {
  state = { splash: true }

  timer = null
  componentDidMount = () => {
    this.timer = setTimeout(() => {
      //SplashScreen.hide()
      this.setState({ splash: false })
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const dw = Dimensions.get('window').width

    if (this.state.splash) {
      return (
        <Image source={require('./assets/launch_screen.png')} style={{ width: 1, height: 1 }} />
      )
    } else {
      return (
        <ApolloProvider client={client}>
          <Popup content={<Auth />}>
            <Root />
          </Popup>
          <AlertContainer />
        </ApolloProvider>
      )
    }
=======
const httpLink = createHttpLink({credentials: 'same-origin', uri: `https://yuz1.org/graphql`})

const authLink = setContext((_, { headers }) => (
  {headers: {...headers, authorization: User.get('token') ? `${User.get('token')}` : ''}}
))

const client = new ApolloClient({link: authLink.concat(httpLink), cache: new InMemoryCache()})

class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide()
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Popup content={<Auth/>}>
          <Root />
        </Popup>
        <AlertContainer/>
      </ApolloProvider>
    )
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  }
}

export default observer(App)