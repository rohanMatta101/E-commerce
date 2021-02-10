import React from 'react';
import {View,FlatList,Text} from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import OrderRender from '../../Components/Shop/orderRender'

const orderScreen =(props)=>{
    const myorders = props.orders;
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
        headerLeft : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}  />
        </HeaderButtons>
    }
}
const mapStateToProps = state =>{
   return {
       orders : state.orders.orders //gives array of all orders present in reducer
   }
}
export default connect(mapStateToProps)(orderScreen);