import {
  View,
  Text,
  Image,
  Animated,
  StatusBar,
  TextInput,
  UIManager,
  ScrollView,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native'
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

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const GET_REGIONS = gql`query getRegions {getRegions}`

const GET_USER_INFO = gql`
query getUserInfo {getUserInfo { username, name, phone, address {region, district, other}}}`

const CONFIRM_SINGLE_ORDER = gql`
mutation confirmSingleOrder($order_id: String!, $token: String!, $code: String!) {
  confirmSingleOrder(order_id: $order_id, token: $token, code: $code)
}`

const CONFIRM_MULTIPLE_ORDER = gql`
mutation confirmMultipleOrder($order_ids: [String!], $token: String!, $code: String!) {
  confirmMultipleOrder(order_ids: $order_ids, token: $token, code: $code)
}`

const PLACE_SINGLE_ORDER = gql`
mutation placeSingleOrder
($product_id: String!, $shipping_adress: InputAddress!, $phone: String!, $receiver: String!, $item: [OrderInputItem!]) {
  placeSingleOrder
  (product_id: $product_id, shipping_adress: $shipping_adress, phone: $phone, receiver: $receiver, item: $item) {
    order_id, product_cost, deli_fee, total
  }
}`

const PLACE_MULTIPLE_ORDER = gql`
mutation placeMultipleOrders
($shipping_adress: InputAddress!, $phone: String!, $receiver: String!, $orders: [InputOrders]) {
  placeMultipleOrders
  (shipping_adress: $shipping_adress, phone: $phone, receiver: $receiver, orders: $orders) {
    order_id, product_cost, deli_fee, total
  }
}`

const CANCEL_ORDERS = gql`
mutation cancelOrders($cancelled_orders: [String!]) {cancelOrders(cancelled_orders: $cancelled_orders)}`

const GET_CARD_TOKEN = gql`
query getCardToken($order_ids: [String!], $card_number: String!, $expire_date: String!) {
  getCardToken(order_ids: $order_ids, card_number: $card_number, expire_date: $expire_date) {card_token order_ids}
}`

export default observer(withApollo(class OrderDetails extends React.Component {
  state = {
    name: '',
    token: '',
    phone: '',
    smsCode: '',
    account: '',
    regions: null,
    expireDate: '',
    loadingInfo: false,
    loadingRegions: true,
    laodingCancel: false,
    loadingCheckout: false,
    loadingCardToken: false,
    priceTag: null,
    cardVisible: false,
    smsCodeVisible: false,
    priceTagVisible: false,
    address: {region: '', district: '', other: ''},
  }

  componentDidMount = () => {
    this.getUserInfo(() => this.getRegions(() => LayoutAnimation.easeInEaseOut()))
  }

  componentWillUnmount = () => {
    if(this.state.priceTagVisible && !this.state.cardVisible)
      this.cancelOrders()
  }

  getPriceTag = () => {
    if(this.state.phone === '' || this.state.address.other === '' ||
    this.state.address.region === '' || this.state.address.district === '')
      Alert(t('noEmptyFields'))
    else this.setState({loadingInfo: true}, () => {
      this.props.navigation.state.params.single ? this.placeSingleOrder() : this.placeMultipleOrder()
    })
  }

  placeSingleOrder = () => {
    this.props.client.mutate({
      fetchPolicy: 'no-cache',
      mutation: PLACE_SINGLE_ORDER,
      variables: {
        phone: this.state.phone,
        receiver: this.state.name,
        shipping_adress: this.state.address,
        item: this.props.navigation.state.params.order[0].item,
        product_id: this.props.navigation.state.params.order[0].product_id,
      },
    })
    .then(res => {
      LayoutAnimation.easeInEaseOut()
      this.setState({priceTag: res.data.placeSingleOrder, loadingInfo: false, priceTagVisible: true})
    })
    .catch(err => {
      this.setState({loadingInfo: false})
      Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
    })
  }

  placeMultipleOrder = () => {
    this.props.client.mutate({
      fetchPolicy: 'no-cache',
      mutation: PLACE_MULTIPLE_ORDER,
      variables: {
        phone: this.state.phone,
        receiver: this.state.name,
        shipping_adress: this.state.address,
        orders: this.props.navigation.state.params.order,
      },
    })
    .then(res => {
      LayoutAnimation.easeInEaseOut()
      console.log(res)
      this.setState({priceTag: res.data.placeMultipleOrders, loadingInfo: false, priceTagVisible: true})
    })
    .catch(err => {
      this.setState({loadingInfo: false})
      Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
    })
  }

  getCardToken = () => {
    if(this.state.account === '' || this.state.expireDate === '')
      Alert(t('fillUpCardInfo'))
    else {
      this.setState({loadingCardToken: true}, () => {
        this.props.client.query({
          query: GET_CARD_TOKEN,
          fetchPolicy: 'no-cache',
          variables: {
            expire_date: this.state.expireDate,
            order_ids: this.state.priceTag.order_id,
            card_number: this.state.account.replace(/\s/g, ''),
          }
        })
        .then(res => {
          // console.log(res)
          this.setState({
            smsCodeVisible: true,
            loadingCardToken: false,
            token: res.data.getCardToken.card_token,
          })
        })
        .catch(err => {
          // console.log(err)
          this.setState({loadingCardToken: false})
          Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
        })
      })
    }
  }

  checkout = () => {
    if(this.state.smsCode === '')
      Alert(t('enterSmsCode'))
    else {
      this.setState({loadingCheckout: true}, () => {
        this.props.navigation.state.params.single ? this.confirmSingleOrder() : this.confirmMultipleOrder()
      })
    }
  }

  confirmSingleOrder = () => {
    this.props.client.mutate({
      fetchPolicy: 'no-cache',
      mutation: CONFIRM_SINGLE_ORDER,
      variables: {order_id: this.state.priceTag.order_id, token: this.state.token, code: this.state.smsCode}
    })
    .then(res => {
      this.setState({loadingCheckout: false})
      if(res.data.confirmSingleOrder) {
        Alert(t('orderSuccess'))
        this.props.navigation.popToTop()
      }
    })
    // .catch(err => console.log(err))
    .catch(err => {
      this.setState({loadingCheckout: false}, () => {
        Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
      })
    })
  }

  confirmMultipleOrder = () => {
    this.props.client.mutate({
      fetchPolicy: 'no-cache',
      mutation: CONFIRM_MULTIPLE_ORDER,
      variables: {order_ids: this.state.priceTag.order_id, token: this.state.token, code: this.state.smsCode}
    })
    .then(res => {
      this.setState({loadingCheckout: false})
      if(res.data.confirmMultipleOrder) {
        Alert(t('orderSuccess'))
        this.props.navigation.popToTop()
      }
    })
    // .catch(err => console.log(err))
    .catch(err => {
      this.setState({loadingCheckout: false}, () => {
        Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
      })
    })
  }

  getUserInfo = callback => {
    this.props.client.query({
      fetchPolicy: 'no-cache', query: GET_USER_INFO, fetchPolicy: 'no-cache'
    })
    .then(res => {
      this.setState({
        name: res.data.getUserInfo.name || '',
        phone: res.data.getUserInfo.phone || '',
        address: {
          other: res.data.getUserInfo.address.other || '',
          region: res.data.getUserInfo.address.region || '',
          district: res.data.getUserInfo.address.district || '',
        }
      }, callback)
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  getRegions = callback => {
    this.props.client.query({fetchPolicy: 'no-cache', query: GET_REGIONS})
    .then(res => this.setState({regions: JSON.parse(res.data.getRegions), loadingRegions: false}, callback))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  cancelOrders = () => {
    this.setState({laodingCancel: true}, () => {
      this.props.client.mutate({
        fetchPolicy: 'no-cache',
        mutation: CANCEL_ORDERS,
        variables: {
          cancelled_orders: this.props.navigation.state.params.single 
            ? [this.state.priceTag.order_id] : this.state.priceTag.order_id
        }
      })
      .then(res => res.data.cancelOrders && this.props.navigation.goBack(null))
      .catch(err => {
        this.setState({laodingCancel: false})
        Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong'))
      })
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: theme.palette.c.w}}>
<<<<<<< HEAD
=======
        <StatusBar backgroundColor={theme.palette.c.w} barStyle='dark-content'/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        <ScrollView 
          decelerationRate={0}
          directionalLockEnabled
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.cont}
        >

          {!this.state.priceTagVisible && (
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <ScrollView
                horizontal
                directionalLockEnabled
                style={styles.locationCont}
                showsHorizontalScrollIndicator={false}
              >          
                {!this.state.loadingRegions && this.state.regions && Object.keys(this.state.regions).map(item => 
                  <Chip
                    key={item}
                    title={t(item)}
                    choosen={item === this.state.address.region}
                    onPress={() => {
                      if(item === this.state.address.region) {
                        let tmp = this.state.address
                        tmp.region = ''
                        tmp.district = ''
                        LayoutAnimation.easeInEaseOut()
                        this.setState({address: tmp})
                      }else {
                        let tmp = this.state.address
                        tmp.region = item
                        tmp.district = ''
                        LayoutAnimation.easeInEaseOut()
                        this.setState({address: tmp})
                      }
                    }
                  }/>
                )}
              </ScrollView>

              {(!this.state.loadingRegions && this.state.address.region !== '') && (
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
                        if(item === this.state.address.district) {
                          let tmp = this.state.address
                          tmp.district = ''
                          this.setState({address: tmp})
                        }else {
                          let tmp = this.state.address
                          tmp.district = item
                          this.setState({address: tmp})
                        }
                      }
                    }/>
                  )}
                </ScrollView>
              )}

              <StyledInput
                icon='home'
                autoCapitalize='words'
                value={this.state.address.other}
                onChangeText={address => {
                  let tmp = this.state.address
                  tmp.other = address
                  this.setState({address: tmp})
                }}
                placeholder={this.state.defaultAddress || t('addressRest')}
              />

              <StyledInput
                icon='user-tie'
                autoComplete='name'
                autoCapitalize='words'
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

              <HeaderContainer icon='exclamation-triangle' title={t('notice')}>
                <Text style={styles.noticeText}>{t('noticeContent')}</Text>
              </HeaderContainer>
            </View>
          )}

          {this.state.smsCodeVisible && (
            <SmsCodeBox
              smsCode={this.state.smsCode}
              onChangeSmsCode={smsCode => this.setState({smsCode})}
            />
          )}

          {this.state.cardVisible && (
            <Card
              account={this.state.account}
              expireDate={this.state.expireDate}
              onChangeExpireDate={expireDate => this.setState({expireDate})}
              onChangeAccount={account => {
                let tmp = account.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
                this.setState({account: tmp})
              }}
              onPrivacyPolicyPress={() => {
                this.props.navigation.push('Privacy', {url: 'https://cdn.payme.uz/terms/main.html'})
              }}
            />
          )}

          {this.state.priceTag !== null && <Info {...this.state.priceTag}/>}
        </ScrollView>

        {this.state.priceTagVisible ? (
          this.state.cardVisible ? (
            this.state.smsCodeVisible ? (
              <Button
                fill
                style={styles.btn}
                title={t('checkout')}
                onPress={this.checkout}
                loading={this.state.loadingCheckout}
              />
            ) : (
              <Button
                fill
                style={styles.btn}
                title={t('verifyCard')}
                onPress={this.getCardToken}
                loading={this.state.loadingCardToken}
              />
            )
          ) : (
            <View style={{flexDirection: 'row', width: '100%'}}>  
              <Button
                style={styles.btn}
                title={t('cancel')}
                onPress={this.cancelOrders}
                loading={this.state.laodingCancel}
              />
              <Button 
                fill
                style={styles.btn}
                title={t('continue')}
                loading={this.state.loadingInfo}
                onPress={() => this.setState({cardVisible: true})}
              />
            </View>
          )
        ) : (
          <Button
            fill
            style={styles.btn}
            title={t('getPrice')}
            onPress={this.getPriceTag}
            loading={this.state.loadingInfo}
          />
        )}
      </View>
    )
  }
}))

