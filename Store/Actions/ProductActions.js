export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const deleteProduct = (productId)=>{
   return {type:DELETE_PRODUCT,prodId : productId}
}
export const createProduct = (title,imageUrl,description,price)=>{
   return {
       type: CREATE_PRODUCT,
       title : title,
       imageUrl : imageUrl,
       description : description,
       price : price

   }
}
export const updateProduct =(id,title,imageUrl,description)=>{
   return {
       type : UPDATE_PRODUCT,
       prodId : id,
       title : title,
       imageUrl : imageUrl,
       description : description,
   }
}