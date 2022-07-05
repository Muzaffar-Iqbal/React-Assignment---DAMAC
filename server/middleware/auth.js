import { decode, sendResponse } from "../helpers/utility";
import userService from "../services/userService";

module.exports = async function (req, res, next) {
  const token = req.header("authToken");
  let userId;
  if (token) {
    try {
      userId = decode(token);
      let user_service = new userService();
      let current_user = await user_service.getOne({ _id: userId }, ["_id"]);
      if (current_user) {
        req.body.userId = userId;
        next();
      } else {
        sendResponse(
          res,
          401,
          {},
          0,
          1,
          "Sorry! We couldn't verify if it is you."
        );
      }
    } catch (e) {
      sendResponse(
        res,
        401,
        {},
        0,
        1,
        "Sorry! We couldn't verify if it is you."
      );
    }
  } else {
    sendResponse(res, 403, {}, 0, 1, "Access denied. No token provided.");
  }
};
