export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
//export const CLEAR_CART = 'CLEAR_CART';

export const addtocart=product=>{
    return { type:ADD_TO_CART, product:product }
}
export const removeFromCart=productId=>{
    return { type:REMOVE_FROM_CART, prodId : productId}
}
/*export const clearCart = ()=>{
    return {type:CLEAR_CART}
}*/