import PRODUCTS from '../../Data/dummy-data';
import {DELETE_PRODUCT} from '../Actions/ProductActions';
import Product from '../../Models/Products';
import { CREATE_PRODUCT,UPDATE_PRODUCT } from '../Actions/ProductActions';
const initialState={
    availableProducts : PRODUCTS, //LIST OF ALL PRODUCTS
    userProducts : PRODUCTS.filter(prod => prod.ownerId === 'u1') //LIST OF PRODUCTS OF THE CURRENTLY LOGGED IN USER
}

const productReducer=(state=initialState,action)=>{
    switch(action.type)
    {
       case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts : state.availableProducts.filter(product=>product.id !== action.prodId),
                userProducts : state.userProducts.filter(product=>product.id !== action.prodId)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(new Date().toString(),"u1",action.title,action.imageUrl,action.description,action.price);
            return {
                ...state,
                availableProducts : state.availableProducts.concat(newProduct),
                userProducts : state.userProducts.concat(newProduct)

            }
        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex(prod=>prod.id === action.prodId);
            const updatedProduct = new Product(
                action.prodId,//adding passed id
                state.userProducts[prodIndex].ownerId,//using old owner Id
                action.title,// edited title being added
                action.imageUrl,//edited image being added
                action.description,//edited descriptiom
                state.userProducts[prodIndex].price);//old/fixed price being used;
            const updatedUserProducts = [...state.userProducts];//* ALWAYS MAKE CHANGE IN COPY OF THE PRESENT STATE*/
            updatedUserProducts[prodIndex]=updatedProduct;
            
            //now updating available products
            const prodInd = state.availableProducts.findIndex(prod=>prod.id === action.prodId);
            const updatedAvailableProducts = [...state.availableProducts]; //* ALWAYS MAKE CHANGE IN COPY OF THE PRESENT STATE*/
            updatedAvailableProducts[prodInd]=updatedProduct;
            return {
                ...state,
                userProducts : updatedUserProducts,
                availableProducts : updatedAvailableProducts
            }
    }
    return state;
}
export default productReducer;