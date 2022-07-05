import { getAPIUrl } from "../../../generalUtility";
import axios from "axios";

export const setLoggedOut = () => {
  return { type: "SET_LOGGED_OUT" };
};

export const logout = () => (dispatch) => {
  axios.defaults.headers.common["authToken"] = "";
  return axios
    .post(getAPIUrl() + "user/logout")
    .then(function (response) {
      if (!(response.data.data.error || response.data.data.authError)) {
        dispatch(setLoggedOut());
        dispatch({
          type: "UPDATE_USER_DATA_NAME",
          payload: "",
        });
        dispatch({
          type: "UPDATE_USER_DATA_EMAIL",
          payload: "",
        });
        dispatch({
          type: "UPDATE_TOKEN_USER_DATA",
          payload: "",
        });
        return { status: true };
      } else {
        return { status: false, errors: response.data.errors };
      }
    })
    .catch(function (error) {
      return {
        status: false,
        errors: error.response.data.msg,
      };
    });
};
