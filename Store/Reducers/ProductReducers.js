import PRODUCTS from '../../Data/dummy-data';
const initialState={
    availableProducts : PRODUCTS, //LIST OF ALL PRODUCTS
    userProducts : PRODUCTS.filter(prod => prod.ownerId === 'u1') //LIST OF PRODUCTS OF THE CURRENTLY LOGGED IN USER
}

const productReducer=(state=initialState,actions)=>{
    return state;
}
export default productReducer;