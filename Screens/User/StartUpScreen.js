import React,{useEffect} from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as AuthActions from '../../Store/Actions/AuthAction';
import {useDispatch} from 'react-redux'
const startupScreen = props=>{
    const dispatch = useDispatch();
  useEffect(()=>{
      const tryLogin = async()=>{
          const userData = await AsyncStorage.getItem('userData');
          if(!userData)
          {
              props.navigation.navigate('Auth');
              return ;
          }
          const transformedData = JSON.parse(userData);
          const {token,userId,expiryDate} = transformedData;
          const expirationDate = new Date(expiryDate);
          if(!token || !userId || expirationDate <= new Date())
          {
            props.navigation.navigate('Auth');
            return ;
          }
          props.navigation.navigate('Shop');
          const remainingExpTime = expirationDate.getTime() - new Date().getTime();
          dispatch(AuthActions.authenticate(token,userId,remainingExpTime));
      }

      tryLogin();
  },[dispatch])
  return (
      <View>
         <ActivityIndicator size="large"/>
      </View>
  )
}
const styles = StyleSheet.create({

})
export default startupScreen;