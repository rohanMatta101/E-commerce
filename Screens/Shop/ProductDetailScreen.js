import React from 'react';
import {StyleSheet,View,Text,Image, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as cartActions from '../../Store/Actions/CartActions';


const productDetailScreen=(props)=>{
    const dispatch = useDispatch();
    const prodId= props.navigation.getParam('prodId');
    const selectedProduct = props.products.find(prod=>prod.id === prodId);
   return (
       <ScrollView>
    <View>
        <Image style={styles.image} source={{uri:selectedProduct.ImageUrl}}/>
        <View style={styles.button}>
         <Button title="Add to Cart" color="#ffc93c" onPress={()=>dispatch(cartActions.addtocart(selectedProduct))}/>
        </View>
        
        <View style={styles.description}>
            <Text>{selectedProduct.description}</Text>
        </View>
        <Text style={{alignSelf:'center',fontSize:18,marginTop:10}}>${selectedProduct.price}</Text>
    </View>
    </ScrollView>
   )
}
const styles=StyleSheet.create({
    image:{
       width:'100%',
       height:300
    },
    button:{
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'grey',
        width:'60%',
        alignSelf:'center',
        backgroundColor:"#150485"
    },
    description:{
        alignSelf:'center'
    }


});
productDetailScreen.navigationOptions=navData=>{
    const title=navData.navigation.getParam('prodTitle');
    return{
        headerTitle:title,
    }
}
const mapStateToProps=(state)=>{
    return {
        products : state.products.availableProducts //state.products means we go into the product slice of the state
    }
 }
export default connect(mapStateToProps)(productDetailScreen);