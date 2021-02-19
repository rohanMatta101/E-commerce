import React,{useEffect, useState} from 'react';
import {View,FlatList,Text,ActivityIndicator} from 'react-native';
import { connect,useDispatch } from 'react-redux';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import OrderRender from '../../Components/Shop/orderRender';
import * as orderActions from '../../Store/Actions/orderActions';
import {Ionicons} from '@expo/vector-icons'

const orderScreen =(props)=>{
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect( ()=>{
        setIsLoading(true);
         dispatch(orderActions.fetchOrder()).then(res=>setIsLoading(false));
        
    },[dispatch])
    const myorders = props.orders;
    if(myorders.length === 0)
    {
        return <View style={{alignItems:'center',marginTop:150}}>
            <Text style={{fontSize:30,marginBottom:10}}>No Orders Placed!</Text>
            <Ionicons name="sad-outline" size={35} color="#150485" />
        </View>
    }
    //console.log(myorders);
    if(isLoading)
    {
        return <View style={{flex :1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
        </View>
    }
   return(
       <View>
           <FlatList data={myorders} keyExtractor={item=>item.readableDate} renderItem={itemData=><OrderRender amount={itemData.item.amount} date={itemData.item.readableDate} items={itemData.item.items}/>}/>
       </View>
     
   )
}
//to make the drawer start working we use navData.navigation.toggleDrawer()
 orderScreen.navigationOptions = navData=>{
    return {
        headerTitle : 'Your Orders',
        headerStyle:{
            backgroundColor:'#150485',
            
        },
        headerTintColor :'#ffc93c',
        headerLeft : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}  />
        </HeaderButtons>,
    }
}
const mapStateToProps = state =>{
   return {
       orders : state.orders.orders //gives array of all orders present in reducer
   }
}
export default connect(mapStateToProps)(orderScreen);