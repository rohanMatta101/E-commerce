import React,{useState,useReducer,useCallback,useEffect} from 'react';
import { useDispatch} from 'react-redux'
import { StyleSheet,View,Text,ScrollView,KeyboardAvoidingView,TextInput,Button,ActivityIndicator,Alert } from 'react-native';
import * as authActions from '../../Store/Actions/AuthAction';
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
const authScreen = (props)=>{
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [isSignUp,setIsSignUp] = useState(false);
    
    const authHandler = async ()=>{
        if(isSignUp)
        {
            setError(null);
            setIsLoading(true);
            try{
            await dispatch(authActions.signup(formState.inputValues.email,formState.inputValues.password));

            }catch(err)
            {
                setError(err.message);
            }
            setIsLoading(false);

        }
        else{
            setError(null);
            setIsLoading(true);
            try{
            await dispatch(authActions.login(formState.inputValues.email,formState.inputValues.password));
              props.navigation.navigate('Shop');
            }catch(err)
            {
                setError(err.message);
                setIsLoading(false);
            }
            
        }
        
    }
    useEffect(()=>{
        if(error)
        {
             Alert.alert('An Error occured',error,[{
                 text :'Okay'
             }])
        }
      },[error]);
    const [formState,dispatchFormState] = useReducer(formReducer,{ //formstate always gives the present/current state
        //dispatchFormstate dispatches actions to change form state
        inputValues:{
            email : '',
            password : ''
        },
        inputValidities :{
            email : false,
            password : false
        },
        formValid : false
    })
    const textChangeHandler=useCallback((inputIdentifier,text)=>{ //current value of the input is automatically passed to this fxn when called from onChangeText 
        let isValid =false;
       if(text.length > 0)
       {
           isValid=true;
       }
       dispatchFormState({type : FORM_UPDATE,value : text, validity :isValid, inputType : inputIdentifier })
    },[dispatchFormState]) 
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="padding" >
            <ScrollView>
                <View style={styles.form}>
                <View style={styles.formcontrol}>
                <Text style={styles.text}>Email address</Text>
               <TextInput style={styles.input} value={formState.inputValues.email} onChangeText={text=>textChangeHandler('email',text)} keyboardType="email-address"/>
               </View>
               <View style={styles.formcontrol}>
                <Text style={styles.text}>Password</Text>
               <TextInput style={styles.input} value={formState.inputValues.password} onChangeText={text=>textChangeHandler('password',text)} secureTextEntry={true} keyboardType="default"/>
               </View>
               
               <View style={styles.buttons}>
                  {isLoading ? <ActivityIndicator size="small" color="#150485"/> : <Button title={isSignUp ? 'SignUp' : 'Login'} color="#150485" onPress={authHandler}/>}
                </View>
                <View style={styles.buttons}>  
                 <Button title={isSignUp ? 'Switch to Login' : 'Switch to SignUp'} color="#150485" onPress={()=>setIsSignUp(prevState=>!prevState)}/>
               </View>

               </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}
authScreen.navigationOptions = {
    headerTitle : 'Authenticate',

}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    form : {
        margin : 30,
        shadowColor:'grey',
    shadowOpacity:0.5,
    shadowOffset:{width: 2, height:2},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    borderRadius : 10,
    padding : 15
        
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
    },
    buttons :{
      flexDirection : 'row',
      justifyContent :"space-around",
      
    }

})
export default authScreen;