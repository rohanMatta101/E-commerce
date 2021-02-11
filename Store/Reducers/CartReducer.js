
import {ADD_TO_CART,REMOVE_FROM_CART} from '../Actions/CartActions';
import {ADD_ORDER} from '../Actions/orderActions';
import CartItem from '../../Models/CartItem';
import { DELETE_PRODUCT } from '../Actions/ProductActions'

const initialState={
   item:{},
   totalAmount:0
}

const cartReducer=(state=initialState,action)=>{
   switch(action.type)
   {
       case ADD_TO_CART:
           const addedProduct = action.product;
           const price=addedProduct.price;
           const title=addedProduct.title;

           if(state.item[addedProduct.id])
           {
                //a same element is being added thus we will increase the quantity
                const updatedCartItem = new CartItem(
                    state.item[addedProduct.id].Quantity + 1,
                    price,
                    title,
                    state.item[addedProduct.id].sum + price
                )
                return {
                    ...state,
                    item:{...state.item , [addedProduct.id]:updatedCartItem},
                    totalAmount : state.totalAmount + price

                }
           }
           else{
               const newCartItem = new CartItem(1,price,title,price);
               return {
                   ...state,
                   item:{...state.item , [addedProduct.id]:newCartItem},
                   totalAmount : state.totalAmount + price
               }
           }
        case REMOVE_FROM_CART:
            const currentQty = state.item[action.prodId].Quantity;
            let updatedCartItems;
            if(currentQty > 1)
            {
                 
                const updatedCartItem = new CartItem(state.item[action.prodId].Quantity - 1,state.item[action.prodId].prodPrice,state.item[action.prodId].prodTitle,state.item[action.prodId].sum - state.item[action.prodId].prodPrice);
                updatedCartItems = {...state.item,[action.prodId]:updatedCartItem}
            }
            else{
                
                updatedCartItems = {...state.item};
                delete updatedCartItems[action.prodId];
            }
            return {
                ...state,
                item:updatedCartItems,
                totalAmount: state.totalAmount - state.item[action.prodId].prodPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.item[action.prodId])
            {
                return state
            }
            else{
            const updatedCart = {...state.item}
            const amountTbeDeleted = state.item[action.prodId].prodPrice * state.item[action.prodId].Quantity;
            delete updatedCart[action.prodId];
            return  {
                ...state,
                totalAmount : state.totalAmount - amountTbeDeleted,
                item : updatedCart,
            }       
            }

   }
   return {
       ...state}
}

export default cartReducer;