import React from 'react';
import { StyleSheet,Text,View,Button,Image,TouchableNativeFeedback,TouchableOpacity,Platform } from 'react-native';
//import productReducer from '../../Store/Reducers/ProductReducers';
const productRender=(props)=>{
    const TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >=21)
    {
        touchableCmp=TouchableNativeFeedback;
    }
    return (
        <TouchableCmp onPress={props.onSelect} >
        <View style={styles.product}>
            <Image source={{uri:props.imageUrl}} style={styles.image}/>
            <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{props.title}</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>${props.price}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </View>
        </TouchableCmp>
    )
}
const styles=StyleSheet.create({
    product:{
     shadowColor:'grey',
     shadowOpacity:0.3,
     shadowOffset:{width: 2, height:2},
     shadowRadius:8,
     elevation:5,
     backgroundColor:'white',
     height:300,
     margin:20,
     borderRadius:10,
     
    },
    image:{
      width:'100%',
      height:'60%'
    },
    actions:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20,
    }

})
export default productRender;