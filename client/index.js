import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import storeCreator from "./reduxStore";
import Routes from "./routes/index";
import {
  verifyUser,
  getStorage,
  removeUser,
  errorLogger,
} from "./generalUtility";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import axios from "axios";

try {
  const app = document.getElementById("app");
  const initialState = app.innerHTML.trim().length
    ? window.__REDUX_STATE__
    : {};
  const renderOrHydrate = app.innerHTML.trim().length ? "hydrate" : "render";

  const store = storeCreator(initialState);
  window.store = store;

  if (process.env.NODE_ENV === "production") {
    if (store.getState().is_logged_in) {
      let { authToken } = store.getState().user;
      axios.defaults.headers.common["authToken"] = authToken;
    }
    ReactDOM[renderOrHydrate](
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>,
      app
    );
  } else {
    let authToken = getStorage("authToken") || "";
    store.dispatch(verifyUser(authToken)).then((response) => {
      if (response.status) {
        axios.defaults.headers.common["authToken"] = authToken;
        store.dispatch({ type: "SET_LOGGED_IN" });
        store.dispatch({
          type: "UPDATE_USER_DATA_NAME",
          payload: response.data.name,
        });
        store.dispatch({
          type: "UPDATE_USER_DATA_EMAIL",
          payload: response.data.email,
        });
        store.dispatch({
          type: "UPDATE_TOKEN_USER_DATA",
          payload: authToken,
        });
      } else {
        removeUser();
      }
      ReactDOM[renderOrHydrate](
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>,
        app
      );
    });
  }
} catch (e) {
  errorLogger(e);
}
