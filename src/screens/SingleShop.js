import React from 'react'
import gql from 'graphql-tag'
import t from '../locale/locale'
import Alert from '../components/Alert'
import Empty from '../components/Empty'
import { withApollo } from 'react-apollo'
import { View, Platform } from 'react-native'
import BinaryGrid from '../components/BinaryGrid'
import { ShopHeader } from '../components/ShopGrid'

const SHOP_PRODUCTS_QUERY = gql`
query shopProducts($next: Int!, $pageSize: Int!, $id: String!) {
  getSingleShopProductBatch(next: $next, pageSize: $pageSize, _id: $id) {
    next hasMore products {_id images, name, price, discount}
  }
}`

<<<<<<< HEAD
const SHOP_QUERY = gql`
query getShop($id: String!) {
  getShop(_id: $id) {
    name, _id, logo, address {region district other}, phone
  }
}
`

export default withApollo(class SingleShop extends React.Component {

  state = { next: 1, pageSize: 20, hasMore: true, products: [], empty: false, Shop: [] }

  componentDidMount = () => {
    this.getShop()
=======
export default withApollo(class SingleShop extends React.Component {
  
  state = { next: 1, pageSize: 20, hasMore: true, products: [], empty: false }

  componentDidMount = () => {
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    this.getProducts()
  }

  getProducts = () => {
    this.state.hasMore && this.props.client.query({
      fetchPolicy: 'no-cache',
      query: SHOP_PRODUCTS_QUERY,
      variables: {
        next: this.state.next,
        pageSize: this.state.pageSize,
        id: this.props.navigation.state.params.Shop._id,
      },
    })
<<<<<<< HEAD
      .then(res => {
        if (this.state.next === 1 && res.data.getSingleShopProductBatch.products.length === 0) {
          this.setState({ empty: true })
        } else {
          this.setState({
            next: res.data.getSingleShopProductBatch.next,
            hasMore: res.data.getSingleShopProductBatch.hasMore,
            products: [...this.state.products, ...res.data.getSingleShopProductBatch.products],
          })
        }
      })
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  getShop = () => {
    this.props.client.query({
      fetchPolicy: 'no-cache',
      query: SHOP_QUERY,
      variables: {
        id: this.props.navigation.state.params.Shop._id,
      },
    })
      .then(res => {
        if (this.state.next === 1 && res.data.getShop.length === 0) {
          this.setState({ empty: true })
        } else {
          this.setState({
            Shop: res.data.getShop
          })
        }
      })
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => {
    this.setState({ next: 1, hasMore: true, products: [] }, () => Platform.OS !== 'ios' && this.getProducts())
  }

  render() {
    if (this.state.Shop.length > 0)
      alert(JSON.stringify(this.state.Shop))
    return (
      <View style={{ flex: 1 }}>
        {
          typeof this.props.navigation.state.params.Shop.address !== 'undefined' && (<ShopHeader shadow {...this.props.navigation.state.params} />)
        }
        {
          typeof this.props.navigation.state.params.Shop.address == 'undefined' && Object.keys(this.state.Shop).length > 0 && (<ShopHeader shadow {...this.state} />)
        }
        {this.state.empty ? <Empty /> : (
=======
    .then(res => {
      if(this.state.next === 1 && res.data.getSingleShopProductBatch.products.length === 0) {
        this.setState({empty: true})
      }else {
        this.setState({
          next: res.data.getSingleShopProductBatch.next,
          hasMore: res.data.getSingleShopProductBatch.hasMore,
          products: [...this.state.products, ...res.data.getSingleShopProductBatch.products],
        })
      }
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => {
    this.setState({next: 1, hasMore: true, products: []}, () => Platform.OS !== 'ios' && this.getProducts())
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ShopHeader shadow {...this.props.navigation.state.params}/>
        {this.state.empty ? <Empty/> : (
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
          <BinaryGrid
            noHeader
            {...this.props.navigation}
            data={this.state.products}
            onRefresh={this.onRefresh}
            loadMore={this.getProducts}
            refreshing={this.state.products.length === 0}
          />
        )}
      </View>
    )
  }
})