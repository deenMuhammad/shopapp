import React from 'react'
import User from '../User'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import { togglePopup } from './Popup'
import Alert from '../components/Alert'
import Input from '../components/Input'
import { withApollo } from 'react-apollo'
import Button from '../components/Button'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const LOGIN_QUERY = gql`
query login($username: String!, $password: String!) {
  logInWithPassword(username: $username, password: $password)
}`

export default observer(withApollo(class Login extends React.Component {
  state = {username: '', password: '', loading: false}

  handleLogin = () => {
    this.setState({loading: true}, () => {
      this.props.client.query({
        query: LOGIN_QUERY, variables: {username: this.state.username, password: this.state.password}
      })
      .then(res => this.setState({loading: false}, () => {
        User.set(String(res.data.logInWithPassword), this.state.username, togglePopup)
      }))
      .catch(err => this.setState({loading: false}, 
        () => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))))
    })    
  }

  render() {
    return (
      <View style={styles.cont}>
        <Text style={styles.title}>{t('login').toUpperCase()}</Text>
        <Input
          style={styles.input}
          onBlur={this.props.onBlur}
          value={this.state.username}
          onFocus={this.props.onFocus}
          placeholder={t('username').toLowerCase()}
          onChangeText={username => this.setState({username})}
        />
        <Input
          secureTextEntry
          style={styles.input}
          onBlur={this.props.onBlur}
          value={this.state.password}
          onFocus={this.props.onFocus}
          placeholder={t('password').toLowerCase()}
          onChangeText={password => this.setState({password})}
        />
        <Button
          title={t('login')}
          style={styles.button}
          onPress={this.handleLogin}
          loading={this.state.loading}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('dontHaveAccount')}?</Text>
          <Button text title={t('signup')} onPress={this.props.onToggle}/>
        </View>
      </View>
    )
  }
}))

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {width: dw*0.5, marginVertical: 15},
  button: {width: dw*0.53, marginVertical: 15},
  footerText: {color: theme.palette.c.g, marginLeft: 20},
  cont: {width: '100%', alignItems: 'center', marginTop: 0},
  footer: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  title: {fontSize: 26, marginBottom: 50, fontWeight: '300', color: theme.palette.p.m},
})