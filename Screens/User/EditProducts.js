import React,{useState,useCallback,useEffect} from 'react';
import { View,Text,ScrollView,TextInput,StyleSheet,Platform } from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import * as productActions from '../../Store/Actions/ProductActions';
import  { connect,useDispatch } from 'react-redux'
const editProducts = props =>{
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const toBeEditedProduct = props.products.find(prod => prod.id === prodId);
    //console.log(props.navigation.getParam('productId'))
    

    const [title,setTitle] = useState(toBeEditedProduct ? toBeEditedProduct.title : ''); // if product to be edited found we pre populate the fields with its data else we simply leave it blank as we are noew in the case where we are adding data
    const [price,setPrice] = useState('');
    const [imageUrl,setImageUrl] = useState(toBeEditedProduct ? toBeEditedProduct.ImageUrl : '');
    const [description,setDescription] = useState(toBeEditedProduct ? toBeEditedProduct.description : '');
    const submitHanlder=useCallback(()=>{
        if(toBeEditedProduct)
        {
         dispatch(productActions.updateProduct(toBeEditedProduct.id,title,imageUrl,description));
        }
        else{
         dispatch(productActions.createProduct(title,imageUrl,description,+price));
        }
        
        props.navigation.goBack()
     },[dispatch,prodId,title,imageUrl,description,price]);

     useEffect(()=>{
         props.navigation.setParams({submit : submitHanlder})
     },[submitHanlder]);
     
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text=>setTitle(text)}/>
                </View>
                {toBeEditedProduct?  null :(
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Price</Text>
                    <TextInput style={styles.input}  value={price} onChangeText={text=>setPrice(text)}/>
                </View>)}
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Image Url</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text=>setImageUrl(text)}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text=>setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    )
}
editProducts.navigationOptions = navData=>{
    const submitFXN = navData.navigation.getParam('submit');
    return {
        headerTitle : navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item title="checkmark" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFXN}  />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    form : {
        margin : 20
    },
    formcontrol:{
        margin : 15
    },
    text:{
      fontSize : 19,
      fontWeight : 'bold'
    },
    input:{
       borderBottomColor : 'grey',
       paddingHorizontal : 2,
       paddingVertical : 5,
       borderBottomWidth : 1.0
    }

})
const mapStateToProps=state=>{
    return {
      products : state.products.userProducts
    }
}
export default connect(mapStateToProps)(editProducts);