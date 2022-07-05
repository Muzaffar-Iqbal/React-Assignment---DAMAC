import User from "../models/user";
import BaseService from "./baseService";
import { encryptPassword } from "../helpers/utility";
class UserService extends BaseService {
  constructor() {
    super();
    this.className = User;
  }
  async create(data) {
    try {
      let user = new User();
      let { email, name, password } = data;
      user.email = email;
      user.name = name;
      user.createdAt = Date.now();
      user.password = password ? encryptPassword(password) : password;
      let userErrors = user.validateSync();
      if (!userErrors) {
        let new_user = await user.save();
        return { status: true, user: new_user };
      } else {
        let errors = [];
        for (let error in userErrors.errors) {
          errors = [...errors, userErrors.errors[error].message];
        }
        return { status: false, errors };
      }
    } catch (e) {
      return {
        status: false,
        errors: ["You have already registered. Please log in."],
      };
    }
  }
}

export default UserService;
