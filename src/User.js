import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'

class User {
  constructor() {
    this.token = observable.box(null)
    this.username = observable.box(null)
    
    AsyncStorage.getItem('teliera:token')
      .catch(err => this.token.set(JSON.parse(null))) 
      .then(token => this.token.set(JSON.parse(token))) 
    AsyncStorage.getItem('teliera:username')
      .catch(err => this.token.set(JSON.parse(null))) 
      .then(username => this.username.set(JSON.parse(username))) 
  }

  get = property => this[property].get()

  set = action(async (token, username, callback) => {
    await AsyncStorage.setItem('teliera:token', JSON.stringify(token))
    await AsyncStorage.setItem('teliera:username', JSON.stringify(username))
    this.token.set(token)
    this.username.set(username)
    callback()
  })
}

export default new User