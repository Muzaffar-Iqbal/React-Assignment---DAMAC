import { combineReducers } from "redux";

export const userData = (
  state = { name: "", email: "", authToken: "" },
  action
) => {
  switch (action.type) {
    case "UPDATE_USER_DATA_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_USER_DATA_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_TOKEN_USER_DATA":
      return { ...state, authToken: action.payload };
    default:
      return state;
  }
};

export const logIn = (state = false, action) => {
  if (action.type === "SET_LOGGED_IN") {
    return true;
  } else if (action.type === "SET_LOGGED_OUT") {
    return false;
  } else {
    return state;
  }
};

export default combineReducers({
  is_logged_in: logIn,
  user: userData,
});
