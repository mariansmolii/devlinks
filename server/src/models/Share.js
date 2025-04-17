import { model, Schema } from "mongoose";

const shareSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    profileEmail: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const Share = model("share", shareSchema);

export default Share;
