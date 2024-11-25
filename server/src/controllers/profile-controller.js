import Profile from "../models/Profile.js";

import { HttpError } from "../utils/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getProfile = async (req, res) => {
  const { _id: owner } = req.user;

  const profile = await Profile.findOne({ owner });

  if (!profile) {
    throw HttpError(404, "Profile not found");
  }

  res.json(profile);
};

const updateProfileInfo = async (req, res) => {
  const { _id: owner } = req.user;

  const updatedProfile = await Profile.findOneAndUpdate(
    { owner },
    { ...req.body },
    { upsert: true, new: true }
  );

  res.json(updatedProfile);
};

export default {
  getProfile: ctrlWrapper(getProfile),
  updateProfileInfo: ctrlWrapper(updateProfileInfo),
};
