import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import Alert from '../components/Alert'
import Empty from '../components/Empty'
import { withApollo } from 'react-apollo'
import { StatusBar, View } from 'react-native'
<<<<<<< HEAD
import ThreeColumnGrid from '../components/ThreeColumnGrid'
=======
import MasonaryGrid from '../components/MasonaryGrid'
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad

const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
query categoryProducts($pageSize: Int!, $next: Int!, $category: Int!) {
  getProductBatchByCategory(pageSize: $pageSize, next: $next, category: $category) {
<<<<<<< HEAD
    next, hasMore, products {_id, images, name, price, discount}
=======
    next, hasMore, products {_id, images}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  }
}
`

export default withApollo(class CategoryProducts extends React.Component {
<<<<<<< HEAD
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title.toUpperCase() })
=======
  static navigationOptions = ({navigation}) => ({title: navigation.state.params.title.toUpperCase()})
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad

  state = { next: 1, pageSize: 88, products: [], hasMore: true, empty: false }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = () => {
    this.state.hasMore && this.props.client.query({
      fetchPolicy: 'no-cache',
      query: GET_PRODUCTS_BY_CATEGORY_QUERY,
      variables: {
        next: this.state.next,
        pageSize: this.state.pageSize,
        category: this.props.navigation.state.params.category,
      }
    })
<<<<<<< HEAD
      .then(res => {
        if (this.state.next === 1 && res.data.getProductBatchByCategory.products.length === 0) {
          this.setState({ empty: true })
        } else {
          this.setState({
            next: res.data.getProductBatchByCategory.next,
            hasMore: res.data.getProductBatchByCategory.hasMore,
            products: [...this.state.products, ...res.data.getProductBatchByCategory.products]
          })
        }
      })
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  render() {
    return this.state.empty ? <Empty /> : (
      <View style={{ flex: 1 }}>
        <ThreeColumnGrid
=======
    .then(res => {
      if(this.state.next === 1 && res.data.getProductBatchByCategory.products.length === 0) {
        this.setState({empty: true})
      }else {
        this.setState({
          next: res.data.getProductBatchByCategory.next,
          hasMore: res.data.getProductBatchByCategory.hasMore, 
          products: [...this.state.products, ...res.data.getProductBatchByCategory.products]
        })
      }
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  render() {
    return this.state.empty ? <Empty/> : (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={theme.palette.c.w} barStyle='dark-content'/>
        <MasonaryGrid
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
          {...this.props.navigation}
          data={this.state.products}
          loadMore={this.getProducts}
          refreshing={this.state.products.length === 0}
<<<<<<< HEAD
          onRefresh={() => this.setState({ next: 1, products: [], hasMore: true })}
=======
          onRefresh={() => this.setState({next: 1, products: [], hasMore: true})}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        />
      </View>
    )
  }
})