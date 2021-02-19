export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDER = 'FETCH_ORDER';
import Order from '../../Models/Order';

export const fetchOrder=()=>{
    return async (dispatch,getState) =>{
        //sending a GET reques to fetch all products
        const userId = getState().auth.userId;
        try{
         const response = await fetch(`https://e-commerce-rn-default-rtdb.firebaseio.com/orders/${userId}.json`);
         if(!response.ok) //response.ok means we have 200 code ----- !response.ok means 400,500code
         {
            throw new Error('Something Went Wrong');
         } 
         const resData = await response.json();
         //console.log(resData); // we get resData as an object thus we convert it into an array
         const fetchedOrders = [];
         for(const key in resData)
         {
             fetchedOrders.push(new Order(key,resData[key].cartItems,resData[key].totalAmount,new Date(resData[key].date)));
         }
         dispatch({
            type :FETCH_ORDER,
            orders : fetchedOrders
         })
        }catch(err){
           throw err
        }
     }
}
export const addOrder = (cartItems,totalAmount)=>{
    return async (dispatch,getState)=>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://e-commerce-rn-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method : 'POST',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify({ //converts normal JS to JSON
              cartItems,
              totalAmount,
              date : date.toISOString()
            })
         })
         const resData =  await response.json();
        dispatch({
            type:ADD_ORDER,id:resData.name,items:cartItems,amount:totalAmount,date : date
        })
    }
    
}
