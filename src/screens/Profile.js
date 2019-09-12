import React from 'react'
import User from '../User'
import theme from '../theme'
import t from '../locale/locale'
import { observer } from 'mobx-react'
import Octagon from '../components/Octagon'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import { View, StyleSheet, Dimensions, StatusBar, Text, TouchableOpacity, Platform } from 'react-native'

export default observer(class Profile extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: theme.palette.c.w}}>
        <View style={styles.overlayCont}>
          {Platform.OS !== 'ios' ? (
            <View style={styles.overlay}/>
          ) : (
            <LinearGradient colors={[theme.palette.p.l, theme.palette.p.d]} style={styles.overlay}/>
          )}
          <View style={styles.user}>
            <Icon name='user-tie' style={styles.userIcon}/>
            <Text style={styles.userName}>{User.get('username')}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.octagons}>
            <OctagonButton
              android
              name='coins'
              label={t('bonus')}
              onPress={() => this.props.navigation.navigate('Bonus')}
            />
            <OctagonButton
              size={5}
              name='user-cog'
              label={t('editAccount')}
              backgroundColor={theme.palette.p.m}
              onPress={() => this.props.navigation.navigate('EditAccount')}
            />
            <OctagonButton
              android
              name='globe'
              label={t('language')}
              onPress={() => this.props.navigation.navigate('Language')}
            />
          </View>
          <View style={styles.grid}>
            <GridItem
              title={t('cart')}
              name='shopping-cart'
              style={{width: '40%'}}
              onPress={() => this.props.navigation.navigate('Cart')}
            />
            <GridItem
              title={t('myOrders')}
              name='shopping-basket'
              style={{width: '52%'}}
              onPress={() => this.props.navigation.navigate('OrderHistory')}
            />
            <GridItem
              name='thumbs-up'
              style={{width: '52%'}}
              title={t('likedItems')}
              onPress={() => this.props.navigation.navigate('Liked')}
            />
            <GridItem
              name='shield-alt'
              style={{width: '40%'}}
              title={t('privacyPolicy')}
              onPress={() => this.props.navigation.navigate('Privacy')}
            />
          </View>
        </View>
      </View>
    )
  }
})

const GridItem = props => (
  <TouchableOpacity onPress={props.onPress} activeOpacity={0.5} style={[styles.gridItem, props.style]}>
    <View style={styles.gridButton}>
      <Icon name={props.name} style={styles.gridIcon}/>
      <Text style={styles.gridText}>{props.title}</Text>
    </View>
  </TouchableOpacity>
)
const OctagonButton = props => (
  <TouchableOpacity activeOpacity={0.9} style={styles.octagonButton} onPress={props.onPress}>
    <Octagon backgroundColor={props.backgroundColor} size={props.size} android={props.android}>
      <Icon
        name={props.name}
        style={props.backgroundColor ? styles.octagonIconInverted : styles.octagonIcon}
      />
    </Octagon>
    <Text style={styles.octagonText}>{props.label}</Text>
  </TouchableOpacity>
)



const dw = Dimensions.get('window').width
const dh = Dimensions.get('window').height

const styles = StyleSheet.create({
  overlay: {
    width: dw,
    height: dw,
    marginTop: -dw*0.5,
    position: 'absolute',
    transform: [{rotate: '56deg'}],
    borderBottomRightRadius: dw*0.5,
    backgroundColor: theme.palette.p.l,
  },
  gridItem: {
    width: '46%',
    margin: '1%',
    height: dw*0.3,
    shadowRadius: 6,
    borderRadius: 8,
    borderWidth: 0.5,
    shadowOpacity: 0.3,
    shadowColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.c.w,
    shadowOffset: {width: 0, height: 5},
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  overlayCont: {overflow: 'hidden'},
  octagonButton: {alignItems: 'center', width: '30%'},
  octagonIcon: {fontSize: 16, color: theme.palette.c.g},
  gridButton: {alignItems: 'center', paddingHorizontal: 10},
  main: {height: dh-(dw*0.5), justifyContent: 'space-evenly'},
  octagonIconInverted: {fontSize: 18, color: theme.palette.c.w},
  userIcon: {fontSize: 24, paddingBottom: 5, color: theme.palette.c.w},
  userName: {fontSize: 18, fontWeight: '700', color: theme.palette.c.w},
  gridIcon: { fontSize: 24, marginBottom: 10, color: theme.palette.p.l},
  octagons: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'},
  octagonText: {fontSize: 10, marginTop: 5, color: theme.palette.c.g, textAlign: 'center'},
  user: {height: dw*0.5, paddingTop: dw*0.1, alignItems: 'center', justifyContent: 'center'},
  gridText: { fontSize: 14, fontWeight: '600', color: theme.palette.c.g, textAlign: 'center'},
  grid: {width: '100%', flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: '2%', justifyContent: 'center'},
})