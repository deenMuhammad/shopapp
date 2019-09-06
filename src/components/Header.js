import React from 'react'
import theme from '../theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity>
              <Icon name='arrow-left' style={styles.icon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.middle}>
            <Text style={styles.text}>Ibrohim Bahromov</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity>
              <Icon name='user-alt' style={styles.icon}/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  left: {
    width: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  middle: {
    width: '50%',
    alignItems: 'center',
  },
  right: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: 20,
    paddingVertical: 15,
    marginHorizontal: 3,
    paddingHorizontal: 7,
    color: theme.palette.c.g,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    color: theme.palette.p.d,
  }
})