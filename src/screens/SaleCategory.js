import React from 'react'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { withApollo } from 'react-apollo'
import Alert from '../components/Alert'
import { StatusBar, View, UIManager, LayoutAnimation } from 'react-native'
import ThreeColumnGrid from '../components/ThreeColumnGrid'
import Empty from '../components/Empty'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const GET_PRODUCTS = gql`
query getSaleProductBatchBySingleCategory($pageSize: Int!, $next: Int!, $category: Int!) {
    getSaleProductBatchBySingleCategory(pageSize: $pageSize, next: $next, category: $category) {
        next, hasMore, products {_id, images, name, price, discount}
  }
}`

export default withApollo(class SaleCategory extends React.Component {
    state = { next: 1, pageSize: 200, products: [], hasMore: true, empty: false, categoryId: 0 }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 0)
        this.setState({ categoryId: id })

        this.getProducts(id)
    }

    getProducts = (id) => {
        this.state.hasMore && this.props.client.query({
            fetchPolicy: 'no-cache',
            query: GET_PRODUCTS,
            variables: { pageSize: this.state.pageSize, next: this.state.next, category: id }
        })
            .then(res => {
                if (this.state.next === 1 && res.data.getSaleProductBatchBySingleCategory.products.length === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        next: res.data.getSaleProductBatchBySingleCategory.next,
                        hasMore: res.data.getSaleProductBatchBySingleCategory.hasMore,
                        products: [...this.state.products, ...res.data.getSaleProductBatchBySingleCategory.products],
                    }, () => LayoutAnimation.easeInEaseOut())
                }
            })
            .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
    }

    render() {
        return this.state.empty ? <Empty /> : (<View>
            <ThreeColumnGrid
                data={this.state.products}
                loadMore={() => { }}
                refreshing={this.state.products.length === 0}
                {...this.props.navigation}
            />
        </View>)
    }
})