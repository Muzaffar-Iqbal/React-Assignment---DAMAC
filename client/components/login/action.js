import { getAPIUrl } from "../../generalUtility";
import axios from "axios";

export const getStarted = () => {
  return { type: "SET_LOGGED_IN" };
};
export const login = (data) => (dispatch, getState) => {
  return axios
    .post(getAPIUrl() + "user/login", data)
    .then(function (response) {
      if (!response.data.data.error) {
        axios.defaults.headers.common["authToken"] =
          response.data.data.authToken;
        dispatch({
          type: "UPDATE_USER_DATA_NAME",
          payload: response.data.data.user.name || "",
        });
        dispatch({
          type: "UPDATE_USER_DATA_EMAIL",
          payload: response.data.data.user.email || "",
        });
        dispatch({
          type: "UPDATE_TOKEN_USER_DATA",
          payload: response.data.data.authToken || "",
        });
        return {
          status: true,
          data: {
            ...response.data.data.user,
            authToken: response.data.data.authToken,
          },
        };
      } else {
        return { status: false, errors: response.data.data.msg };
      }
    })
    .catch(function (error) {
      return {
        status: false,
        errors: error.response.data.msg,
      };
    });
};
