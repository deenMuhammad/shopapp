import React from 'react'
import theme from '../theme'
import RefreshControl from './RefreshControl'
import {StyleSheet, Image, TouchableOpacity, Dimensions, View, FlatList} from 'react-native'

const layouts = [
  {size: 'm', sp: ''},
  {size: 'm', sp: ''},
  {size: 'l', sp: ''},
  {size: 's', sp: ''},
  {size: 's', sp: 'sp'},
  {size: 's', sp: ''},
  {size: 's', sp: ''},
  {size: 's', sp: ''},
]

const dw = Dimensions.get('window').width

export const detectBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 40
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}

export default props => {
  let images = []
  const w = dw*0.98
  props.data.map((_, i) => {if(i%8 === 0) images = [...images, props.data.slice(i, i+8)]})
  const computedStyles = {
    sp: {marginTop: -(w/3-w*0.01), marginLeft: w*2/3+w*0.01},
    m: {width: w/2-w*0.02, height: w/2-w*0.02, margin: w*0.01},
    s: {width: w/3-w*0.02, height: w/3-w*0.02, margin: w*0.01},
    l: {width: w*2/3-w*0.02, height: w*2/3-w*0.02, margin: w*0.01},
  }
  return (
    <FlatList
      {...props}
      data={images}
      extraData={images}
      initialNumToRender={8}
      contentContainerStyle={styles.cont}
      keyExtractor={(item, index) => item[0]._id}
      refreshControl={<RefreshControl {...props}/>}
      onMomentumScrollEnd={({nativeEvent}) => detectBottom(nativeEvent) && props.loadMore()}
      renderItem={({item}) => (
        <View style={styles.grid}>
          {layouts.map((layout, i) => item[i] && (
            <ImgButton
              key={item[i]._id}
              source={item[i].images[0]}
              style={[computedStyles[layout.size],computedStyles[layout.sp]]}
              onPress={() => props.push('SingleProduct', {id: item[i]._id})}
            />
          ))}
        </View>
      )}
    />
  )
}


const ImgButton = props => (
  <TouchableOpacity onPress={props.onPress} style={props.style} activeOpacity={0.7}>
    <Image
      resizeMode='cover'
      style={styles.img}
      source={{uri: props.source}}
      defaultSource={require('../assets/placeholder.png')}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  cont: {paddingTop: dw*0.01},
  grid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: dw*0.01},
  img: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: theme.setOpacity(theme.palette.c.b,0.15),
  },
})