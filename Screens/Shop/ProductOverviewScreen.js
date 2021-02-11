import React from 'react';
import { FlatList,Platform,View,Button } from 'react-native';
import ProductRender from '../../Components/Shop/ProductRender';
import { useDispatch } from 'react-redux'
import * as CartActions from '../../Store/Actions/CartActions';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';

import {connect} from 'react-redux'
const productOverViewScreen =(props)=>{
  //selectItemHandler works same as viewDetails
  const selectItemHandler = (id,title)=>{
    props.navigation.navigate({
      routeName:'productDetail',params:{
        prodId : id,
        prodTitle : title
      }})
  }
    const dispatch = useDispatch();
    return (
        <FlatList data={props.products} renderItem={itemData=>
        <ProductRender title={itemData.item.title} price={itemData.item.price} imageUrl={itemData.item.ImageUrl} 
           onSelect={()=>selectItemHandler(itemData.item.id,itemData.item.title)} >
              <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5}}>
                <Button  title="View Details" onPress={()=>selectItemHandler(itemData.item.id,itemData.item.title)} ></Button>
                </View>
                <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5}}>
                <Button title="Add To Cart" onPress={()=>dispatch(CartActions.addtocart(itemData.item))}></Button>
                </View>
            </ProductRender>}
            />
             
            
    )
}
productOverViewScreen.navigationOptions=navData=>{
  return {
    headerTitle : 'All Products',
  headerRight: <HeaderButtons HeaderButtonComponent={customHeaderButton}>
      <Item title="title" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={()=>{navData.navigation.navigate('Cart')}}/>
  </HeaderButtons>,
  headerLeft :<HeaderButtons HeaderButtonComponent={customHeaderButton}>
   <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}  />
   </HeaderButtons>
  }
}
const mapStateToProps=(state)=>{
   return {
       products : state.products.availableProducts //state.products means we go into the product slice of the state
   }
}
export default connect(mapStateToProps)(productOverViewScreen);
