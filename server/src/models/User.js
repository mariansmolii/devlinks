import { Schema, model } from "mongoose";
import { emailRegexp } from "../utils/index.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

const User = model("user", userSchema);

export default User;
