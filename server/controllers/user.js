import UserService from "../services/userService";
import { encode, setCookie, sendResponse } from "../helpers/utility";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!(email && password)) {
    sendResponse(res, 401, {}, 1, 0, "Invalid email or password provided.");
  } else {
    let userService = new UserService();
    let user = await userService.getOne({ email: email }, [
      "name",
      "email",
      "password",
    ]);
    if (user) {
      let passwordMatched = await bcrypt.compareSync(password, user.password);
      if (passwordMatched) {
        let authToken = encode(user._id);
        let cookieExpiration = 24 * 60 * 60 * 1000; // 1 day
        setCookie(res, "authToken", authToken, cookieExpiration);
        delete user._doc.password;
        sendResponse(
          res,
          200,
          {
            authToken,
            user: user,
          },
          0,
          0
        );
      } else {
        sendResponse(res, 401, {}, 1, 0, "Invalid email or password provided.");
      }
    } else {
      sendResponse(res, 401, {}, 1, 0, "Invalid email or password provided.");
    }
  }
};
const signUp = async (req, res) => {
  let data = req.body;
  let userService = new UserService();
  if (
    data.email &&
    data.name &&
    data.password &&
    data.confirmPassword &&
    data.password == data.confirmPassword
  ) {
    let userData = await userService.getOne({ email: data.email }, ["_id"]);
    if (userData) {
      sendResponse(
        res,
        400,
        {},
        1,
        0,
        "You have already registered. Please log in."
      );
    } else {
      let response = await userService.create(data);
      if (response.status) {
        let user = response.user;
        let authToken = encode(user._id);
        sendResponse(res, 200, {
          authToken,
          user: { email: user.email, name: user.name },
        });
      } else {
        sendResponse(res, 400, response, 1);
      }
    }
  } else {
    sendResponse(res, 400, {}, 1, 0, "Invalid request.");
  }
};
const logout = async (req, res) => {
  res.clearCookie("authToken");
  sendResponse(res, 200, {}, 0, 0, "Logout Successfully.");
};

const getUser = async (req, res) => {
  let data = req.body;
  if (data.userId) {
    let UserService = new UserService();
    let user = await UserService.getOne({ _id: data.userId }, ["-password"]);
    sendResponse(res, 200, user, 0, 0);
  } else {
    sendResponse(res, 403, {}, 0, 1, "Invalid Request.");
  }
};
export default {
  login,
  logout,
  signUp,
  getUser,
};
