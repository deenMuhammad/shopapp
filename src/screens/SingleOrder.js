import React from 'react'
import theme from '../theme'
import t from '../locale/locale'
import Octagon from '../components/Octagon'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, Image } from 'react-native'
import { withApollo } from 'react-apollo';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';

const GET_PRODUCTS_BY_ID = gql`
query getProductWithIds($ids: [String]) {
  getProductWithIds(ids: $ids) { images, name }
}`

const statusIcons = { paid: 'money-check-alt', shipping: 'shipping-fast', delivered: 'check-double'}

export default observer(withApollo(class SingleOrder extends React.Component {
  
  state = {
    products: [],
    order: this.props.navigation.state.params.order || null
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = () => {
    this.state.order && this.props.client.query({
      query: GET_PRODUCTS_BY_ID,
      variables: {ids: this.state.order.products.map(pr => pr.product_id)}
    })
    .then(res => {
      this.setState({products: res.data.getProductWithIds})
    })
    // .catch(err => console.log(err))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.cont}>
          <Info {...this.state.order}/>
          <View style={styles.rightCont}>
            {Object.keys(this.state.order.status).filter(st => st !== '__typename').map(st => (
              <Status key={st} complete={this.state.order.status[st]} title={t(st)} icon={statusIcons[st]}/>
            ))}
          </View>
          <Text style={styles.myOrders}>{t('myOrders')}:</Text>
          {this.state.products.length !== 0 && (
            this.state.order.products.map((pr, i) => <Product key={i} {...pr} product={this.state.products[i]}/>)
          )}
        </ScrollView>
      </View>
    )
  }
}))

const Product = props => (
  <View style={styles.productCont}>
    <View style={styles.productImageCont}>
      <Image resizeMode='cover' style={styles.productImage} source={{uri: props.product.images[0]}}/>
    </View>
    <View style={styles.productDetails}>
      <Text style={styles.productName}>{props.product.name}</Text>
      <Text style={styles.productStock}>| {props.item.map(itm => `${itm.color} ${itm.size} ${itm.count} | `)}</Text>
    </View>
  </View>
)

class Info extends React.Component {
  getDate = () => {
    let d = new Date(this.props.date_ordered)
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
    let month = d.getMonth()+1 < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1
    return `${day}.${month}.${d.getFullYear()}`
  }
  render() {
    return (
      <HeaderContainer icon="shipping-fast" title={t('deliveryInfo')}>
        <View style={styles.infoRow}>
          <Text style={styles.left}>{t('name')}</Text>
          <Text style={styles.right}>{this.props.receiver}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.left}>{t('phone')}</Text>
          <Text style={styles.right}>{this.props.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.left}>{t('date')}</Text>
          <Text style={styles.right}>{this.getDate()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.left}>{t('deliveryFee')}</Text>
          <Text style={styles.right}>{this.props.cost.deli_fee} {t('sum')}</Text>
        </View>
        <View style={styles.infoRow}>
        <Text style={styles.left}>{t('productPrice')}</Text>
          <Text style={styles.right}>{this.props.cost.product_cost} {t('sum')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.left}>{t('address')}</Text>
          <Text style={styles.right}>
            {`${t(this.props.shipping_adress.region)} ${t(this.props.shipping_adress.district)} ${this.props.shipping_adress.other}`}
          </Text>
        </View>
      </HeaderContainer>
    )
  }
}

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

const Status = props => (
  <View style={styles.status}>
    <View style={[styles.statusBar, props.complete && styles.statusCompleteBar]}/>
    <Octagon size={0.2} backgroundColor={props.complete && theme.palette.p.l} android>
      <Icon name={props.icon} style={[styles.statusIcon, props.complete && styles.statusCompleteIcon]}/>            
    </Octagon>
    <Text style={[styles.statusSub, props.complete && styles.statusCompleteSub]}>{props.title}</Text>
  </View>
)

const dw = Dimensions.get('window').width
const border = {borderWidth: 0.5, borderColor: theme.setOpacity(theme.palette.c.b, 0.15)}
const shadow = {elevation: 2, shadowRadius: 6, shadowOpacity: 0.5, shadowColor: '#aaa', shadowOffset: {width: 0, height: 5}}

const styles = StyleSheet.create({
  rightCont: {
    width: '100%',
    height: dw*0.2,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoRow: {
    paddingBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
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
  right: { 
    width: '70%',
    fontSize: 14,
    paddingLeft: 30,
    fontWeight: '200',
    textAlign: 'right',
    color: theme.palette.p.m,
  },
  statusText: {
    right: 0,
    bottom: 0,
    fontSize: 16,
    fontWeight: '100',
    paddingVertical: 4,
    position: 'absolute',
    paddingHorizontal: 8,
    color: theme.palette.c.g,
  },
  statusBar: {
    height: 4,
    top: '20%',
    width: '50%',
    left: '-26%',
    opacity: 0.5,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: theme.palette.c.g,
  },
  statusSub: {
    bottom: 0,
    fontSize: 8,
    width: '100%',
    fontWeight: '500',
    marginBottom: -14,
    textAlign: 'center',
    position: 'absolute',
    color: theme.palette.c.g,
  },
  myOrders: {
    fontSize: 16,
    marginTop: 30,
    fontWeight: '600',
    marginLeft: '10%',
    alignSelf: 'flex-start',
    color: theme.palette.c.d,
  },
  productDetails: { width: '70%'},
  statusCompleteSub: {color: theme.palette.p.m},
  statusCompleteIcon: {color: theme.palette.c.w},
  cont: {alignItems: 'flex-end', paddingBottom: 20},
  statusIcon: {fontSize: 14, color: theme.palette.c.g},
  statusCompleteBar: {backgroundColor: theme.palette.p.l},
  productImage: {width: dw*0.2, height: dw*0.2, borderRadius: 6},
  productCont: { width: '90%', marginTop: 20, flexDirection: 'row'},
  status: {flex: 1, alignItems: 'center', justifyContent: 'space-between'},
  infoHeaderIcon: {color: theme.palette.c.w, fontSize: 14, marginLeft: 10},
  productName: { fontSize: 16, fontWeight: '300', color: theme.palette.c.d},
  productStock: { fontSize: 12, fontWeight: '100', color: theme.palette.p.l},
  productImageCont: {...shadow, ...border, borderRadius: 6, marginRight: 20},
  left: {width: '30%', fontSize: 12, fontWeight: '400', color: theme.palette.c.g},
  infoHeaderText: { padding: 10, fontSize: 12, fontWeight: '500', color: theme.palette.c.w},
  infoOverlay: {...shadow, width: '90%', alignItems: 'center', justifyContent: 'center', marginBottom: 10},
})