import placesReducer from "./places";
import { combineReducers } from "redux";

export default combineReducers({
  places: placesReducer
});
