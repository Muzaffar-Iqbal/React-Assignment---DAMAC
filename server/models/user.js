import mongoose from "mongoose";
import validator from "validator";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required."],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email address provided.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
