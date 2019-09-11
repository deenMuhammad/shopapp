import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import Alert from '../components/Alert'
import Empty from '../components/Empty'
import { withApollo } from 'react-apollo'
import {StatusBar, View} from 'react-native'
import MasonaryGrid from '../components/MasonaryGrid'

const LIKED_ITEMS_QUERY = gql`
query likedItems($next: Int!, $pageSize: Int!) {
  getLikedProductBatch(next: $next, pageSize: $pageSize) {
    next hasMore liked {_id customer_id product_id {_id images}}
  }
}`

export default withApollo(class Liked extends React.Component {
  state = {next: 1, pageSize: 88, hasMore: true, products: [], empty: false}
  
  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = () => {
    this.state.hasMore && this.props.client.query({
      fetchPolicy: 'no-cache',
      query: LIKED_ITEMS_QUERY,
      variables: {next: this.state.next, pageSize: this.state.pageSize}
    })
    .then(res => {
      if(this.state.next === 1 && res.data.getLikedProductBatch.liked.length === 0) {
        this.setState({empty: true})
      }else {
        this.setState({
          next: res.data.getLikedProductBatch.next,
          hasMore: res.data.getLikedProductBatch.hasMore,
          products: [...this.state.products, ...res.data.getLikedProductBatch.liked.map(item => item.product_id)]
        })
      }
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => this.setState({next: 1, hasMore: true, products: []}, this.getProducts)

  render = () => this.state.empty ? <Empty/> : (
    <View style={{flex: 1}}>
      <MasonaryGrid
        {...this.props.navigation}
        data={this.state.products}
        onRefresh={this.onRefresh}
        loadMore={this.getProducts}
        refreshing={this.state.products.length === 0}
      />
    </View>
  )
})