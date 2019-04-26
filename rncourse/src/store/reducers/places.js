import * as actions from "../actions";
import * as types from "../actions/types";

const INITIAL_STATE = {
  places: [],
  place: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          placeName: action.payload,
          image: {
            uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303.jpg"
          }
        })
      };
    case types.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== state.place.key),
        place: null
      };
    case types.SELECT_PLACE:
      return {
        ...state,
        place: state.places.find(place => place.key === action.payload)
      };
    case types.DESELECT_PLACE:
      return {
        ...state,
        place: null
      };
    default:
      return state;
  }
};
