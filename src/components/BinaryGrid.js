import React from 'react'
import theme from '../theme'
import t from '../locale/locale'
import LinearGradient from 'react-native-linear-gradient'
import { detectBottom } from '../components/MasonaryGrid'
import RefreshControl from '../components/RefreshControl'
<<<<<<< HEAD
import { StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Text, View } from 'react-native'
=======
import {StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Text, View} from 'react-native'
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad

export default props => (
  <FlatList
    {...props}
<<<<<<< HEAD
    numColumns={2}
    initialNumToRender={6}
    extraData={props.data.slice(1)}
    keyExtractor={(item, index) => item._id + "_" + index}
    refreshControl={<RefreshControl {...props} />}
    data={props.noHeader ? props.data : props.data.slice(1)}
    renderItem={({ item }) => <ImgButton push={props.push} {...item} />}
    onMomentumScrollEnd={({ nativeEvent }) => detectBottom(nativeEvent) && props.loadMore()}
    ListHeaderComponent={!props.noHeader && <Overlay push={props.push}
      {...props.data[0]}
    />}
    disableVirtualization
    removeClippedSubviews
=======
    numColumns={2}    
    initialNumToRender={6}
    extraData={props.data.slice(1)}
    keyExtractor={(item, index) => item._id}
    refreshControl={<RefreshControl {...props}/>}
    data={props.noHeader ? props.data : props.data.slice(1)}
    renderItem={({item}) => <ImgButton push={props.push} {...item}/>}
    onMomentumScrollEnd={({nativeEvent}) => detectBottom(nativeEvent) && props.loadMore()}
    ListHeaderComponent={!props.noHeader && <Overlay push={props.push} {...props.data[0]}/>}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  />
)

const Overlay = props => props.images ? (
<<<<<<< HEAD
  <TouchableOpacity onPress={() => props.push('SingleProduct', { id: props._id })} style={styles.l} activeOpacity={0.7}>
    <Image
      resizeMode='cover'
      style={styles.img}
      source={{ uri: props.images[0] }}
=======
  <TouchableOpacity onPress={() => props.push('SingleProduct', {id: props._id})} style={styles.l} activeOpacity={0.7}>
    <Image
      resizeMode='cover'
      style={styles.img}
      source={{uri: props.images[0]}}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      defaultSource={require('../assets/placeholder.png')}
    />
    <LinearGradient
      style={styles.overlay}
      colors={[theme.setOpacity(theme.palette.p.d, 0.2), theme.setOpacity(theme.palette.c.w, 0.2)]}
    >
      <LinearGradient style={styles.discount} colors={[theme.palette.p.l, theme.palette.p.d]}>
<<<<<<< HEAD
        <Text style={styles.text}>{parseInt(props.discount / props.price * 100)}%</Text>
=======
        <Text style={styles.text}>{parseInt(props.discount/props.price*100)}%</Text>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      </LinearGradient>
    </LinearGradient>
  </TouchableOpacity>
) : null

const ImgButton = props => (
<<<<<<< HEAD
  <TouchableOpacity onPress={() => props.push('SingleProduct', { id: props._id })} activeOpacity={0.7} style={styles.sCont}>
=======
  <TouchableOpacity onPress={() => props.push('SingleProduct', {id: props._id})} activeOpacity={0.7} style={styles.sCont}>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    <View style={styles.s}>
      <Image
        resizeMode='cover'
        style={styles.img}
<<<<<<< HEAD
        source={{ uri: props.images[0] }}
=======
        source={{uri: props.images[0]}}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        defaultSource={require('../assets/placeholder.png')}
      />
      {props.discount !== 0 && (
        <LinearGradient colors={[theme.palette.p.l, theme.palette.p.d]} style={styles.discount}>
<<<<<<< HEAD
          <Text style={styles.text}>{parseInt(props.discount / props.price * 100)}%</Text>
=======
          <Text style={styles.text}>{parseInt(props.discount/props.price*100)}%</Text>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
        </LinearGradient>
      )}
    </View>
    <View style={styles.content}>
      <Text style={styles.name}>{String(props.name).slice(0, 16)}...</Text>
      <View style={styles.priceCont}>
        {props.discount !== 0 && (
<<<<<<< HEAD
          <Text style={[styles.price, { textDecorationLine: 'line-through' }]}>{props.price}</Text>
        )}
        <Text style={[styles.price, { color: 'red' }]}>{props.discount !== 0 && ' → '}{props.price - props.discount} {t('sum')}</Text>
=======
          <Text style={[styles.price, {textDecorationLine: 'line-through'}]}>{props.price}</Text>
        )}
        <Text style={[styles.price, {color: 'red'}]}>{props.discount !== 0 && ' → '}{props.price - props.discount} {t('sum')}</Text>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      </View>
    </View>
  </TouchableOpacity>
)

const dw = Dimensions.get('window').width

const styles = StyleSheet.create({
  l: {
<<<<<<< HEAD
    width: dw * 0.96,
    height: dw * 0.6,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginTop: dw * 0.02,
    marginBottom: dw * 0.01,
    marginHorizontal: dw * 0.02,
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  sCont: {
    width: dw * 0.47,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginLeft: dw * 0.02,
    marginVertical: dw * 0.01,
=======
    width: dw*0.96,
    height: dw*0.6,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginTop: dw*0.02,
    marginBottom: dw*0.01,
    marginHorizontal: dw*0.02,
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  sCont: {
    width: dw*0.47,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginLeft: dw*0.02,
    marginVertical: dw*0.01,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discount: {
    right: 0,
    opacity: 0.8,
    bottom: '10%',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 10,
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.palette.p.m,
  },
<<<<<<< HEAD
  content: { padding: 8 },
  s: { width: '100%', height: dw * 0.48 },
  img: { width: '100%', height: '100%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  priceCont: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 14, fontWeight: '500', color: theme.palette.c.d },
  price: { fontSize: 12, fontWeight: '300', color: theme.palette.p.m },
  overlayName: { fontSize: 30, fontWeight: '400', color: theme.palette.c.w },
  overlayPrice: { fontSize: 20, fontWeight: '900', color: theme.palette.p.l },
  text: { fontSize: 12, fontWeight: '700', textAlign: 'right', color: theme.palette.c.w },
  overlayDiscount: { fontSize: 40, fontWeight: '900', color: theme.palette.p.l, textDecorationLine: 'underline' },
=======
  content: {padding: 8},
  s: {width: '100%', height: dw*0.48},
  img: {width: '100%', height: '100%'},
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  priceCont: {flexDirection: 'row', alignItems: 'center'},
  name: {fontSize: 14, fontWeight: '500', color: theme.palette.c.d},
  price: {fontSize: 12, fontWeight: '300', color: theme.palette.p.m},
  overlayName: {fontSize: 30, fontWeight: '400', color: theme.palette.c.w},
  overlayPrice: {fontSize: 20, fontWeight: '900', color: theme.palette.p.l},
  text: {fontSize: 12, fontWeight: '700', textAlign: 'right', color: theme.palette.c.w},
  overlayDiscount: {fontSize: 40, fontWeight: '900', color: theme.palette.p.l, textDecorationLine: 'underline'},
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
})