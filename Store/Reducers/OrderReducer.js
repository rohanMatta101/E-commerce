import {ADD_ORDER} from '../Actions/orderActions';
import Order from '../../Models/Order';
const initialState = {
    orders:[]
}
const orderReducer =(state=initialState,action)=>{
   switch(action.type)
   {
       case ADD_ORDER:
           const newOrder = new Order(new Date().toString(),action.items,action.amount,new Date());
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