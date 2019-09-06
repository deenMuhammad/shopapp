import {
  DrawerItems,
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation'
import React from 'react'
import User from './User'
import theme from './theme'
import Hot from './screens/Hot'
import t from './locale/locale'
import Sale from './screens/Sale'
import Cart from './screens/Cart'
import Shops from './screens/Shops'
import Bonus from './screens/Bonus'
import Liked from './screens/Liked'
import { observer } from 'mobx-react'
import Search from './screens/Search'
import Profile from './screens/Profile'
import AboutUs from './screens/AboutUs'
import Privacy from './screens/Privacy'
import Language from './screens/Language'
import Octagon from './components/Octagon'
import SingleShop from './screens/SingleShop'
import Categories from './screens/Categories'
import EditAccount from './screens/EditAccount'
import SingleOrder from './screens/SingleOrder'
import { togglePopup } from './components/Popup'
import OrderHistory from './screens/OrderHistory'
import OrderDetails from './screens/OrderDetails'
import SingleProduct from './screens/SingleProduct'
<<<<<<< HEAD
import SaleCategory from './screens/SaleCategory'
import CategoryProducts from './screens/CategoryProducts'
import LinearGradient from 'react-native-linear-gradient'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, TouchableOpacity, Dimensions, View, ScrollView, Text, TouchableNativeFeedback, Platform, SafeAreaView, Linking } from 'react-native'
=======
import CategoryProducts from './screens/CategoryProducts'
import LinearGradient from 'react-native-linear-gradient'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import {StyleSheet, TouchableOpacity, Dimensions, View, ScrollView, Text} from 'react-native'
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad

const dw = Dimensions.get('window').width

const Tab = createMaterialTopTabNavigator({
  Hot: {
    screen: Hot,
    navigationOptions: {
<<<<<<< HEAD
      tabBarLabel: props => <TabBarLabel {...props} title='hot' />,
      tabBarIcon: props => <TabBarIcon name='fire-alt' {...props} />,
    },
    
=======
      tabBarLabel: props => <TabBarLabel {...props} title='hot'/>,
      tabBarIcon: props => <TabBarIcon name='fire-alt' {...props}/>,
    }
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  },
  Sale: {
    screen: Sale,
    navigationOptions: {
<<<<<<< HEAD
      tabBarLabel: props => <TabBarLabel {...props} title='sale' />,
      tabBarIcon: props => <TabBarIcon name='percentage' {...props} />,
=======
      tabBarLabel: props => <TabBarLabel {...props} title='sale'/>,
      tabBarIcon: props => <TabBarIcon name='percentage' {...props}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    }
  },
  Shops: {
    screen: Shops,
    navigationOptions: {
<<<<<<< HEAD
      tabBarLabel: props => <TabBarLabel {...props} title='shops' />,
      tabBarIcon: props => <TabBarIcon name='store-alt' {...props} />,
    }
  },
}, {
    lazy: true,
    swipeEnabled: false,
    optimizationsEnable: true,
    tabBarOptions: {
      showIcon: true,
      tabStyle: { flexDirection: 'column' },
      activeTintColor: theme.palette.c.w,
      inactiveTintColor: theme.palette.c.w2,
      inactiveBackgroundColor: theme.palette.c.w,
      indicatorStyle: { backgroundColor: theme.palette.c.w, width: '15%', left: '9%' },
      style: { elevation: 0, shadowOpacity: 0, backgroundColor: 'transparent', marginBottom: 5 },
    }
  })

const TabBarLabel = observer(props => (
  <Text style={[{ color: props.tintColor }, styles.tabBarLabel]}>{t(props.title).toUpperCase()}</Text>
))

const TabBarIcon = props => (
  <Icon5 style={[{ color: props.tintColor }, styles.tabBarIcon]} name={props.name} />
=======
      tabBarLabel: props => <TabBarLabel {...props} title='shops'/>,
      tabBarIcon: props => <TabBarIcon name='store-alt' {...props}/>,
    }
  },
},{
  lazy: true,
  swipeEnabled: false,
  optimizationsEnable: true,
  tabBarOptions: {
    showIcon: true,
    tabStyle: {flexDirection: 'column'},
    activeTintColor: theme.palette.p.m,
    inactiveTintColor: theme.palette.c.g,
    inactiveBackgroundColor: theme.palette.c.w,
    indicatorStyle: {backgroundColor: theme.palette.p.m, width: '15%', left: '9%'},
    style: {elevation: 0, shadowOpacity: 0, backgroundColor: theme.palette.c.w, marginBottom: 5},
  }
})

