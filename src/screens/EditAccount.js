import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Input from '../components/Input'
import Alert from '../components/Alert'
import Button from '../components/Button'
import { withApollo } from 'react-apollo'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  View, Text, StyleSheet, ScrollView, StatusBar, Dimensions, UIManager, LayoutAnimation, TouchableOpacity 
} from 'react-native'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const GET_REGIONS = gql`query getRegions {getRegions}`

const GET_USER_INFO_QUERY = gql`query getUserInfo { getUserInfo { username, name, phone, address {region, district, other} }}`

const MODIFY_USER_QUERY = gql`
mutation modifyUser($name: String!, $phone: String, $address: InputAddress, $username: String!, $password: String!){
  modifyUserAccount(name: $name, phone: $phone, address: $address, username: $username, password: $password)
}`

export default observer(withApollo(class EditAccount extends React.Component {
  state = {
    loading: false,
    keyboard: false,
    loadingInfo: false,
    name: '',
    phone: '',
    username: '',
    password: '',
    rePassword: '',
    defaultName: '',
    defaultPhone: '',
    defaultUsername: '',
    address: {region: '', district: '', other: ''},
    defaultAddress: {region: '', district: '', other: ''},

    regions: [],
  }

  componentDidMount = () => {
    this.setState({loadingInfo: true}, () => this.getUserInfo(() => this.getRegions()))
  }

  getRegions = () => {
    this.props.client.query({fetchPolicy: 'no-cache', query: GET_REGIONS})
    .then(res => this.setState({regions: JSON.parse(res.data.getRegions), loadingInfo: false}))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  getUserInfo = callback => {
    this.props.client.query({fetchPolicy: 'no-cache', query: GET_USER_INFO_QUERY})
    .then(res => {
      this.setState({
        defaultName: res.data.getUserInfo.name || '',
        defaultPhone: res.data.getUserInfo.phone || '',
        defaultUsername: res.data.getUserInfo.username || '',
        address: res.data.getUserInfo.address || {region: '', district: '', other: ''},
        defaultAddress: res.data.getUserInfo.address || {region: '', district: '', other: ''},
      }, callback)
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  handleModification = () => {
    const { username, name, phone, address, password, rePassword } = this.state
    if(password !== '' && password !== rePassword)
      Alert(t('passwordsUnmatch'))
    else {
      this.setState({loading: true}, () => {
        this.props.client.mutate({
          mutation: MODIFY_USER_QUERY,
          variables: {
            name: name, phone: phone, password: password, username: username, 
            address: {region: address.region, district: address.district, other: address.other},
          },
        })
        .then(res => this.setState({loading: false}, () => {
          if(res.data.modifyUserAccount)
            this.props.navigation.goBack(null)
        }))
        .catch(err => this.setState({loading: false},
          () => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))))
      })
    }
  }

  handleKeyboard = () => {
    LayoutAnimation.easeInEaseOut()
    this.setState({keyboard: !this.state.keyboard})
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: theme.palette.c.w}}>
        <ScrollView 
          directionalLockEnabled
          keyboardDismissMode='on-drag'
          contentContainerStyle={[styles.cont, {marginTop: this.state.keyboard ? '-50%' : '0%'}]}
        >
          <Text style={styles.separator}>{t('accountInfo')}</Text>
          <StyledInput
            icon='pen'
            autoCapitalize='none'
            value={this.state.username}
            onChangeText={username => this.setState({username})}
            placeholder={this.state.defaultUsername || t('username')}
          />
          <StyledInput
            icon='user-edit'
            value={this.state.name}
            autoCapitalize='sentences'
            onChangeText={name => this.setState({name})}
            placeholder={this.state.defaultName || t('name')}
          />
          <StyledInput
            icon='phone'
            autoComplete='tel'
            keyboardType='phone-pad'
            value={this.state.phone}
            autoCapitalize='sentences'
            onChangeText={phone => this.setState({phone})}
            placeholder={this.state.defaultPhone || t('phone')}
          />
          <Text style={[styles.separator, {marginTop: 10}]}>{t('address')}</Text>

          {this.state.regions.length !== 0 && (
            <ScrollView
              horizontal
              directionalLockEnabled
              style={styles.locationCont}
              showsHorizontalScrollIndicator={false}
            >          
              {Object.keys(this.state.regions).map(item => 
                <Chip
                  key={item}
                  title={t(item)}
                  choosen={item === this.state.address.region}
                  onPress={() => {
                    let tmp = this.state.address
                    tmp.region = item
                    tmp.district = ''
                    this.setState({address: tmp})
                  }
                }/>
              )}
            </ScrollView>
          )}

          {this.state.regions[this.state.address.region] ? (
            <ScrollView
              horizontal
              directionalLockEnabled
              style={styles.locationCont}
              showsHorizontalScrollIndicator={false}
            >          
              {this.state.regions[this.state.address.region].map(item => 
                <Chip
                  key={item}
                  title={t(item)}
                  choosen={item === this.state.address.district}
                  onPress={() => {
                    let tmp = this.state.address
                    tmp.district = item
                    this.setState({address: tmp})
                  }
                }/>
              )}
            </ScrollView>
          ) : null}

          <StyledInput
            icon='home'
            autoCapitalize='words'
            value={this.state.address.other}
            onChangeText={address => {
              let tmp = this.state.address
              tmp.other = address
              this.setState({address: tmp})
            }}
            placeholder={this.state.defaultAddress.other || t('addressRest')}
          />
          <Text style={[styles.separator, {marginTop: 10}]}>{t('changePassword')}</Text>
          <StyledInput
            icon='lock'
            secureTextEntry
            placeholder={t('password')}
            value={this.state.password}
            onBlur={this.handleKeyboard}
            onFocus={this.handleKeyboard}
            onChangeText={password => this.setState({password})}
          />
          <StyledInput
            icon='lock'
            secureTextEntry
            onBlur={this.handleKeyboard}
            onFocus={this.handleKeyboard}
            placeholder={t('rePassword')}
            value={this.state.rePassword}
            onChangeText={rePassword => this.setState({rePassword})}
          />
        </ScrollView>
        <Button
          fill
          style={styles.btn}
          loading={this.state.loading}
          title={t('changeAccountInfo')}
          onPress={this.handleModification}
        />
      </View>
    )
  }
}))

export const StyledInput = props => (
  <View style={styles.input}>
    <Icon name={props.icon} style={styles.icon}/>
    <Input {...props} style={{width: '90%', paddingLeft: 30}}/>
  </View>
)

export const Chip = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={props.onPress}
    style={[styles.location, props.choosen && {backgroundColor: theme.palette.p.l}]}
  >
    <Text style={[styles.locationText, props.choosen && {color: theme.palette.c.w}]}>{props.title}</Text>
  </TouchableOpacity>
)

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  separator: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
    fontWeight: '500',
    marginLeft: '10%',
    alignSelf: 'flex-start',
    color: theme.palette.p.m,
  },
  location: {
    height: 32,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderColor: theme.palette.p.l,
  },
  cont: {alignItems: 'flex-end'},
  btn: {width: dw*2, alignSelf: 'center'},
  locationCont: { marginBottom: 10, marginLeft: dw*0.1},
  input: {marginBottom: 24, flexDirection: 'row', alignItems: 'flex-end'},
  locationText: {fontSize: 12, fontWeight: '500', color: theme.palette.c.g},
  icon: {left: 0, fontSize: 20, paddingBottom: 2, position: 'absolute', color: theme.palette.p.l},
})