import React,{useState,useCallback,useEffect,useReducer} from 'react';
import { View,Text,ScrollView,TextInput,StyleSheet,Platform,Alert,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/customHeaderButtons';
import * as productActions from '../../Store/Actions/ProductActions';
import  { connect,useDispatch } from 'react-redux';
const FORM_UPDATE = 'FORM_UPDATE';
const formReducer=(state,action)=>{ //behaves "LIKE a" Reducer
    if(action.type === FORM_UPDATE)
    {
       const updatedInputValues={
           ...state.inputValues,
           [action.inputType] : action.value 
        }
        const updatedInputValidity={
            ...state.inputValidities,
            [action.inputType] : action.validity
        }
        let updatedFormIsValid=true;
        for(const key in updatedInputValidity)
        {
            updatedFormIsValid=updatedFormIsValid&&updatedInputValidity[key]
        }
        return {
            formValid:updatedFormIsValid,
            inputValues : updatedInputValues,
            inputValidities : updatedInputValidity
        }   
    }
    return state;
}
const editProducts = props =>{
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const toBeEditedProduct = props.products.find(prod => prod.id === prodId);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    //console.log(props.navigation.getParam('productId'))
    
    const [formState,dispatchFormState] = useReducer(formReducer,{ //formstate always gives the present/current state
        //dispatchFormstate dispatches actions to change form state
        inputValues:{
            title : toBeEditedProduct ? toBeEditedProduct.title : '' ,
            imageUrl : toBeEditedProduct ? toBeEditedProduct.ImageUrl : '',
            description : toBeEditedProduct ? toBeEditedProduct.description : '',
            price :  ''
        },
        inputValidities :{
            title : toBeEditedProduct ? true : false,
            imageUrl : toBeEditedProduct ? true : false,
            description : toBeEditedProduct ? true : false,
            price : toBeEditedProduct ? true : false,
        },
        formValid : toBeEditedProduct ? true : false
    })
    useEffect(()=>{
        if(error)
        {
            Alert.alert('Something went wrong',error,[{
                text : 'Okay'
            }])
        }
    },[error])
    const submitHanlder=  useCallback(async()=>{
        if(!formState.formValid)
        {
           Alert.alert('Invalid Input!','Try again',[{
               text :'Okay',
               style:'default'
           }])
           return;
        }
        setIsLoading(true);
        setError(null);
        try{
        if(toBeEditedProduct)
        {
         await dispatch(productActions.updateProduct(toBeEditedProduct.id,formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.description));
        }
        else{
          await dispatch(productActions.createProduct(formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.description,+formState.inputValues.price));
        }
        props.navigation.goBack();
        }catch(err)
        {
            setError(err.message);
        }
        setIsLoading(false);
        
     },[dispatch,prodId,formState]);

     useEffect(()=>{
         props.navigation.setParams({submit : submitHanlder})
     },[submitHanlder]);

    const textChangeHandler=(inputIdentifier,text)=>{ //current value of the input is automatically passed to this fxn when called from onChangeText 
        let isValid =false;
       if(text.trim().length > 0)
       {
           isValid=true;
       }
       dispatchFormState({type : FORM_UPDATE,value : text, validity :isValid, inputType : inputIdentifier })
    } 
    
     if(isLoading)
     {
         return <View style={{flex :1,justifyContent:'center',alignItems:'center'}}>
             <ActivityIndicator size="large" color="default" />
         </View>
     }
    return (
        <KeyboardAvoidingView behavior="padding" style={{flex:1}} >
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput style={styles.input} value={formState.inputValues.title} onChangeText={textChangeHandler.bind(this,'title')} keyboardType='default'/>
                </View>
                {toBeEditedProduct?  null :(
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Price</Text>
                    <TextInput style={styles.input}  value={formState.inputValues.price} onChangeText={textChangeHandler.bind(this,'price')} keyboardType='decimal-pad'/>
                </View>)}
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Image Url</Text>
                    <TextInput style={styles.input} value={formState.inputValues.imageUrl} onChangeText={textChangeHandler.bind(this,'imageUrl')} keyboardType="default"/>
                </View>
                <View style={styles.formcontrol}>
                    <Text style={styles.text}>Description</Text>
                    <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={textChangeHandler.bind(this,'description')} keyboardType="default"/>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}
editProducts.navigationOptions = navData=>{
    const submitFXN = navData.navigation.getParam('submit');
    return {
        headerTitle : navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerStyle:{
            backgroundColor:'#150485',
            
        },
        headerTintColor :'#ffc93c',
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