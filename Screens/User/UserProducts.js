import React from 'react';
import {FlatList, View,Platform,Button,Alert,Text} from 'react-native';
import {connect,useDispatch} from 'react-redux';
import ProductRender from '../../Components/Shop/ProductRender';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import * as ProductActions from '../../Store/Actions/ProductActions';
import {Ionicons} from '@expo/vector-icons'
const userProductsScreen = props =>{
    const dispatch = useDispatch();
    const deleteItemHandler=(id)=>{
        Alert.alert('Are you sure?','Do you want to delete this item?',[
        {text:'Yes',style:'destructive',onPress:()=>dispatch(ProductActions.deleteProduct(id))},
        {text:'No',style:'default'}
        ])
    }
    if(props.products.length === 0)
    {
        return <View style={{alignItems:'center',marginTop:150}}>
            <Text style={{fontSize:30,marginBottom:10}}>No Products Found!</Text>
            <Ionicons name="sad-outline" size={35} color="#150485" />
        </View>
    }
    //console.log(props.products);
    return (
        <View>
           <FlatList data={props.products} renderItem={itemData=>
           <ProductRender title={itemData.item.title} price={itemData.item.price} imageUrl={itemData.item.ImageUrl} onSelect={()=>props.navigation.navigate({
            routeName : 'editProducts',
            params : {
                productId : itemData.item.id
            }
            })}>
              <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5,backgroundColor:"#150485"}}>
                <Button  title="Edit" color="#ffc93c" onPress={()=>props.navigation.navigate({
                    routeName : 'editProducts',
                    params : {
                        productId : itemData.item.id
                    }
                })} ></Button>
                </View>
                <View style={{borderWidth:1.5,borderColor:'grey',borderRadius:5,marginHorizontal:5,backgroundColor:"#150485"}}>
                <Button title="Delete" color="#ffc93c" onPress={deleteItemHandler.bind(this,itemData.item.id)}></Button>
                </View>
           </ProductRender>}
           />
        </View>
        
    )
}
userProductsScreen.navigationOptions =navData=> {
    return {
    headerTitle : 'Your Products',
    headerStyle:{
        backgroundColor:'#150485',
        
    },
    headerTintColor :'#ffc93c',
    headerLeft : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
    <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}  />
    </HeaderButtons>,
    headerRight :<HeaderButtons HeaderButtonComponent={customHeaderButton}>
    <Item title="create" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={()=>{navData.navigation.navigate('editProducts')}}  />
    </HeaderButtons>
    }
}
const mapStateToProps = state =>{
    return {
        products : state.products.userProducts
    }
}
export default connect(mapStateToProps)(userProductsScreen);