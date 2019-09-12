import {
  View,
  Text,
  Image,
  FlatList,
  Keyboard,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Input from '../components/Input'
import { withApollo } from 'react-apollo'
import Spinner from '../components/Spinner'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { detectBottom } from '../components/MasonaryGrid'
import Alert from '../components/Alert'

const SEARCH_QUERY = gql`
query search($pageSize: Int!, $next: Int!, $terms: [String!]) {
  searchByTerms(pageSize: $pageSize, next: $next, terms: $terms) {
    next, hasMore, products {_id, name, price, discount, liked, hot, images, stock { color, size }}
  }
}`

export default withApollo(observer(class Search extends React.Component {
  state = {
    next: 1,
    query: '',
    products: [],
    hasMore: true,
    loading: false,
  }

  constructor(props) {
    super(props)

    this.setQuery = this.setQuery.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ setQuery: this.setQuery })
    this.props.navigation.setParams({ search: this.search })
    this.props.navigation.setParams({ query: this.state.query })
  }

  setQuery = (query) => {
    this.setState({ query })
    this.props.navigation.setParams({ query: query })
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: (
        <View style={styles.search}>
          <View style={styles.inputCont}>
            <Input
              autoFocus={true}
              style={styles.input}
              clearButtonMode='never'
              value={params.query}
              placeholder={t('search')}
              // onSubmitEnding={this.search}
              onChangeText={query => params.setQuery(query)}
            />
          </View>
        </View>
      ),
      headerRight: (
        <TouchableOpacity style={styles.button} onPress={() => {
          params.search()
        }}>
          {params.loading ? (
            <Spinner size={16} style={{ marginBottom: 5 }} />
          ) : (
              <Text style={styles.btnText}>{t('search')}</Text>
            )}
        </TouchableOpacity>
      ),
    }
  }

  search = () => {
    
    this.state.query !== '' && this.state.hasMore && this.props.navigation.setParams({ loading: true }) && this.props.client.query({
      query: SEARCH_QUERY,
      fetchPolicy: 'no-cache',
      variables: { pageSize: 200, next: this.state.next, terms: this.state.query.split(' ') }
    })
      .then(res => {
        this.setState({
          products: []
        })
        Keyboard.dismiss()
        this.setState({
          query: '',
          // next: res.data.searchByTerms.next,
          products: res.data.searchByTerms.products,
        })
        this.props.navigation.setParams({ query: '' })
        this.props.navigation.setParams({ loading: false })
      })
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.palette.c.w} barStyle='dark-content' />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this.state.products.length !== 0 ? (
            <FlatList
              extraDat={this.state}
              data={this.state.products}
              keyExtractor={item => item._id}
              keyboardDismissMode='interactive'
              contentContainerStyle={{ flexGrow: 1 }}
              // onMomentumScrollEnd={({nativeEvent}) => detectBottom(nativeEvent) && this.search()}
              renderItem={({ item }) => (
                <Item {...item} onPress={() => this.props.navigation.push('SingleProduct', { id: item._id })} />
              )}
            />
          ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>{t('yourSearchResults')}</Text>
              </View>
            )}
        </ScrollView>
      </View>
    )
  }
}))

const Item = props => (
  <TouchableOpacity activeOpacity={0.7} style={styles.itemCont} onPress={props.onPress}>
    <View style={styles.item}>
      <Image
        resizeMode='cover'
        style={styles.itemImg}
        source={{ uri: props.images[0] }}
        defaultSource={require('../assets/placeholder.png')}
      />
      <View style={styles.infoCont}>
        <Text style={styles.name}>{props.name}</Text>
        {props.discount != 0 && <Text style={styles.oldP}>{props.price + ' ' + t('sum')}</Text>}
        <Text style={styles.newP}>{props.price - props.discount + ' ' + t('sum')}</Text>
        <Text style={styles.stock}>| {props.stock.map(item => `${item.color} ${item.size} | `)}</Text>
        <View style={styles.extraInfo}>
          {props.hot && <Icon style={styles.extraInfoIcon} name='fire' />}
          {props.liked && <Icon style={styles.extraInfoIcon} name='heart' />}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

const dw = Dimensions.get('window').width
const border = { borderWidth: 0.5, borderColor: theme.setOpacity(theme.palette.c.b, 0.15) }
const shadow = { elevation: 2, shadowRadius: 6, shadowOpacity: 0.3, shadowColor: '#aaa', shadowOffset: { height: 4 } }

const styles = StyleSheet.create({
  search: {
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    //marginHorizontal: dw * 0.1,
    marginRight: 30,
    justifyContent: 'space-between',
  },
  itemCont: {
    ...border,
    ...shadow,
    width: dw * 0.94,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: dw * 0.03,
    backgroundColor: theme.palette.c.w,
  },
  itemImg: { width: dw * 0.47, height: dw * 0.47 },
  button: { right: 10, maxWidth: 90 },
  item: { borderRadius: 10, overflow: 'hidden', flexDirection: 'row' },
  stock: { fontSize: 10, fontWeight: '200', color: theme.palette.p.l },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  extraInfoIcon: { fontSize: 18, marginLeft: 10, color: theme.palette.p.l },
  icon: { left: 0, fontSize: 18, position: 'absolute', color: theme.palette.p.l },
  extraInfo: { right: 10, bottom: 10, position: 'absolute', flexDirection: 'row' },
  name: { fontSize: 16, marginBottom: 8, fontWeight: '700', color: theme.palette.p.m },
  newP: { fontSize: 16, marginBottom: 8, fontWeight: '500', color: theme.palette.p.d },
  input: { width: '100%', paddingLeft: 22, paddingRight: 90, color: theme.palette.c.g },
  btnText: { fontSize: 16, fontWeight: '900', paddingVertical: 5, color: theme.palette.p.d },
  inputCont: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  infoCont: { padding: 10, width: dw * 0.47, alignItems: 'flex-start', justifyContent: 'center' },
  placeholderText: { fontSize: 14, fontWeight: '400', paddingHorizontal: 20, color: theme.palette.c.g },
  oldP: { fontSize: 12, fontWeight: '300', color: theme.palette.c.g, textDecorationLine: 'line-through' },
})