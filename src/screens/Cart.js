import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Animated,
  UIManager,
  StatusBar,
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
import Alert from '../components/Alert'
import Empty from '../components/Empty'
import { withApollo } from 'react-apollo'
import Octagon from '../components/Octagon'
import Icon from 'react-native-vector-icons/FontAwesome5'
import RefreshControl from '../components/RefreshControl'
import { detectBottom } from '../components/MasonaryGrid'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const REMOVE_PRODUCT_QUERY = gql`
mutation removeProduct($product_id: String!) { removeFromCart(product_id: $product_id)}`

const CART_PRODUCTS_QUERY = gql`
query cartProduct($next: Int!, $pageSize: Int!) {
  getCartProductBatch(next: $next, pageSize: $pageSize) {
    hasMore next cart {_id product_id {_id name price discount images} stock {item_id count size color}}
  }
}`

export default observer(withApollo(class Cart extends React.Component {
  state = { next: 1, pageSize: 40, hasMore: true, products: [], empty: false }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = () => {
    this.state.hasMore && this.props.client.query({
      fetchPolicy: 'no-cache',
      query: CART_PRODUCTS_QUERY,
      variables: {next: this.state.next, pageSize: this.state.pageSize},
    })
    .then(res => {
      if(this.state.next === 1 && res.data.getCartProductBatch.cart.length === 0) {
        this.setState({empty: true})
      }else {
        this.setState({
          next: res.data.getCartProductBatch.next,
          hasMore: res.data.getCartProductBatch.hasMore,
          products: [...this.state.products, ...res.data.getCartProductBatch.cart]
        })
      }
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => {
    this.setState({products: [], next: 1, hasMore: true}, () => Platform.OS !== 'ios' && this.getProducts())
  }

  onDelete = id => {
    this.props.client.mutate({fetchPolicy: 'no-cache', variables: {product_id: id}, mutation: REMOVE_PRODUCT_QUERY})
    .then(res => res.data.removeFromCart && 
      this.setState({products: this.state.products.filter(item => item.product_id._id !== id)},
        () => LayoutAnimation.easeInEaseOut()))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  buyAll = () => this.props.navigation.navigate('OrderDetails', {
    single: false,
    order: this.state.products.map(product => ({
      product_id: product.product_id._id,
      item: product.stock.map(st => ({_id: st.item_id, color: st.color, count: st.count, size: st.size}))
    })),
  })

  onBuy = item => {
    this.props.navigation.navigate('OrderDetails', {
      single: true,
      order: [{
        product_id: item.product_id._id,
        item: item.stock.map(st => ({_id: st.item_id, size: st.size, color: st.color, count: st.count}))
      }],
    })
  }

  render() {
    return this.state.empty ? <Empty/> : (
      <View style={{flex: 1, backgroundColor: theme.palette.c.w}}>
<<<<<<< HEAD
=======
        <StatusBar backgroundColor={theme.palette.c.w} barStyle='dark-content'/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        <FlatList
          extraData={this.state}
          data={this.state.products}
          keyExtractor={item => item._id}
          onMomentumScrollEnd={({nativeEvent}) => detectBottom(nativeEvent) && this.getProducts()}
          refreshControl={<RefreshControl refreshing={this.state.products.length === 0} onRefresh={this.onRefresh}/>}
          renderItem={({item}) => (
            <Item
              {...item}
              {...this.props.navigation}
              onBuy={() => this.onBuy(item)}
              onDelete={() => this.onDelete(item.product_id._id)}
              onInfo={() => this.props.navigation.push('SingleProduct', {id: item.product_id._id})}
            />
          )}
        />
        <TouchableOpacity activeOpacity={0.9} style={styles.footerButton} onPress={this.buyAll}>
          <Octagon size={5} backgroundColor={theme.palette.p.l}>
            <Icon style={styles.footerIcon} name='shopping-cart'/>
            <Text style={styles.footerText}>{t('buyAll')}</Text>
          </Octagon>
        </TouchableOpacity>
      </View>
    )
  }
}))

class Item extends React.Component {
  scrollView = null
  state = { z: new Animated.Value(1), o: new Animated.Value(1) }
  onDelete = () => {
    Animated.parallel([
      Animated.spring(this.state.z, {toValue: 0, useNativeDriver: true}),
      Animated.spring(this.state.o, {toValue: 0, useNativeDriver: true}),
    ]).start()
    this.props.onDelete()
  }
  render() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.item}
        showsHorizontalScrollIndicator={false}
        ref={scrollView => this.scrollView = scrollView}
        style={{transform: [{scale: this.state.z}], opacity: this.state.o}}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.product}
          onPress={() => this.scrollView.getNode().scrollToEnd({animated: true})}
        >
          <View style={styles.pInfo}>
            <Text style={styles.pName}>
              {this.props.product_id.name.length > 15 ? (
                this.props.product_id.name.slice(0, 15) + '...'
              ) : this.props.product_id.name}
            </Text>
            {this.props.product_id.discount !== 0 && (
              <Text style={styles.pPrice}>{this.props.product_id.price} {t('sum')}</Text>
            )}
            <Text style={styles.pPriceD}>{this.props.product_id.price - this.props.product_id.discount} {t('sum')}</Text>
            <Text style={styles.pStock}>| {this.props.stock.map(item => `${item.count} ${item.color} ${item.size} | `)}</Text>
          </View>
          <Text style={styles.pCount}>{this.props.stock.reduce((a, b) => a + b.count, 0)}</Text>
        </TouchableOpacity>
        <View style={[styles.overlay, Platform.OS !== 'ios' && {backgroundColor: theme.palette.c.w}]}>
          <OverlayIcon
            label={t('delete')}
            backgroundColor={theme.palette.c.e}
            onPress={this.onDelete} icon='trash'
          />
          <OverlayIcon
            label={t('info')}
            backgroundColor={theme.palette.c.s}
            onPress={this.props.onInfo} icon='info-circle'
          />
          <OverlayIcon
            label={t('buy')}
            backgroundColor={theme.palette.p.l}
            onPress={this.props.onBuy} icon='credit-card'
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.pImageCont}
          onPress={() => this.scrollView.getNode().scrollToEnd({animated: true})}
        >
          <Image
            resizeMode='cover'
            style={styles.pImage}
            source={{uri: this.props.product_id.images[0]}}
            defaultSource={require('../assets/placeholder.png')}
          />
        </TouchableOpacity>
      </Animated.ScrollView>
    )
  }
}

