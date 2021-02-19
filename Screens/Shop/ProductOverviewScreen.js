import React,{useCallback, useEffect,useState} from 'react';
import { Text,FlatList,Platform,View,Button,ActivityIndicator } from 'react-native';
import ProductRender from '../../Components/Shop/ProductRender';
import { useDispatch } from 'react-redux'
import * as CartActions from '../../Store/Actions/CartActions';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import * as ProductActions from '../../Store/Actions/ProductActions';

import {connect} from 'react-redux'
const productOverViewScreen =(props)=>{
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false); //used when we  navigate to a page thus data loaded
  const [isRefreshing,setIsRefreshing] = useState(false); //used when we PULL TO REFRESH
  const [error,setError]=useState();
  //selectItemHandler works same as viewDetails
  const loadProductsHandler = useCallback(async()=>{
    //console.log('loaddddd');
    setError(null);
    setIsRefreshing(true); 
    try{
    await dispatch(ProductActions.fetchProducts());
    }catch(err){
       setError(err.message);
    }
    setIsRefreshing(false);
  },[dispatch,setIsLoading,setError])

  useEffect(()=>{ //every time we navigate to a page (we have added navigation listeners) products will be REFETCHED from the server 
    const willFocusSub = props.navigation.addListener('willFocus',loadProductsHandler);
    return ()=>{
      willFocusSub.remove();
    }
  },[loadProductsHandler])

  useEffect( ()=>{ //used for loading the products from the firbase
    setIsLoading(true);
      loadProductsHandler().then(res=>setIsLoading(false));
     
     
  },[dispatch,loadProductsHandler]);
  
  const selectItemHandler = (id,title)=>{
    props.navigation.navigate({
      routeName:'productDetail',params:{
        prodId : id,
        prodTitle : title
      }})
  }
    if(error)
    {
      return <View style={{flex :1,justifyContent:'center',alignItems:'center'}}>
      <Text>Error Occurred!</Text>
      <Button title="Try Again" onPress={loadProductsHandler}/>
      </View> 
    }
    if(isLoading)
    {
      return <View style={{flex :1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    }
    if(!isLoading && props.products.length ===0 )
    {
      return <View style={{flex :1,justifyContent:'center',alignItems:'center'}}>
        <Text>No products available</Text>
      </View>
    }
    return (
        <FlatList data={props.products} onRefresh={loadProductsHandler} refreshing={isRefreshing} renderItem={itemData=>
        <ProductRender title={itemData.item.title} price={itemData.item.price} imageUrl={itemData.item.ImageUrl} 
           onSelect={()=>selectItemHandler(itemData.item.id,itemData.item.title)} >
              <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5,backgroundColor:"#150485"}}>
                <Button  title="View Details" color="#ffc93c" onPress={()=>selectItemHandler(itemData.item.id,itemData.item.title)} ></Button>
                </View>
                <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5,backgroundColor:"#150485"}}>
                <Button title="Add To Cart" color="#ffc93c"  onPress={()=>dispatch(CartActions.addtocart(itemData.item))}></Button>
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
