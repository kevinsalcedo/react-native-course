import * as actions from "../actions";
import * as types from "../actions/types";

const INITIAL_STATE = {
  places: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case types.DELETE_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.filter(place => place.key !== action.payload)
    //   };
    case types.SET_PLACES:
      return {
        ...state,
        places: action.payload.places
      };
    case types.REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.payload.key)
      };
    default:
      return state;
  }
};
