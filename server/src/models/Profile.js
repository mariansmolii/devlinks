import { model, Schema } from "mongoose";
import { emailRegexp } from "../utils/index.js";

const profileSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    profileEmail: {
      type: String,
      match: emailRegexp,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const Profile = model("profile", profileSchema);

export default Profile;
