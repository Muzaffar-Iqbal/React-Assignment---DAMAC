import UserService from "../services/userService";
import { decode, sendResponse } from "../helpers/utility";
module.exports = async function (req, res) {
  const authToken = req.header("authToken");
  if (authToken) {
    let userId = decode(authToken);
    let userService = new UserService();
    let userData = await userService.getOne({ _id: userId }, ["email", "name"]);
    if (userData) {
      sendResponse(res, 200, userData);
    } else {
      sendResponse(res, 403, {}, 0, 1, "Invalid authToken.");
    }
  } else {
    sendResponse(res, 403, {}, 0, 1, "Access denied. No authToken provided.");
  }
};