const TabBarLabel = observer(props => (
  <Text style={[{color: props.tintColor}, styles.tabBarLabel]}>{t(props.title).toUpperCase()}</Text>
))

const TabBarIcon = props => (
  <Icon5 style={[{color: props.tintColor}, styles.tabBarIcon]} name={props.name}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
)

const Stack = observer(createStackNavigator({
  Tab: {
    screen: Tab,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => {
      let activeRoute = navigation.state.routes[navigation.state.index].routeName
      var backColor = "#510273"
      if (activeRoute == 'Hot')
        var backColor = "#510273"
      else if (activeRoute == 'Sale')
        var backColor = "#FDC202"
      else
        var backColor = "#CB201D"

      return ({
        // headerTitle: () => <Image source={require('./assets/logo.png')} resizeMode='contain' style={{width: 50, height: 50}}/>,
        headerLeft: () => <MenuButton {...navigation} />,
        headerStyle: { borderBottomWidth: 1, borderBottomColor: 'transparent', elevation: 0, marginBottom: 5, backgroundColor: backColor },
        headerTitle: () => <SearchBar onPress={() => navigation.navigate('Search')} />,
        headerRight: (
          <HeaderRight
            icon='user-tie'
            {...navigation}
            onPress={() => User.get('token') ? navigation.navigate('Profile') : togglePopup()}
          />
        )
      })
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
=======
    navigationOptions: ({navigation}) => ({
      // headerTitle: () => <Image source={require('./assets/logo.png')} resizeMode='contain' style={{width: 50, height: 50}}/>,
      headerLeft: () => <MenuButton {...navigation}/>,
      headerStyle: {borderBottomWidth: 1, borderBottomColor: 'transparent', elevation: 0, marginBottom: 5},
      headerRight: (
        <HeaderRight
          icon='user-tie'
          {...navigation}
          onPress={() => User.get('token') ? navigation.navigate('Profile') : togglePopup()}
        />
      ),
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      headerTransparent: true,
      headerTintColor: theme.palette.c.w,
      headerTitle: t('profile').toUpperCase(),
      headerRight: (
        <HeaderRight
          {...navigation}
          icon='sign-out-alt'
<<<<<<< HEAD
          style={{ color: '#fff' }}
=======
          style={{color: '#fff'}}
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
          onPress={() => User.set(null, null, () => navigation.goBack())}
        />
      ),
    })
  },
  Cart: {
    screen: Cart,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('cart').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('cart').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  SingleProduct: {
    screen: SingleProduct,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation} />,
    })
  },
  SaleCategory: {
    screen: SaleCategory,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  Categories: {
    screen: Categories,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('categories').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('categories').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  OrderHistory: {
    screen: OrderHistory,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('myOrders').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('myOrders').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  SingleOrder: {
    screen: SingleOrder,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  EditAccount: {
    screen: EditAccount,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('editAccount').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('editAccount').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  Language: {
    screen: Language,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('language').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('language').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  SingleShop: {
    screen: SingleShop,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  Liked: {
    screen: Liked,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('likedItems').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('likedItems').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  Search: {
    screen: Search,
<<<<<<< HEAD
    /*navigationOptions: ({ navigation }) => ({
      headerTitle: t('search').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
    })*/
  },
  Bonus: {
    screen: Bonus,
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('bonus').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('search').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
    })
  },
  Bonus: {
    screen: Bonus,
    navigationOptions: ({navigation}) => ({
      headerTitle: t('bonus').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  Privacy: {
    screen: Privacy,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: '.....',
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  AboutUs: {
    screen: AboutUs,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('aboutUs').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('aboutUs').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  OrderDetails: {
    screen: OrderDetails,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerTitle: t('orderDetails').toUpperCase(),
      headerRight: <MenuButton {...navigation} />,
=======
    navigationOptions: ({navigation}) => ({
      headerTitle: t('orderDetails').toUpperCase(),
      headerRight: <MenuButton {...navigation}/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    })
  },
  CategoryProducts: {
    screen: CategoryProducts,
<<<<<<< HEAD
    navigationOptions: ({ navigation }) => ({
      headerRight: <MenuButton {...navigation} />,
    })
  },
}, {
    headerMode: 'screen',
    headerLayoutPreset: 'center',
    //initialRouteName: 'SingleOrder',
    headerTransitionPreset: 'uikit',
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
      headerTintColor: theme.palette.p.l,
      headerTitleStyle: { fontSize: 16, fontWeight: '400', paddingVertical: 15 },
      headerBackImage: ({ tintColor, title }) => <HeaderBack color={tintColor} {...navigation} />,
      headerStyle: { borderBottomWidth: 1, borderBottomColor: 'transparent', elevation: 0, marginBottom: 20 },
    })
  }))

const HeaderBack = observer(props => (
  <TouchableOpacity onPress={() => props.goBack(null)}>
    <Icon5 name='arrow-left' style={[styles.headerBtn/*, { color: props.color }*/]} />
=======
    navigationOptions: ({navigation}) => ({
      headerRight: <MenuButton {...navigation}/>,
    })
  },
},{
  headerMode: 'screen',
  headerLayoutPreset: 'center',
  // initialRouteName: 'SingleOrder',
  headerTransitionPreset: 'uikit',
  defaultNavigationOptions: ({navigation}) => ({
    headerBackTitle: null,
    headerTruncatedBackTitle: null,
    headerTintColor: theme.palette.p.l,
    headerTitleStyle: {fontSize: 16, fontWeight: '400', paddingVertical: 15},
    headerBackImage: ({tintColor, title}) => <HeaderBack color={tintColor} {...navigation}/>,
    headerStyle: {borderBottomWidth: 1, borderBottomColor: 'transparent', elevation: 0, marginBottom: 20},
  })
}))

const HeaderBack = observer(props => (
  <TouchableOpacity onPress={() => props.goBack(null)}>
    <Icon5 name='arrow-left' style={[styles.headerBtn, {color: props.color}]}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  </TouchableOpacity>
))

const MenuButton = observer(props => (
<<<<<<< HEAD
  <TouchableOpacity activeOpacity={1} onPress={() => props.openDrawer()} style={{ marginLeft: 30 }}>
    <Icon5 name='align-left' style={styles.headerBtn} />
=======
  <TouchableOpacity onPress={() => props.openDrawer()}>
    <Icon5 name='align-left' style={styles.headerBtn}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  </TouchableOpacity>
))

const HeaderRight = observer(props => (
<<<<<<< HEAD
  <TouchableOpacity onPress={props.onPress} activeOpacity={1} style={{ marginRight: 30 }}>
    <Icon5 name={props.icon} style={[styles.headerBtn, props.style]} />
  </TouchableOpacity>
))

const SearchBar = observer(props => (
  <TouchableOpacity activeOpacity={1} style={styles.searchBarStyle} onPress={props.onPress}>
    <Text style={styles.searchBarStylePlaceHolder}>{t('typesmth')}</Text>
=======
  <TouchableOpacity onPress={props.onPress}>
    <Icon5 name={props.icon} style={[styles.headerBtn, props.style]}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  </TouchableOpacity>
))

const Drawer = createDrawerNavigator({
  Stack: {
    screen: Stack,
    navigationOptions: {
<<<<<<< HEAD
      drawerIcon: () => <DrawerIcon name='home' />,
      drawerLabel: props => <DrawerLabel {...props} title='home' />,
    },
  },
  Language: {
    screen: Language,
    navigationOptions: {
      drawerIcon: () => <DrawerIcon name='globe' />,
      drawerLabel: props => <DrawerLabel {...props} title='language' />,
=======
      drawerIcon: () => <DrawerIcon name='home'/>,
      drawerLabel: props => <DrawerLabel {...props} title='home'/>,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      drawerIcon: () => <DrawerIcon name='search'/>,
      drawerLabel: props => <DrawerLabel {...props} title='search'/>,
    }
  },
  Categories: {
    screen: Categories,
    navigationOptions: {
      drawerIcon: () => <DrawerIcon name='layer-group'/>,
      drawerLabel: props => <DrawerLabel {...props} title='categories'/>,
    }
  },
  Language: {
    screen: Language,
    navigationOptions: {
      drawerIcon: () => <DrawerIcon name='globe'/>,
      drawerLabel: props => <DrawerLabel {...props} title='language'/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    }
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
<<<<<<< HEAD
      drawerIcon: () => <DrawerIcon name='info-circle' />,
      drawerLabel: props => <DrawerLabel {...props} title='aboutUs' />,
=======
      drawerIcon: () => <DrawerIcon name='info-circle'/>,
      drawerLabel: props => <DrawerLabel {...props} title='aboutUs'/>,
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
    }
  },
  Privacy: {
    screen: Privacy,
    navigationOptions: {
<<<<<<< HEAD
      drawerIcon: () => <DrawerIcon name='shield-alt' />,
      drawerLabel: props => <DrawerLabel {...props} title='privacyPolicy' />,
    }
  }
}, {
    drawerType: 'back',
    drawerWidth: dw * 0.8,
    useNativeAnimations: true,
    drawerBackgroundColor: theme.palette.c.w,
    contentComponent: props => <DrawerComponent {...props} />,
    contentOptions: {
      iconContainerStyle: { opacity: 1 },
      activeTintColor: theme.palette.p.m,
      inactiveTintColor: theme.palette.c.g,
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
      iconContainerStyle: { paddingLeft: 30, paddingRight: 10, paddingVertical: 10, opacity: 1 },
    },
  })

const DrawerLabel = observer(props => (
  <Text style={[{ color: props.tintColor }, styles.drawerLabel]}>{t(props.title)}</Text>
=======
      drawerIcon: () => <DrawerIcon name='shield-alt'/>,
      drawerLabel: props => <DrawerLabel {...props} title='privacyPolicy'/>,
    }
  }
},{
  drawerType: 'back',
  drawerWidth: dw*0.8,
  useNativeAnimations: true,
  drawerBackgroundColor: theme.palette.c.w,
  contentComponent: props => <DrawerComponent {...props}/>,
  contentOptions: {
    iconContainerStyle: {opacity: 1},
    activeTintColor: theme.palette.p.m,
    inactiveTintColor: theme.palette.c.g,
    activeBackgroundColor: 'transparent',
    inactiveBackgroundColor: 'transparent',
    iconContainerStyle: {paddingLeft: 30, paddingRight: 10, paddingVertical: 10, opacity: 1},
  },
})

const DrawerLabel = observer(props => (
  <Text style={[{color: props.tintColor}, styles.drawerLabel]}>{t(props.title)}</Text>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
))

const DrawerIcon = props => (
  <Octagon backgroundColor={theme.palette.p.m} size={0.5}>
<<<<<<< HEAD
    <Icon5 name={props.name} style={{ fontSize: 16, color: theme.palette.c.w }} />
=======
    <Icon5 name={props.name} style={{fontSize: 16, color: theme.palette.c.w}}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
  </Octagon>
)

const DrawerComponent = observer(props => (
<<<<<<< HEAD
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.drawerScroll}>
      <DrawerItems {...props} />
      {
        Platform.OS === 'android' && Platform.Version >= 21 ? (
          <TouchableNativeFeedback onPress={() => Linking.openURL('http://dangasa.uz/business')} background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', false)}>
            <SafeAreaView style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              paddingLeft: 20
            }}>
              <View style={styles.icon}>
                <DrawerIcon name='plus' />
              </View>
              <DrawerLabel {...props} title='business' />
            </SafeAreaView>

          </TouchableNativeFeedback>
        ) : (
            <TouchableOpacity onPress={() => Linking.openURL('http://dangasa.uz/business')}>
              <View style={[styles.row, {
                flexDirection: 'row',
                alignItems: 'center'
              }]}>
                <View style={styles.icon}>
                  <DrawerIcon name='plus' />
                </View>
                <DrawerLabel {...props} title='business' />
              </View>

            </TouchableOpacity>
          )
      }

    </ScrollView>
    <View style={{ overflow: 'hidden', }}>
      <LinearGradient colors={[theme.palette.p.d, theme.palette.p.l]} style={styles.overlay} />
=======
  <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.drawerScroll}>
      <DrawerItems {...props}/>
    </ScrollView>
    <View style={{overflow: 'hidden',}}>          
      <LinearGradient colors={[theme.palette.p.d, theme.palette.p.l]} style={styles.overlay}/>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      <View style={styles.greetingCont}>
        <Text style={styles.greetingTxtOne}>{t('hello')}</Text>
        <Text style={styles.greetingTxtTwo}>{User.get('username')}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cartCont}
        onPress={() => User.get('token') ? props.navigation.navigate('Cart') : togglePopup()}
      >