const OverlayIcon = props => (
  <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.5} onPress={props.onPress}>
    <Octagon size={0.3} backgroundColor={props.backgroundColor}>
      <Icon name={props.icon} style={styles.overlayIcon}></Icon>
    </Octagon>
    <Text style={styles.overlayLabel}>{props.label}</Text>
  </TouchableOpacity>
)

const dw = Dimensions.get('window').width
const border = {borderWidth: 0.5, borderColor: theme.setOpacity(theme.palette.c.b, 0.15)}
const shadow = {elevation: 2, shadowRadius: 6, shadowOpacity: 0.3, shadowColor: '#aaa', shadowOffset: {height: 4}}

const styles = StyleSheet.create({
  product: {
    ...border,
    elevation: 1,
    height: dw*0.3,
    width: dw*0.94,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.palette.c.w,
  },
  pImageCont: {
    ...border,
    ...shadow,
    top: dw*0.05,
    width: dw*0.3,
    left: dw*0.05,
    height: dw*0.3,
    borderRadius: 12,
    position: 'absolute',
    backgroundColor: theme.palette.c.w,
  },
  pPrice: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '300',
    color: theme.palette.c.g,
    textDecorationLine: 'line-through',
  },
  overlay: {
    width: dw,
    height: dw*0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pInfo: {marginLeft: dw*0.4},
  pImage: {width: '100%', height: '100%', borderRadius: 12},
  footerButton: {right: 20, bottom: 20, position: 'absolute'},
  pName: {fontSize: 16, fontWeight: '600',color: theme.palette.p.m},
  pStock: {fontSize: 10, color: theme.palette.p.l, paddingRight: '10%'},
  footerIcon: {fontSize: 18, marginBottom: 2, color: theme.palette.c.w},
  overlayIcon: {fontSize: 12, color: theme.palette.c.g, color: theme.palette.c.w},
  pPriceD: {fontSize: 15, marginBottom: 5, fontWeight: '600', color: theme.palette.p.d},
  item: {...shadow, height: dw*0.4, borderRadius: 12, flexDirection: 'row', marginHorizontal: dw*0.03},
  overlayLabel: {fontSize: 10,marginTop: 4,fontWeight: '700',textAlign: 'center',color: theme.palette.c.g},
  pCount: {fontSize: 30, fontWeight: '100', marginLeft: dw*0.8, color: theme.palette.c.g, position: 'absolute'},
  footerText: {fontSize: 10, fontWeight: '600', color: theme.palette.c.w, paddingHorizontal: 6, textAlign: 'center'},
})