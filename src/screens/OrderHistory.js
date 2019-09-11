import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Empty from '../components/Empty'
import Alert from '../components/Alert'
import { withApollo } from 'react-apollo'
import RefreshControl from '../components/RefreshControl'
import { detectBottom } from '../components/MasonaryGrid'
import {
  View, Text, Platform, Image, StyleSheet, StatusBar, Dimensions, TouchableOpacity, FlatList
} from 'react-native'

const GET_ORDERS_QUERY = gql`
query getOrdersBatch($next: Int, $pageSize: Int) {
  getOrdersBatch(next: $next, pageSize: $pageSize) {
    next hasMore order {
      phone
      receiver
      date_ordered
      showcase {image name}
      status {paid shipping delivered}
      cost {product_cost deli_fee total}
      shipping_adress {region district other}
      products {product_id item {color size count}}
    }
  }
}`// address or adress

export default observer(withApollo(class OrderHistory extends React.Component {
  state = {next: 1, orders: [], pageSize: 10, empty: false, hasMore: true}

  componentDidMount = () => {
    this.getOrders()    
  }

  getOrders = () => {
    this.state.hasMore && this.props.client.query({
      fetchPolicy: 'no-cache',
      query: GET_ORDERS_QUERY,
      variables: {next: this.state.next, pageSize: this.state.pageSize}
    })
    .then(res => {
      // console.log(res)
      if(this.state.next === 1 && res.data.getOrdersBatch.order.length === 0) {
        this.setState({empty: true})
      }else {
        this.setState({
          next: res.data.getOrdersBatch.next,
          hasMore: res.data.getOrdersBatch.hasMore,
          orders: [...this.state.orders, ...res.data.getOrdersBatch.order],
        })
      }
    })
    // .catch(err => console.log(err))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => {
    this.setState({orders: [], next: 1, hasMore: true}, () => Platform.OS !== 'ios' && this.getOrders())
  }

  render() {
    return this.state.empty ? <Empty/> : (
      <View style={styles.cont}>
        <FlatList
          extraData={this.state}
          data={this.state.orders}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Item {...item} {...this.props.navigation}/>}
          onMomentumScrollEnd={({nativeEvent}) => detectBottom(nativeEvent) && this.getOrders()}
          refreshControl={<RefreshControl refreshing={this.state.orders.length === 0} onRefresh={this.onRefresh}/>}
        />
      </View>
    )
  }
}))

const statusIcons = { paid: 'money-check-alt', shipping: 'shipping-fast', delivered: 'check-double'}

class Item extends React.Component {
  getDate = () => {
    let d = new Date(this.props.date_ordered)
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
    let month = d.getMonth()+1 < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1
    return `${day}.${month}.${d.getFullYear()}`
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.leftCont}
        onPress={() => this.props.navigate('SingleOrder', {order: this.props})}
      >
        <View style={styles.leftImageCont}>
          <Image
            resizeMode='cover'
            style={styles.leftImage}
            source={{uri: this.props.showcase.image}}
            defaultSource={require('../assets/placeholder.png')}
          />
        </View>
        <View style={styles.pInfo}>
          <Text style={styles.pName}>{this.props.showcase.name.slice(0, 22)}</Text>
          <View style={styles.priceCont}>
            <Text style={styles.pPrice}>{this.props.cost.deli_fee} {t('sum')}</Text>
            <Text style={styles.pPriceD}>{this.props.cost.product_cost} {t('sum')}</Text>
          </View>
        </View>
        <Text style={styles.statusText}>{this.getDate()}</Text>
      </TouchableOpacity>
    )
  }
}

const r = 10
const dw = Dimensions.get('window').width
const shadow = {elevation: 2, shadowRadius: 6, shadowOpacity: 0.3, shadowColor: '#aaa', shadowOffset: {height: 4}}

const styles = StyleSheet.create({
  leftImageCont: {
    width: dw*0.3,
    height: dw*0.3,
    overflow: 'hidden',
    borderTopLeftRadius: r,
    borderBottomLeftRadius: r,
  },
  rightCont: {
    width: dw,
    height: dw*0.3,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
  leftCont: {
    ...shadow,
    width: dw*0.94,
    borderRadius: r,
    borderWidth: 0.5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: dw*0.03,
    backgroundColor: theme.palette.c.w,
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  priceCont: {paddingTop: 10},
  pInfo: {marginLeft: 15, marginTop: 15},
  leftImage: { width: '100%', height: '100%'},
  cont: {backgroundColor: theme.palette.c.w, flex: 1},
  pName: {fontSize: 16, fontWeight: '600', color: theme.palette.p.m},
  pPrice: {fontSize: 12, fontWeight: '300', color: theme.palette.c.g},
  pPriceD: {fontSize: 15, fontWeight: '600', color: theme.palette.p.d},
  status: {flex: 1, alignItems: 'center', justifyContent: 'space-between'},
})