const SmsCodeBox = props => (
  <HeaderContainer icon="sms" title={t('smsCode')}>
    <View style={styles.smsCont}>
      <CardInput
        maxLength={6}
        placeholder='xxxxxx'
        value={props.smsCode}
        onChangeText={smsCode => props.onChangeSmsCode(smsCode)}
      />
    </View>
  </HeaderContainer>
)

const Card = props => (
  <HeaderContainer icon="credit-card" title={t('cardInformation')}>
    <View style={styles.cardInputCont}>
      <CardInput
        maxLength={19}        
        value={props.account}
        style={{textAlign: 'left'}}
        placeholder='xxxx xxxx xxxx xxxx'
        textContentType='creditCardNumber'
        onChangeText={account => props.onChangeAccount(account)}
      />
      <CardInput
        maxLength={4}
        placeholder={t('mmyy')}
        value={props.expireDate}
        style={{textAlign: 'right'}}
        onChangeText={expireDate => props.onChangeExpireDate(expireDate)}
      />
    </View>
    <View style={styles.paymePrivacyCont}>
      <Text style={styles.paymePrivacyText}>{t('paymeNotice')}</Text>
      <TouchableOpacity onPress={props.onPrivacyPolicyPress}>
        <Text style={[styles.paymePrivacyText, {color: theme.palette.p.l}]}>{t('privacyPolicy')}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.poweredByCont}>
      <Text style={styles.poweredByText}>Powered by </Text>
      <Image source={require('../assets/payme.png')} resizeMode='contain' style={styles.paymeImg}/>
    </View>
  </HeaderContainer>
)

