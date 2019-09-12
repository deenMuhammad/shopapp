import React from 'react'
import theme from '../theme'
import gql from 'graphql-tag'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import { withApollo } from 'react-apollo'
import Overlay from '../components/Overlay'
import Spinner from '../components/Spinner'
import Octagon from '../components/Octagon'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

const GET_BONUS = gql`query getBonus { getBonus }`

export default observer(withApollo(class Bonus extends React.Component {
  state = {bonus: 0}

  componentDidMount = () => this.getBonus()

  getBonus = () => {
    this.props.client.query({ query: GET_BONUS })
    .then(res => this.setState({bonus: res.data.getBonus}))
    .catch(err => Alert(t(err.graphQLErrors[0].message) || t('somethingWentWrong')))
  }

  render() {
    return (
      <View style={styles.cont}>
        <Overlay />
        <Octagon size={8} backgroundColor={theme.palette.p.l} style={styles.octagon}>
          {true ? (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.bonus}>0</Text>
              <Text style={styles.som}>{t('sum').toUpperCase()}</Text>
            </View>
          ) : <Spinner color={theme.palette.c.w}/>}
        </Octagon>
        <Icon name='quote-left' style={[styles.icon, {alignSelf: 'flex-start'}]}/>
        <Text style={styles.description}>{t('bonusDescription')}</Text>
        <Icon name='quote-right' style={[styles.icon, {alignSelf: 'flex-end'}]}/>
      </View>
    )
  }
}))

const styles = StyleSheet.create({
  octagon: {marginBottom: 50},
  cont: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bonus: {color: theme.palette.c.w, fontSize: 20, fontWeight: '600'},
  som: {fontSize: 12, color: theme.palette.c.w, fontWeight: '300', textAlign: 'center'},
  icon: {fontSize: 22, color: theme.palette.p.m, marginHorizontal: 15, marginBottom: 5},
  description: {fontSize: 14, fontWeight: '400', paddingLeft: 35, paddingRight: 25, color: theme.palette.c.g},
})