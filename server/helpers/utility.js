import Cryptr from "cryptr";
import C from "../../constants";

export const encode = (user_id) => {
  let cryptr = new Cryptr(C.DAMAC_SECRET);
  return cryptr.encrypt(user_id);
};

export const decode = (authToken) => {
  let cryptr = new Cryptr(C.DAMAC_SECRET);
  return cryptr.decrypt(authToken);
};
export const encryptPassword = (password) => {
  const bcrypt = require("bcryptjs");
  const salt_rounds = 10;
  return bcrypt.hashSync(password, salt_rounds, function (err, hash) {
    return hash;
  });
};

export const decryptPassword = (password) => {
  let cryptr = new Cryptr(C.PASSWORD_HASH);
  return cryptr.decrypt(password);
};

export const setCookie = (res, name, val, maxAge) => {
  let options = {
    maxAge: maxAge,
    httpOnly: true,
    signed: true,
  };
  res.cookie(name, val, options);
};

export const getCookie = (req, name) => {
  try {
    let cookies = req.signedCookies;
    if (name in cookies) {
      return cookies[name];
    } else {
      return null;
    }
  } catch (e) {
    return null;
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

export const sendResponse = (
  response,
  status = 200,
  data = {},
  error = 0,
  authError = 0,
  msg = ""
) => {
  response.status(status).json({
    data,
    error,
    authError,
    msg,
  });
};

export const createFileName = (name, type = "") => {
  if (type) {
    let formate = type.split("/")[1];
    return (
      Math.random().toString(36).substring(2, 10) + "_" + name + "." + formate
    );
  }
  return Math.random().toString(36).substring(2, 10) + "_" + name;
};
