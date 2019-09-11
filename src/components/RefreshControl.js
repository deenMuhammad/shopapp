import React from 'react'
import theme from '../theme'
import Spinner from './Spinner'
import { RefreshControl, View, Platform } from 'react-native'

export default props => Platform.OS !== 'ios' ? (
  <RefreshControl
    enabled
    {...props}
    progressViewOffset={10}
    size={RefreshControl.SIZE.DEFAULT}
    progressBackgroundColor={theme.palette.c.w}
    colors={[theme.palette.p.l, theme.palette.p.m, theme.palette.p.d]}
  />
) : (
  <RefreshControl
    enabled
    {...props}
    progressViewOffset={10}
    tintColor='transparent'
    colors={['transparent']}
    progressBackgroundColor='rgba(0,0,0,0)'
    style={{backgroundColor: 'transparent'}}
    size={RefreshControl.SIZE.DEFAULT}
  >
    {props.refreshing && (
      <View style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
        <Spinner size={22} />
      </View>
    )}
  </RefreshControl>
)