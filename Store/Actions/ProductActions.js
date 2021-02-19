//import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Product from "../../Models/Products";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const fetchProducts = () =>{
   return async (dispatch,getState) =>{
      //sending a GET reques to fetch all products
      const userId = getState().auth.userId;
      try{
       const response = await fetch('https://e-commerce-rn-default-rtdb.firebaseio.com/products.json');
       if(!response.ok) //response.ok means we have 200 code ----- !response.ok means 400,500code
       {
          throw new Error('Something Went Wrong');
       } 
       const resData = await response.json();
       //console.log(resData); // we get resData as an object thus we convert it into an array
       const fetchedProducts = [];
       for(const key in resData)
       {
           fetchedProducts.push(new Product(key,resData[key].ownerId,resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price));
       }
       dispatch({
          type :SET_PRODUCTS,
          products : fetchedProducts,
          userProducts : fetchedProducts.filter(prod=>prod.ownerId === userId)
       })
      }catch(err){
         throw err
      }
   }
}
export const deleteProduct = (productId)=>{
   return async (dispatch,getState)=>{
      const token = getState().auth.token;
      const response = await fetch(`https://e-commerce-rn-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,{
         method : 'DELETE'
      })
      //the fetch part is all the async code taking place before dispatching any action
      if(!response.ok)
      {
         throw new Error('Something went wrong');
      }
      dispatch({
         type:DELETE_PRODUCT,prodId : productId
      })
   }
    
}
export const createProduct = (title,imageUrl,description,price)=>{

   return async (dispatch,getState)=>{
      const token = getState().auth.token;
      const userId= getState().auth.userId;
      //this dispatch argument is passed automatically by REDUX THUNK
      //now we can perform any async code before dispatching the action
      const response = await fetch(`https://e-commerce-rn-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
         method : 'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify({ //converts normal JS to JSON
           title,
           imageUrl,
           description,
           price,
           ownerId : userId
         })
      })
      const resData = await response.json();
      //console.log(resData);
      //the fetch part is all the async code taking place before dispatching any action
      dispatch({
            type: CREATE_PRODUCT,
            id:resData.name,
            title : title,
            imageUrl : imageUrl,
            description : description,
            price : price,
            ownerId : userId
      })
      //dispatch will only take place WHEN ALL ASYNC WORK COMPLETE

   }
   
}
export const updateProduct =(id,title,imageUrl,description)=>{
   return async (dispatch,getState)=>{ //dispatch and getState are passed automatically by redux thunk. getState() enables us full acces to our redux store
       const token = getState().auth.token;
       const response = await fetch(`https://e-commerce-rn-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
         method : 'PATCH', //we could have used PUT request here but PUT replaces all data no matter what we have edited
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify({ //converts normal JS to JSON
           title,
           imageUrl,
           description,
         })
      })
      if(!response.ok)
      {
         throw new Error('Something went wrong');
      }
      //the fetch part is all the async code taking place before dispatching any action
      dispatch({
         type : UPDATE_PRODUCT,
       prodId : id,
       title : title,
       imageUrl : imageUrl,
       description : description,
      })

   }
   
       
}