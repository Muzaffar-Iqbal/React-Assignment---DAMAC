import { getAPIUrl } from "../../generalUtility";
import axios from "axios";

export const signUp = (data) => (dispatch, getState) => {
  return axios
    .post(getAPIUrl() + "user/signup", data)
    .then(function (response) {
      if (!response.data.error) {
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
        return { status: true, data: response.data.data };
      } else {
        return { status: false, errors: response.data.msg };
      }
    })
    .catch(function (error) {
      return {
        status: false,
        errors: error.response.data.msg,
      };
    });
};
