import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const cartRender = props =>{
  return (
      <View style={styles.screen}>
          <View style={styles.summary}>
              <Text>{props.title}</Text>
              <Text>Quantity:{props.quantity}</Text>
          </View>
          
          <TouchableOpacity>
              <Ionicons style={{marginTop:13,marginRight:20}} onPress={props.onremove} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="#150485" size={30}/>
          </TouchableOpacity>
      </View>
  )
}
const styles=StyleSheet.create({
   summary:{
    shadowColor:'grey',
    shadowOpacity:0.3,
    shadowOffset:{width: 2, height:2},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    width:'70%',
    alignSelf:'flex-start',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
    marginLeft:42,
    padding:10,
    borderRadius:15
   },
   screen:{
       flexDirection:'row',
       justifyContent:'space-between'

   }
})
export default cartRender;
