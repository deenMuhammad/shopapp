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
  StatusBar
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
            <CarouselImage
              index={index}
              source={item}
              whole={this.props.data.length === 1}
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
                enableResistance={true}
                sensitiveScroll={false}
                enableTranslate={false}
                initialPage={this.state.currentIndex}
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}
                images={this.props.data.map(item => ({ uri: item }))}
                onPageSelected={index => this.setState({ currentIndex: index })}
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
            style={styles.carouselImage}
            source={{ uri: this.props.source }}
            defaultSource={require('../assets/placeholder.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  carouselImageCont: {
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
})