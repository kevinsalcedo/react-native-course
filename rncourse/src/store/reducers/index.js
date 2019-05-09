import placesReducer from "./places";
import { combineReducers } from "redux";
import uiReducer from "./ui";
import authReducer from "./auth";

export default combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer
});
