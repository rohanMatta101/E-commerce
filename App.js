
import React from 'react';
//import {  View } from 'react-native';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './Store/Reducers/ProductReducers';
import cartReducer from './Store/Reducers/CartReducer';
import orderReducer from './Store/Reducers/OrderReducer';
import NavigationContainer from './Navigation/NavigationContainer';
import authReducer from './Store/Reducers/Authreducer';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products : productReducer,
  cart : cartReducer,
  orders : orderReducer,
  auth : authReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
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
