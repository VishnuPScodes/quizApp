import { authActions } from "./action";

const initState = {
  auth: false,
  error: false,
  loading: false,
  scores: [],
  token: "",
  userScore:""
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.AUTH_ACTION_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case authActions.AUTH_ACTION_SUCCESS: {
      return {
        ...state,
        auth: true,
        loading: false,
      };
    }
    case authActions.AUTH_ACTION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case authActions.ADD_SCORE_SUCCESS: {
      return {
        ...state,
        scores: [...state.scores, action.payload],
      };
    }
    case authActions.ADD_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case authActions.EMPTY_SCORE_ARRAY: {
      return {
        ...state,
        scores: [],
      };
    }
    case authActions.ADD_SCORE: {
      return {
        ...state,
        userScore: action.payload,
      };
    }
    default:
      return state;
  }
};
