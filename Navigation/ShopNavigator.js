import React from 'react';
import {View,Button,SafeAreaView, Platform} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator,DrawerNavigatorItems } from 'react-navigation-drawer'
import ProductOverviewScreen from '../Screens/Shop/ProductOverviewScreen' ;
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import orderScreen from '../Screens/Shop/OrderScreen';
import UserProductsScreen from '../Screens/User/UserProducts';
import EditProductsScreen from '../Screens/User/EditProducts';
import AuthScreen from '../Screens/User/AuthScreen';
import StartUpScreen from '../Screens/User/StartUpScreen';
import {useDispatch} from 'react-redux';
import * as authActions from '../Store/Actions/AuthAction';
import { Ionicons } from '@expo/vector-icons';
//import OrderScreen from '../Screens/Shop/OrderScreen';
const productNavigator = createStackNavigator({
    
    productOverView : ProductOverviewScreen,
    productDetail : ProductDetailScreen,
    Cart : CartScreen 
},{
    defaultNavigationOptions:{
     headerStyle:{
         backgroundColor:'#150485',
         
     },
     headerTintColor :'#ffc93c'

    }
});
const orderNavigator = createStackNavigator({
    orders : orderScreen
})
const adminNavigator = createStackNavigator({
    userProducts : UserProductsScreen,
    editProducts : EditProductsScreen
})
const authNavigator = createStackNavigator({
    Auth : AuthScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#150485',
            
        },
        headerTintColor :'#ffc93c'
   
       }
})
const ShopNavigator = createDrawerNavigator({
    Products : productNavigator,
    Orders : orderNavigator,
    Admin : adminNavigator
},{
    contentOptions:{
        activeBackgroundColor:'#150485',
        activeTintColor:'#ffc93c',
        inactiveTintColor : '#150485'
    },
    contentComponent: props=>{ //This is used to render our own components in the side drawer 
        const dispatch = useDispatch();
        return <View style={{flex:1}}>
            <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                <DrawerNavigatorItems {...props}/>
                <Button title="Logout" color="#150485" onPress={()=>{
                    dispatch(authActions.logout());
                    }}/>
            </SafeAreaView>
        </View>
    }
    
})
const mainNavigator = createSwitchNavigator({
    StartUp : StartUpScreen,
    Auth : authNavigator,
    Shop : ShopNavigator

})


export default createAppContainer(mainNavigator);