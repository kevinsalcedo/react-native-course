import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let composeEnhancers = compose;

const configureStore = () => {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