const CardInput = props => (
  <TextInput
    {...props}
    autoFocus={false}
    autoCorrect={false}
    keyboardType='numeric'
    autoCapitalize={'none'}
    enablesReturnKeyAutomatically
    textBreakStrategy='highQuality'
    underlineColorAndroid='transparent'
    style={[styles.cardInput, props.style]}
    placeholderTextColor={theme.palette.c.b}
  />
)

export const StyledInput = props => (
  <View style={styles.input}>
    <Icon name={props.icon} style={styles.icon}/>
    <Input {...props} style={{width: '90%', paddingLeft: 30}}/>
  </View>
)

const Chip = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={props.onPress}
    style={[styles.location, props.choosen && {backgroundColor: theme.palette.p.l}]}
  >
    <Text style={[styles.locationText, props.choosen && {color: theme.palette.c.w}]}>{props.title}</Text>
  </TouchableOpacity>
)

class HeaderContainer extends React.Component {
  state = {x: new Animated.Value(dw)}
  componentDidMount = () => {
    Animated.spring(this.state.x, {toValue: 0, useNativeDriver: true}).start()
  }
  render() {
    return (
      <Animated.View style={[styles.infoOverlay, {transform: [{translateX: this.state.x}]}]}>
        <View style={styles.infoCont}>
          <View style={styles.infoHeader}>
            <Icon name={this.props.icon} style={styles.infoHeaderIcon}/>
            <Text style={styles.infoHeaderText}>{this.props.title}</Text>
          </View>
          {this.props.children}
        </View>
      </Animated.View>
    )
  }
} 

