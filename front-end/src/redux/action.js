import exp from "constants";

export const authActions = {
  AUTH_ACTION_REQUEST: "AUTH_ACTION_REQUEST",
  AUTH_ACTION_SUCCESS: "AUTH_ACTION_SUCCESS",
  AUTH_ACTION_FAILURE: "AUTH_ACTION_FAILURE",
  ADD_SCORE_SUCCESS: "ADD_SCORE_SUCCESS",
  ADD_TOKEN: "ADD_TOKEN",
  EMPTY_SCORE_ARRAY: "EMPTY_SCORE_ARRAY",
  ADD_SCORE: "ADD_SCORE",
  ADD_ID: "ADD_ID",
  ADD_BEST_TIME:"ADD_BEST_TIME",
  LOGOUT:"LOGOUT"
};

export const addUserScore=(payload)=>{
  return {
    type:authActions.ADD_SCORE,
    payload:payload
  }
}
export const authSuccess = () => {
  return {
    type: authActions.AUTH_ACTION_SUCCESS,
  };
};

export const authFailure = () => {
  return {
    type: authActions.AUTH_ACTION_FAILURE,
  };
};

export const logout=()=>{
  return {
    type:authActions.LOGOUT
  }
}

export const authRequest = () => {
  return {
    type: authActions.AUTH_ACTION_REQUEST,
  };
};

export const addScore = (payload) => {
  return {
    type: authActions.ADD_SCORE_SUCCESS,
    payload: payload,
  };
};
export const addId = (payload) => {
  return {
    type: authActions.ADD_ID,
    payload: payload,
  };
};  

export const addToken = (payload) => {
  return {
    type: authActions.ADD_TOKEN,
    payload: payload,
  };
};


export const emptyScoreArray=()=>{
  return {
    type:authActions.EMPTY_SCORE_ARRAY
  }
}

export const Addbesttime=(payload)=>{
  return {
    type:authActions.ADD_BEST_TIME,
    payload:payload
  }
}