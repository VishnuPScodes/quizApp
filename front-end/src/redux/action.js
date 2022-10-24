import exp from "constants"



export const authActions={
    AUTH_ACTION_REQUEST:"AUTH_ACTION_REQUEST",
    AUTH_ACTION_SUCCESS:"AUTH_ACTION_SUCCESS",
    AUTH_ACTION_FAILURE:"AUTH_ACTION_FAILURE",
    ADD_SCORE_SUCCESS:'ADD_SCORE_SUCCESS'
}

export const authSuccess=()=>{
    return {
        type:authActions.AUTH_ACTION_SUCCESS
    }
}

export const authFailure=()=>{
    return {
        type:authActions.AUTH_ACTION_FAILURE
    }
}

export const authRequest=()=>{
    return {
        type:authActions.AUTH_ACTION_REQUEST
    }
}

export const addScore=(payload)=>{
    return {
        type:authActions.ADD_SCORE_SUCCESS,
        payload:payload
    }
}