const Info = props => (
  <HeaderContainer icon="print" title={t('priceInfo')}>
    <View style={styles.infoRow}>
      <Text style={styles.left}>{t('productPrice')}</Text>
      <Text style={styles.right}>{props.product_cost} {t('sum')}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.left}>{t('deliveryFee')}</Text>
      <Text style={styles.right}>{props.deli_fee} {t('sum')}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={[styles.left, {fontWeight: '800'}]}>{t('totalPrice')}</Text>
      <Text style={[styles.right, {fontWeight: '600'}]}>{props.total} {t('sum')}</Text>
    </View>
  </HeaderContainer>
)

const dw = Dimensions.get('window').width
const shadow = {elevation: 2, shadowRadius: 6, shadowOpacity: 0.5, shadowColor: '#aaa', shadowOffset: {width: 0, height: 5}}

const styles = StyleSheet.create({
  poweredByCont: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  location: {
    height: '100%',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderColor: theme.palette.p.l,
  },
  infoRow: {
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  infoHeader: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.palette.p.l,
  },
  infoCont: {
    width: '100%',
    borderWidth: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: theme.palette.p.l,
    backgroundColor: theme.palette.c.w,
  },
  paymePrivacyCont: {
    paddingLeft: 5,
    flexWrap: 'wrap',
    borderLeftWidth: 2,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderLeftColor: theme.palette.p.l,
  },
  cont: {alignItems: 'flex-end'},
  paymeImg: { width: 40, height: 14},
  locationCont: {height: 36, width: '90%', marginBottom: 10},
  left: { fontSize: 14, fontWeight: '400', color: theme.palette.c.g},
  right: { fontSize: 16, fontWeight: '200', color: theme.palette.p.m},
  input: {marginBottom: 18, flexDirection: 'row', alignItems: 'flex-end'},
  infoHeaderIcon: {color: theme.palette.c.w, fontSize: 14, marginLeft: 10},
  locationText: {fontSize: 12, fontWeight: '500', color: theme.palette.c.g},
  btn: {width: '100%', alignSelf: 'center', borderRadius: 0, minWidth: dw*0.5},
  smsCont: { marginBottom: 10, alignItems: 'center', justifyContent: 'center'},
  paymePrivacyText: { fontSize: 12, fontWeight: '200', color: theme.palette.c.g},
  infoHeaderText: { padding: 10, fontSize: 12, fontWeight: '500', color: theme.palette.c.w},
  icon: {left: 0, fontSize: 20, paddingBottom: 2, position: 'absolute', color: theme.palette.p.l},
  poweredByText: { fontSize: 10, fontWeight: '500', color: theme.setOpacity(theme.palette.p.m, 0.4)},
  cardInputCont: { marginTop: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'},
  infoOverlay: {...shadow, width: '90%', alignItems: 'center', justifyContent: 'center', marginBottom: 10},
  cardInput: {fontSize: 18, fontWeight: '300', paddingVertical: 5, paddingHorizontal: 10, color: theme.palette.p.d},
  noticeText: {marginLeft: 10, marginBottom: 10, fontSize: 14, color: theme.palette.c.d, fontWeight: '300', paddingRight: 10},
})