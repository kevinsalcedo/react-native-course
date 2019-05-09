import { AUTH_SET_TOKEN } from "../actions/types";

const initialState = {
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export default authReducer;
