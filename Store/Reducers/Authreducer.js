//import { exp } from 'react-native-reanimated'
import { AUTHENTICATE, LOGOUT } from '../Actions/AuthAction'
const initialState={
    token :null,
    userId : null
}
const authReducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case AUTHENTICATE:
            return {
                token:action.token,
                userId : action.userId
            }
        case LOGOUT:
            return initialState;
        /*case SIGN_UP:
            return {
                token:action.token,
                userId : action.userId
            }*/
        default:
            return state
    }
}
export default authReducer;