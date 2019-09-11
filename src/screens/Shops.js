import {
  View,
  FlatList,
  Platform,
  StatusBar,
  UIManager,
  StyleSheet,
  Dimensions,
  ScrollView,
  LayoutAnimation,
} from 'react-native'
import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Alert from '../components/Alert'
import Empty from '../components/Empty'
import { Chip } from './EditAccount'
import { withApollo } from 'react-apollo'
import ShopGrid from '../components/ShopGrid'
import RefreshControl from '../components/RefreshControl'
import { detectBottom } from '../components/MasonaryGrid'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const GET_CATEGORY = gql`query getShopCategory {getShopCategory}`

const SHOPS_QUERY = gql`
query shops($next: Int, $pageSize: Int, $category: Int) {
  getShopBatch(pageSize: $pageSize, next: $next, category: $category) {
    hasMore next shops {showcase Shop {name logo _id address {region district other}}}
  }
}`

export default withApollo(observer(class Sale extends React.Component {

  state = { next: 1, shops: [], pageSize: 12, hasMore: true, empty: false, shopCategory: null, categoryId: 0 }

  static navigationOptions = {
    style: {
      backgroundColor: '#CB201D',
      marginTop: -5
    }
  };

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.getShops()
    this.getShopCategory()

    this.props.navigation.addListener('willFocus', (route) => {
      if (route.state.routeName == 'Shops')
        StatusBar.setBackgroundColor('#CB201D')
    });
  }

  getShopCategory = () => {
    this.props.client.query({ query: GET_CATEGORY })
      .then(res => this.setState({ shopCategory: JSON.parse(res.data.getShopCategory) }))
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  getShops = () => {
    this.state.hasMore && this.props.client.query({
      query: SHOPS_QUERY,
      fetchPolicy: 'no-cache',
      variables: { next: this.state.next, pageSize: this.state.pageSize, category: this.state.categoryId }
    })
      .then(res => {
        // console.log(res)
        if (this.state.next === 1 && !res.data.getShopBatch.shops) {
          this.setState({ empty: true })
        } else {
          if(res.data.getShopBatch.next > this.state.next)
          this.setState({
            next: res.data.getShopBatch.next,
            hasMore: res.data.getShopBatch.hasMore,
            shops: [...this.state.shops, ...res.data.getShopBatch.shops],
          }, () => LayoutAnimation.easeInEaseOut())
        }
      })
      // .catch(err => console.log(err))
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  onRefresh = () => this.setState({ shops: [], next: 1, hasMore: true }, () => {
    Platform.OS !== 'ios' && this.getShops()
  })

  onCategoryPress = item => {
    if (this.state.categoryId === this.state.shopCategory[item]) {
      this.setState({ categoryId: 0, shops: [], next: 1, hasMore: true, empty: false }, this.getShops)
    } else {
      this.setState({ categoryId: this.state.shopCategory[item], shops: [], next: 1, hasMore: true, empty: false }, this.getShops)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor='#CB201D' barStyle='light-content' />

        {this.state.shopCategory ? (
          <View style={styles.locationWrapper}>
            <ScrollView
              horizontal
              // directionalLockEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.locationCont}
            >
              {Object.keys(this.state.shopCategory).map(item =>
                <Chip
                  key={item}
                  title={t(item)}
                  onPress={() => this.onCategoryPress(item)}
                  choosen={this.state.categoryId === this.state.shopCategory[item]}
                />
              )}
            </ScrollView>
          </View>
        ) : null}

        {this.state.empty ? <Empty /> : (
          <FlatList
            disableVirtualization
            extraData={this.state}
            data={this.state.shops}
            keyExtractor={(item, index) => item.Shop._id}
            renderItem={({ item }) => <ShopGrid {...item} {...this.props.navigation} />}
            onMomentumScrollEnd={({ nativeEvent }) => detectBottom(nativeEvent) && this.getShops()}
            refreshControl={<RefreshControl refreshing={this.state.shops.length === 0} onRefresh={this.onRefresh} />}
          />
        )}
      </View>
    )
  }
}))

const dw = Dimensions.get('screen').width

const styles = StyleSheet.create({
  // locationCont: {height: 32},
  locationWrapper: { height: 32, marginLeft: dw * 0.02, marginVertical: 8 },
})