<<<<<<< HEAD
        <Octagon android size={6}><Icon5 name='shopping-cart' style={styles.cart} /></Octagon>
=======
        <Octagon android size={6}><Icon5 name='shopping-cart' style={styles.cart}/></Octagon>
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
      </TouchableOpacity>
    </View>
  </View>
))

const styles = StyleSheet.create({
  overlay: {
<<<<<<< HEAD
    width: dw * 0.8,
    height: dw * 0.8,
    marginTop: dw * 0.1,
    marginBottom: -dw * 0.45,
    borderTopLeftRadius: dw * 0.4,
    borderTopStartRadius: dw * 0.4,
    transform: [{ rotate: '60deg' }],
    backgroundColor: theme.palette.p.l,
  },
  tabBarIcon: { fontSize: 16 },
  tabBarLabel: { fontSize: 10, fontWeight: '100' },
  cart: { fontSize: 30, color: theme.palette.p.m },
  footerIcon: { fontSize: 20, color: theme.palette.p.m },
  footerOctagon: { marginLeft: dw * 0.6, marginBottom: 20 },
  drawerScroll: { flexGrow: 1, justifyContent: 'center' },
  greetingTxtOne: { color: theme.palette.c.w, fontSize: 14 },
  cartCont: { top: dw * 0.05, left: dw * 0.45, position: 'absolute' },
  drawerLabel: { fontWeight: '400', fontSize: 14, paddingLeft: 10 },
  headerBtn: { fontSize: 22, padding: 8, color: 'rgba(0,0,0,0.6)' },
  greetingCont: { position: 'absolute', bottom: dw * 0.05, left: dw * 0.1 },
  greetingTxtTwo: { color: theme.palette.c.w, fontSize: 24, fontWeight: '700' },
  searchBarStyle: {
    width: dw - 30,
    height: 44,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'center'
  },
  searchBarStylePlaceHolder: { fontSize: 13, padding: 5, width: '100%', textAlign: 'center', color: 'rgba(0,0,0,0.6)' },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center'
  }
=======
    width: dw*0.8,
    height: dw*0.8,
    marginTop: dw*0.1,
    marginBottom: -dw*0.45,
    borderTopLeftRadius: dw*0.4,
    borderTopStartRadius: dw*0.4,
    transform: [{rotate: '60deg'}],
    backgroundColor: theme.palette.p.l,
  },
  tabBarIcon: {fontSize: 16},
  tabBarLabel: {fontSize: 10, fontWeight: '100'},
  cart: {fontSize: 30, color: theme.palette.p.m},
  footerIcon: {fontSize: 20, color: theme.palette.p.m},
  footerOctagon: {marginLeft: dw*0.6, marginBottom: 20},
  drawerScroll: {flexGrow: 1, justifyContent: 'center'},
  greetingTxtOne: {color: theme.palette.c.w, fontSize: 14},
  cartCont: {top: dw*0.05,left: dw*0.45,position: 'absolute'},
  drawerLabel: {fontWeight: '400', fontSize: 14, paddingLeft: 10},
  headerBtn: {fontSize: 22, padding: 15, color: theme.palette.p.m},
  greetingCont: {position: 'absolute', bottom: dw*0.05, left: dw*0.1},
  greetingTxtTwo: {color: theme.palette.c.w, fontSize: 24, fontWeight: '700'},
>>>>>>> 308781bbbd3f2b557780b4bda2037df38d3213ad
})

export default createAppContainer(Drawer)