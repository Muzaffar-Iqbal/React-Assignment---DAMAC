import appReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export default (initialState = {}) => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(thunk, logger)(createStore)(
      appReducer,
      initialState
    );
  } else {
    return applyMiddleware(thunk, logger)(createStore)(
      appReducer,
      initialState
    );
  }
};
