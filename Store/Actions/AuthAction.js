/*export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';*/
export const LOGOUT  = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
import AsyncStorage from '@react-native-community/async-storage';
let timer;
export const authenticate = (token,userId,expiryTime)=>{
    return dispatch=>{
        dispatch(setTimerLogout(expiryTime));
        dispatch({
            type :AUTHENTICATE,
            token : token,
               userId : userId
        })

    }
    
}
export const logout = ()=>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
}
const clearLogoutTimer=()=>{
    if(timer)
    {
        clearTimeout(timer);
    }
}
const setTimerLogout = (expiryTime)=>{
  return dispatch=>{
      timer = setTimeout(()=>{
          dispatch(logout());
      },expiryTime)
  }
}
export const signup = (email,password) =>{
   return async dispatch=>{
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDErXuuWUuKfC8FYtlWO9Oj3WKB9qK2-P8',{
           method :'POST',
           headers :{
            'Content-Type':'application/json'
           },
           body : JSON.stringify({ //we are sending a request in a format in which javascript is mapped to JSON by stringify
               email : email,
               password : password,
               returnSecureToken : true
           })
       })
       if(!response.ok)
        {
            const errorResData = await response.json();
            let message="Something Went Wrong";
            if(errorResData.error.message === 'EMAIL_EXISTS')
            {
                message = "Email Already Exists!!"; 
            }
            
            throw new Error(message);
        }
       const resData = await response.json();
       console.log(resData);
       dispatch(authenticate(resData.idToken,resData.localId,parseInt(resData.expiresIn)*1000));
       const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
   }
}
export const login = (email,password) =>{
    return async dispatch=>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDErXuuWUuKfC8FYtlWO9Oj3WKB9qK2-P8',{
            method :'POST',
            headers :{
             'Content-Type':'application/json'
            },
            body : JSON.stringify({ //we are sending a request in a format in which javascript is mapped to JSON by stringify
                email : email,
                password : password,
                returnSecureToken : true
            })
        })
        if(!response.ok)
        {
            const errorResData = await response.json();
            let message="Something Went Wrong";
            if(errorResData.error.message === 'EMAIL_NOT_FOUND')
            {
                message = "Email Entered could not be found!"; 
            }
            else if(errorResData.error.message === 'INVALID_PASSWORD!!')
            {
                message = "Invalid Password entered";
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.idToken,resData.localId,parseInt(resData.expiresIn)*1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
 }
 const saveDataToStorage = (token,userId,expiryDate)=>{
     AsyncStorage.setItem('userData',JSON.stringify({
         token : token,
         userId : userId,
         expiryDate : expiryDate.toISOString()
     }))
 }