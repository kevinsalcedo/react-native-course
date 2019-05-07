import placesReducer from "./places";
import { combineReducers } from "redux";
import uiReducer from "./ui";

export default combineReducers({
  places: placesReducer,
  ui: uiReducer
});
