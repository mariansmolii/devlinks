import User from "../models/User.js";
import Link from "../models/Link.js";
import Share from "../models/Share.js";
import Profile from "../models/Profile.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../utils/index.js";

const getShareData = async (req, res) => {
  const { id: owner } = req.params;

  const user = await User.findOne({ _id: owner });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const links = await Link.find({ owner });
  const profile = await Profile.findOne({ owner });

  const { profileEmail, firstName, lastName, profileImage } = profile || {};

  const shareData = await Share.findOneAndUpdate(
    { owner },
    { profileEmail, firstName, lastName, profileImage, links },
    { upsert: true, new: true }
  );

  res.json(shareData);
};

export default {
  getShareData: ctrlWrapper(getShareData),
};
