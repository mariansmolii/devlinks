import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    platform: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
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

const Link = model("link", linkSchema);

export default Link;
