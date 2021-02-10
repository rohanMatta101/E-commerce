//import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ProductOverviewScreen from '../Screens/Shop/ProductOverviewScreen' ;
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import orderScreen from '../Screens/Shop/OrderScreen';
import UserProductsScreen from '../Screens/User/UserProducts';
//import OrderScreen from '../Screens/Shop/OrderScreen';
const productNavigator = createStackNavigator({
    
    productOverView : ProductOverviewScreen,
    productDetail : ProductDetailScreen,
    Cart : CartScreen 
},{
    defaultNavigationOptions:{
      
    }
});
const orderNavigator = createStackNavigator({
    orders : orderScreen
})
const adminNavigator = createStackNavigator({
    userProducts : UserProductsScreen
})
const ShopNavigator = createDrawerNavigator({
    Products : productNavigator,
    Orders : orderNavigator,
    Admin : adminNavigator
})


export default createAppContainer(ShopNavigator);