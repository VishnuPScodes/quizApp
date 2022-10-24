import { authActions } from "./action"


const initState={
    auth:true,
    error:false,
    loading:false,
    scores:[]
}

export const authReducer=(state=initState,action)=>{
    switch(action.type){
        case authActions.AUTH_ACTION_FAILURE :{
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        }
        case authActions.AUTH_ACTION_SUCCESS :{
            return {
                ...state,
                auth:true,
                loading:false
            }
        }
        case authActions.AUTH_ACTION_REQUEST :{
            return {
                ...state,
                loading:true,
            
            }
        }
        case authActions.ADD_SCORE_SUCCESS :{
            return {
                ...state,
                scores:[...state.scores,action.payload]
            }
        }
        default :
        return state
    }
}