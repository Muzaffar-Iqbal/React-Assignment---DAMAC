import axios from "axios";

export const verifyUser = (authToken) => (dispatch) => {
  let headers = { headers: { authToken: authToken } };
  return axios
    .get(getAPIUrl() + "user", headers)
    .then(function (response) {
      if (!(response.data.data.error || response.data.data.authError)) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, errors: response.data.data.msg };
      }
    })
    .catch(function (error) {
      return { status: false };
    });
};

export const getAPIUrl = () => {
  let ENV_TYPE = process.env.ENV_TYPE;
  if (ENV_TYPE === "production") {
    return process.env.API_URL_PRODUCTION;
  } else {
    return process.env.API_URL_DEVELOPMENT || "http://localhost:3001/api/";
  }
};

export const getBaseUrl = () => {
  let BASE_URL = process.env.BASE_URL || "http://localhost:3001";
  return BASE_URL;
};

let isLocalStorageAvailable = () => {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem("TEST", "TEST");
      localStorage.removeItem("TEST");
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

export const setStorage = (key, value, duration = 30) => {
  try {
    if (isLocalStorageAvailable()) {
      //  write in local storage

      let user = {};

      if (localStorage.getItem("user")) {
        //  user data exists

        user = JSON.parse(localStorage.getItem("user"));
      }

      user[key] = value;

      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (e) {
    errorLogger(e);
  }
};

export const getStorage = (key) => {
  try {
    if (isLocalStorageAvailable()) {
      if (localStorage.getItem("user")) {
        //  user data exists

        let user = JSON.parse(localStorage.getItem("user"));

        if (user[key]) {
          //  key exists

          return user[key];
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    errorLogger(e);
  }
};

export const removeUser = () => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem("user");
    }
  } catch (e) {
    errorLogger(e);
  }
};

export const logger = (massage = "", data) => {
  if (data) {
    console.log(massage, data);
  } else {
    console.log(massage);
  }
};

export const errorLogger = (massage = "", data) => {
  if (data) {
    console.error(massage, data);
  } else {
    console.error(massage);
  }
};
