import {
  View,
  Text,
  Modal,
  Image,
  Platform,
  FlatList,
  UIManager,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
<<<<<<< HEAD
  StatusBar
=======
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
} from 'react-native'
import React from 'react'
import theme from '../theme'
import { PopupContentContainer } from './Popup'
import GallerySwiper from 'react-native-gallery-swiper'

const dw = Dimensions.get('window').width
const dh = Dimensions.get('window').height

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export default class SingleProduct extends React.Component {
  state = { paddingLeft: 0, popupVisible: false, currentIndex: 0 }
  snapToGrid = e => {
    let zoom = e.nativeEvent.zoomScale
    let x = e.nativeEvent.contentOffset.x
    let w = e.nativeEvent.layoutMeasurement.width
<<<<<<< HEAD
    if (zoom === 1) {
      if (x === 0)
        this.setState({ paddingLeft: 0 })
      else if (x > 0 && x <= w * (this.props.data.length - 2))
        this.setState({ paddingLeft: w * (0.05 + (x / w * 0.15)) })
      LayoutAnimation.easeInEaseOut()
    }
  }
  setCurrentIndex = index => this.setState({ currentIndex: index, popupVisible: true })
  render() {
    this.state.popupVisible ? StatusBar.setHidden(true):StatusBar.setHidden(false)
=======
    if(zoom === 1) {
      if(x === 0)
        this.setState({paddingLeft: 0})
      else if(x > 0 && x <= w*(this.props.data.length-2))
        this.setState({paddingLeft: w*(0.05+(x/w*0.15))})
      LayoutAnimation.easeInEaseOut()              
    }
  }
  setCurrentIndex = index => this.setState({currentIndex: index, popupVisible: true})
  render() {
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    return (
      <View>
        <FlatList
          horizontal
          removeClippedSubviews
          initialNumToRender={2}
          data={this.props.data}
          directionalLockEnabled
          scrollEventThrottle={0}
          extraData={this.props.data}
          keyExtractor={(item, index) => item}
<<<<<<< HEAD
          pagingEnabled={true}
          onMomentumScrollEnd={this.snapToGrid}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: this.state.carouselPos }}
          scrollEnabled={this.props.data.length !== 1}
          contentContainerStyle={[
            styles.carousel,
            { paddingLeft: this.state.paddingLeft },
            this.props.data.length === 1 && { height: dw }
          ]}
          renderItem={({ item, index }) => (
=======
          pagingEnabled={Platform.OS === 'ios'}
          onMomentumScrollEnd={this.snapToGrid}
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: this.state.carouselPos}}
          scrollEnabled={this.props.data.length !== 1}
          contentContainerStyle={[
            styles.carousel,
            {paddingLeft: this.state.paddingLeft},
            this.props.data.length === 1 && {height: dw*0.9}
          ]}
          renderItem={({item, index}) => (
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
            <CarouselImage
              index={index}
              source={item}
              whole={this.props.data.length === 1}
<<<<<<< HEAD
              onPress={index => this.setCurrentIndex(index)} />
          )}
        />
        <Modal
          hardwareAccelerated
          animationType='fade'
          style={{ backgroundColor: theme.palette.c.bl }}
          onRequestClose={() => { }}
          visible={this.state.popupVisible}
        >
          <View style={{ height: dh + 50, backgroundColor: theme.palette.c.bl }}>
            <PopupContentContainer
              style={{backgroundColor: '#000'}}
              onPress={() => this.setState({ popupVisible: false })}
=======
              onPress={index => this.setCurrentIndex(index)}/>
          )}
        />
        <Modal
          transparent
          hardwareAccelerated
          animationType='fade'
          onRequestClose={() => {}}
          visible={this.state.popupVisible}
        >
          <View style={{flex: 1, backgroundColor: theme.palette.c.w}}>
            <PopupContentContainer
              onPress={() => this.setState({popupVisible: false})}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
              additionalComponent={(
                <View style={styles.showHeader}>
                  <Text style={styles.showHeaderText}>
                    {`${this.state.currentIndex + 1} / ${this.props.data.length}`}
                  </Text>
                </View>
              )}
            >
              <GallerySwiper
                maxScale={2}
                initialNumToRender={2}
<<<<<<< HEAD
                enableResistance={true}
                sensitiveScroll={false}
                enableTranslate={false}
                initialPage={this.state.currentIndex}
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}
                images={this.props.data.map(item => ({ uri: item }))}
                onPageSelected={index => this.setState({ currentIndex: index })}
=======
                sensitiveScroll={false}
                initialPage={this.state.currentIndex}
                style={{backgroundColor: theme.palette.c.w}}
                images={this.props.data.map(item => ({uri: item}))}
                onPageSelected={index => this.setState({currentIndex: index})}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
              />
            </PopupContentContainer>
          </View>
        </Modal>
      </View>
    )
  }
}

class CarouselImage extends React.Component {
  render = () => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.onPress(this.props.index)}>
      <View style={styles.carouselShadowCont}>
        <View style={styles.carouselImageCont}>
          <Image
<<<<<<< HEAD
            style={styles.carouselImage}
            source={{ uri: this.props.source }}
=======
            resizeMode='cover'
            style={styles.carouselImage}
            source={{uri: this.props.source}}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
            defaultSource={require('../assets/placeholder.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  carouselImageCont: {
<<<<<<< HEAD
    width: dw,
    height: dw,
    borderWidth: 0.5,
    //borderRadius: 10,
    overflow: 'hidden',
    //marginLeft: dw*0.05,
    backgroundColor: theme.palette.c.w,
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15)
  },
  carouselImage: { width: '100%', height: '100%' },
  carousel: { height: dw, paddingRight: dw * 0.05, marginBottom: 20 },
  showHeaderText: { fontSize: 14, fontWeight: '200', color: theme.palette.c.w },
  fullImageCont: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: dw, height: '100%' },
  showHeader: { width: dw, height: '100%', justifyContent: 'center', paddingRight: 20, position: 'absolute' },
  carouselShadowCont: { shadowRadius: 6, shadowOpacity: 0.3, shadowColor: '#aaa', shadowOffset: { height: 10 } },
=======
    width: dw*0.8,
    height: dw*0.8,
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: dw*0.05,
    backgroundColor: theme.palette.c.w,
    borderColor: theme.setOpacity(theme.palette.c.b, 0.15),
  },
  carouselImage: { width: '100%', height: '100%', borderRadius: 10},
  carousel: {height: dw*0.8, paddingRight: dw*0.05, marginBottom: 20},
  showHeaderText: {fontSize: 14, fontWeight: '200', color: theme.palette.p.l},
  fullImageCont: {flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: dw, height: '100%'},
  showHeader: {width: dw, height: '100%', justifyContent: 'center', paddingRight: 20, position: 'absolute'},
  carouselShadowCont: {shadowRadius: 6, shadowOpacity: 0.3, shadowColor: '#aaa', shadowOffset: {height: 10}},
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
})