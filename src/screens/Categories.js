import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import deepFind from 'deep-find'
import { observer } from 'mobx-react'
import Alert from '../components/Alert'
import Button from '../components/Button'
import { withApollo } from 'react-apollo'
import Overlay from '../components/Overlay'
import Spinner from '../components/Spinner'
import { API_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Animated, Image, StatusBar } from 'react-native'

const GET_CATEGORIES_QUERY = gql`query getCategory {getCategory}`

export default observer(withApollo(class Categories extends React.Component {
  n = 1
  state = {
    back: '',
    category: [],
    allCategories: [],
    title: 'allCategories',
    path: ['allCategories'],
    pos: new Animated.Value(0),
    opacity: new Animated.Value(1),
  }

<<<<<<< HEAD
  componentDidMount = () => {
    this.getCategories()
  }

  getCategories = () => {
    this.props.client.query({ query: GET_CATEGORIES_QUERY })
      .then(res => {
        const categ = JSON.parse(res.data.getCategory)
        delete categ._id
        delete categ.__v
        this.setState({ category: categ, allCategories: categ })
        const title = this.props.navigation.getParam('title', 'undefined')
        if(typeof title !== 'undefined') this.onCategoryPress(title)
      })
      .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
=======
  componentDidMount = () => this.getCategories()

  getCategories = () => {
    this.props.client.query({query: GET_CATEGORIES_QUERY})
    .then(res => {
      const categ = JSON.parse(res.data.getCategory)
      delete categ._id
      delete categ.__v
      this.setState({category: categ, allCategories: categ})
    })
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  }

  animateForward = () => {
    Animated.sequence([
      Animated.parallel([
<<<<<<< HEAD
        Animated.timing(this.state.opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(this.state.pos, { toValue: -dw * 0.7, duration: 300, useNativeDriver: true }),
      ]),
      Animated.timing(this.state.pos, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(this.state.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
=======
        Animated.timing(this.state.opacity, { toValue: 0, duration: 200, useNativeDriver: true}),
        Animated.timing(this.state.pos, { toValue: -dw*0.7, duration: 300, useNativeDriver: true}),
      ]),
      Animated.timing(this.state.pos, { toValue: 0, duration: 0, useNativeDriver: true}),
      Animated.timing(this.state.opacity, { toValue: 1, duration: 300, useNativeDriver: true}),
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    ]).start()
  }

  animateBackward = () => {
    Animated.sequence([
      Animated.parallel([
<<<<<<< HEAD
        Animated.timing(this.state.pos, { toValue: dw * 0.7, duration: 300, useNativeDriver: true }),
        Animated.timing(this.state.opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]),
      Animated.timing(this.state.pos, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(this.state.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
=======
        Animated.timing(this.state.pos, { toValue: dw*0.7, duration: 300, useNativeDriver: true}),
        Animated.timing(this.state.opacity, { toValue: 0, duration: 200, useNativeDriver: true}),
      ]),
      Animated.timing(this.state.pos, { toValue: 0, duration: 0, useNativeDriver: true}),
      Animated.timing(this.state.opacity, { toValue: 1, duration: 300, useNativeDriver: true}),
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    ]).start()
  }

  onCategoryPress = title => {
<<<<<<< HEAD
    if (typeof this.state.category[title] === 'object') {
=======
    if(typeof this.state.category[title] === 'object') {
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      this.n = 1
      this.animateForward()
      setTimeout(() => this.setState({
        title: title,
        back: this.state.title,
        path: [...this.state.path, title],
        category: this.state.category[title],
      }), 200)
<<<<<<< HEAD
    } else {
=======
    }else {
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      this.props.navigation.navigate('CategoryProducts', {
        title: t(title),
        category: this.state.category[title],
      })
    }
  }

  onPrevPress = () => {
<<<<<<< HEAD
    if (this.state.path.length > 1) {
=======
    if(this.state.path.length > 1) {
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      this.n = 1
      this.animateBackward()
      setTimeout(() => this.setState({
        title: this.state.back,
<<<<<<< HEAD
        back: this.state.path[this.state.path.length - 3],
        path: this.state.path.slice(0, this.state.path.length - 1),
=======
        back: this.state.path[this.state.path.length-3], 
        path: this.state.path.slice(0, this.state.path.length-1),
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        category: deepFind(this.state.allCategories, this.state.path.slice(1, -1)),
      }), 100)
    }
  }

  render() {
    return (
      <View style={styles.cont}>
<<<<<<< HEAD
        <Overlay />
        {this.state.category.length === 0 ? <Spinner fill /> : (
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[styles.navCont, { opacity: this.state.opacity, transform: [{ translateX: this.state.pos }] }]}
            >
              <TouchableOpacity onPress={this.onPrevPress} style={styles.backBtn}>
                {!(t(this.state.back) === '.' || t(this.state.back) === '.undefined') && (
                  <Icon name='arrow-left' style={styles.backBtnIcon} />
                )}
                <Text style={styles.backBtnText}>
                  {(t(this.state.back) === '.' || t(this.state.back) === '.undefined') ? '' : t(this.state.back)}
=======
      <StatusBar backgroundColor={theme.palette.c.w} barStyle='dark-content'/>
        <Overlay />
        {this.state.category.length === 0 ? <Spinner fill/> : (
          <View style={{flex: 1}}>
            <Animated.View
              style={[styles.navCont, {opacity: this.state.opacity, transform: [{translateX: this.state.pos}]}]}
            >
              <TouchableOpacity onPress={this.onPrevPress} style={styles.backBtn}>
                {!(t(this.state.back) ===  '.' || t(this.state.back) ===  '.undefined') && (
                  <Icon name='arrow-left' style={styles.backBtnIcon}/>
                )}
                <Text style={styles.backBtnText}>
                  {(t(this.state.back) ===  '.' || t(this.state.back) ===  '.undefined') ? '' : t(this.state.back)}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
                </Text>
              </TouchableOpacity>
              <Text style={styles.navTitle}>↓ {t(this.state.title)}</Text>
            </Animated.View>
<<<<<<< HEAD
            <Animated.ScrollView contentContainerStyle={styles.categCont} style={{ opacity: this.state.opacity }}>
              {Object.keys(this.state.category).map(title => {
                if (this.n === 1) {
                  this.n++
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title} />
                } else if (this.n === 4) {
                  this.n = 1
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title} />
                } else {
                  this.n++
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title} long />
=======
            <Animated.ScrollView contentContainerStyle={styles.categCont} style={{opacity: this.state.opacity}}>
              {Object.keys(this.state.category).map(title => {
                if(this.n === 1) {
                  this.n++
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title}/>
                }else if(this.n === 4) {
                  this.n = 1
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title}/>
                }else {
                  this.n++
                  return <Categ onPress={() => this.onCategoryPress(title)} key={title} title={title} long/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
                }
              })}
            </Animated.ScrollView>
          </View>
        )}
      </View>
    )
  }
}))

const Categ = props => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={props.onPress}
<<<<<<< HEAD
    style={[styles.categ, props.long ? { width: '52%' } : { width: '36%' }]}
=======
    style={[styles.categ, props.long ? {width: '52%'} : {width: '36%'}]}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  >
    <Image
      resizeMode='cover'
      style={styles.categImg}
      defaultSource={require('../assets/placeholder.png')}
<<<<<<< HEAD
      source={{ uri: `${API_URL}/static/categories/${props.title}.png` }}
=======
      source={{uri: `${API_URL}/static/categories/${props.title}.png`}}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    />
    <Text style={styles.categText}>{t(props.title)}</Text>
  </TouchableOpacity>
)

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  navCont: {
<<<<<<< HEAD
    width: dw * 0.9,
    flexWrap: 'wrap',
    marginLeft: dw * 0.05,
=======
    width: dw*0.9,
    flexWrap: 'wrap',
    marginLeft: dw*0.05,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categCont: {
    flexGrow: 1,
    width: '100%',
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
<<<<<<< HEAD
    paddingBottom: dw * 0.31,
    justifyContent: 'center',
  },
  categ: {
    alignContent: 'center',
    margin: '1%',
    height: dw * 0.3,
=======
    paddingBottom: dw*0.31,
    justifyContent: 'center',
  },
  categ: {
    margin: '1%',
    height: dw*0.3,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    shadowRadius: 6,
    borderRadius: 8,
    borderWidth: 0.5,
    shadowOpacity: 0.3,
    shadowColor: '#ccc',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: theme.palette.c.w,
<<<<<<< HEAD
    shadowOffset: { width: 0, height: 5 },
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  cont: { flex: 1 },
  categImg: { width: dw * 0.1, height: dw * 0.1, marginBottom: 4 },
  backBtnIcon: { color: theme.palette.p.l, marginRight: 5, fontSize: 12 },
  navTitle: { fontSize: 20, fontWeight: '600', color: theme.palette.c.g },
  backBtnText: { fontSize: 12, fontWeight: '300', color: theme.palette.p.l },
  backBtn: { paddingVertical: 20, flexDirection: 'row', alignItems: 'center' },
  categText: { fontSize: 12, fontWeight: '600', color: theme.palette.c.g, textAlign: 'center' },
=======
    shadowOffset: {width: 0, height: 5},
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  cont: {flex: 1},
  categImg: { width: dw*0.1, height: dw*0.1, marginBottom: 4},
  backBtnIcon: {color: theme.palette.p.l, marginRight: 5, fontSize: 12},
  navTitle: { fontSize: 20, fontWeight: '600', color: theme.palette.c.g},
  backBtnText: {fontSize: 12, fontWeight: '300', color: theme.palette.p.l},
  backBtn: {paddingVertical: 20, flexDirection: 'row', alignItems: 'center'},
  categText: { fontSize: 12, fontWeight: '600', color: theme.palette.c.g, textAlign: 'center'},
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
})
