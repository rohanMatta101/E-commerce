
import React from 'react';
//import {  View } from 'react-native';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './Store/Reducers/ProductReducers';
import cartReducer from './Store/Reducers/CartReducer';
import orderReducer from './Store/Reducers/OrderReducer';
import ShopNavigator from './Navigation/ShopNavigator';

const rootReducer = combineReducers({
  products : productReducer,
  cart : cartReducer,
  orders : orderReducer
})
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
