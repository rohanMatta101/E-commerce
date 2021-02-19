import {ADD_ORDER,FETCH_ORDER} from '../Actions/orderActions';
import Order from '../../Models/Order';
const initialState = {
    orders:[]
}
const orderReducer =(state=initialState,action)=>{
   switch(action.type)
   {
       case FETCH_ORDER:
           return {
               orders : action.orders
           }
       case ADD_ORDER:
           const newOrder = new Order(action.id,action.items,action.amount,action.date);
           return {
               ...state,
               orders : state.orders.concat(newOrder)
           }   

   }
   return {
       ...state
   }
}
export default orderReducer;