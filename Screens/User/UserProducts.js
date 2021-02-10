import React from 'react';
import {FlatList, View,Platform} from 'react-native';
import {connect} from 'react-redux';
import ProductRender from '../../Components/Shop/ProductRender';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
const userProductsScreen = props =>{
    //console.log(props.products);
    return (
        <View>
           <FlatList data={props.products} renderItem={itemData=><ProductRender title={itemData.item.title} price={itemData.item.price} imageUrl={itemData.item.ImageUrl} onViewDetails={()=>{}} onAddToCart={()=>{}}/>}/>
        </View>
        
    )
}
userProductsScreen.navigationOptions =navData=> {
    return {
    headerTitle : 'Admin',
    headerLeft : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
    <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}  />
    </HeaderButtons>
    }
}
const mapStateToProps = state =>{
    return {
        products : state.products.userProducts
    }
}
export default connect(mapStateToProps)(userProductsScreen);