import React from 'react'
import User from '../User'
import Alert from './Alert'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Input from '../components/Input'
import Button from '../components/Button'
import { withApollo } from 'react-apollo'
import { togglePopup } from '../components/Popup'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const SIGNUP_QUERY = gql`
mutation signUp($username: String!, $password: String!) {
  signUpWithPassword(username: $username, password: $password)
}`

export default observer(withApollo(class Signup extends React.Component {
  state = { username: '', password: '', rePassword: '', loading: false}

  handleSignUp = () => {    
    if(this.state.username === '' || this.state.password === '')
      Alert(t('noEmptyFields'))
    else if(this.state.password !== this.state.rePassword)
      Alert(t('passwordsUnmatch'))
    else this.setState({loading: true}, () => this.props.client.mutate({
      mutation: SIGNUP_QUERY, variables: {username: this.state.username, password: this.state.password}
    }).then(res => this.setState({loading: false},
      () => User.set(res.data.signUpWithPassword, this.state.username, togglePopup)))
    .catch(err => this.setState({loading: false}, () => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))))
  }

  render() {
    return (
      <View style={styles.cont}>
        <Text style={styles.title}>{t('signup').toUpperCase()}</Text>
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
        <Input
          secureTextEntry
          style={styles.input}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          value={this.state.rePassword}
          placeholder={t('rePassword').toLowerCase()}
          onChangeText={rePassword => this.setState({rePassword})}
        />
        <Button
          title={t('signup')}
          style={styles.button}
          onPress={this.handleSignUp}
          loading={this.state.loading}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('alreadyHaveAccount')}?</Text>
          <Button text title={t('login')} onPress={this.props.onToggle}/>
        </View>
      </View>
    )
  }
}))

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {width: dw*0.5, marginVertical: 10},
  cont: {width: '100%', alignItems: 'center'},
  button: {width: dw*0.53, marginVertical: 15},
  footerText: {color: theme.palette.c.g, marginLeft: 20},
  footer: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  title: {fontSize: 26, marginBottom: 50, fontWeight: '300', color: theme.palette.p.m},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%'},
})