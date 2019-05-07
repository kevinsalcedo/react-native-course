import * as actions from "../actions";
import * as types from "../actions/types";

const INITIAL_STATE = {
  places: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          placeName: action.payload.placeName,
          image: {
            uri: action.payload.image.uri
          },
          location: action.payload.location
        })
      };
    case types.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.payload)
      };
    default:
      return state;
  }
};
