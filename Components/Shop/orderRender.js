import React from 'react';
import {StyleSheet,View,Text, Button} from 'react-native';

//import cartRender from '../../Components/Shop/CartRender';

//import CartRender from '../../Components/Shop/CartRender';

const orderRender = (props) =>{
    //const [showDetail,setShowDetail]= useState(false);
    
   return (
       <View>
           <View style={styles.summary}>
               <Text>${props.amount.toFixed(2)}</Text>
               <Text>{props.date}</Text>
           </View>
              
       </View>
   )
   
}
const styles = StyleSheet.create({
  summary:{
    shadowColor:'grey',
    shadowOpacity:0.3,
    shadowOffset:{width: 2, height:2},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    width:'70%',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
    padding:15,
    borderRadius:15
  }
})
export default orderRender;
/*{showDetail &&
           <View>
               {props.items.map(cartItem=>//These items are basically cart Items
                   <CartRender title={cartItem.prodTitle} quantity={cartItem.Quantity} deletable={false}/>
               )}
           </View>}
           <Button title="Show Details" onPress={()=>{
               setShowDetail(prevState=>!prevState);
           }}/>*/