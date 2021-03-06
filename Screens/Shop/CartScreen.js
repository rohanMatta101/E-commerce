import React,{useState} from 'react';
import { View,Text,Button,StyleSheet,ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
//import { FlatList } from 'react-native-gesture-handler';
import { connect,useDispatch } from 'react-redux';
import * as CartActions from '../../Store/Actions/CartActions';
import * as orderActions from '../../Store/Actions/orderActions'; 
 
import CartRender from '../../Components/Shop/CartRender';

const cartScreen = props=>{
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const cartItemArray=[]
    for(const key in props.cart.item )
    {
        cartItemArray.push({
            productId : key,
            price : props.cart.item[key].prodPrice,
            title : props.cart.item[key].prodTitle,
            sum : props.cart.item[key].sum,
            quantity : props.cart.item[key].Quantity,
        })
    }
    const orderDispatch=async ()=>{
        setIsLoading(true);
        await dispatch(orderActions.addOrder(props.cart.item,props.cart.totalAmount))
        setIsLoading(false);
    }
    //console.log(cartItemArray);
   return (
       <View>
           <View style={styles.summary}>
           <Text style={{fontSize:18,marginTop:8}}>Total Amount:${Math.round(props.cart.totalAmount.toFixed(2)*100)/100}</Text>
           {isLoading ? <ActivityIndicator size="small" color="blue"/> :(
           <Button title="Order Now" color="#150485" disabled={cartItemArray.length === 0} onPress={orderDispatch} />)}
           </View>
           <FlatList data={cartItemArray} keyExtractor={item=>item.productId} renderItem={itemData=><CartRender  title={itemData.item.title} quantity={itemData.item.quantity} onremove={()=> dispatch(CartActions.removeFromCart(itemData.item.productId))}/>}/>
       </View>
       
   )
}
cartScreen.navigationOptions = navData =>{
    return {
        headerTitle : 'Your Cart',
        headerStyle:{
            backgroundColor:'#150485',
            
        },
        headerTintColor :'#ffc93c',
    }
}
const styles = StyleSheet.create({
    summary:{
        shadowColor:'grey',
        shadowOpacity:0.3,
        shadowOffset:{width: 2, height:2},
        shadowRadius:8,
        elevation:5,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        alignSelf:'center',
        marginTop:30,
        padding:10,
        borderRadius:15
    },

})
const mapStateToProps=(state)=>{
    return {
        cart : state.cart
    }
 }
export default connect(mapStateToProps)(cartScreen);