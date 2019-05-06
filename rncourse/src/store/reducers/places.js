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
            uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303.jpg"
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
