import fs from "fs/promises";
import Profile from "../models/Profile.js";

import { env, HttpError, cloudinary } from "../utils/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const CLOUDINARY_FOLDER_NAME = env("CLOUDINARY_FOLDER_NAME");

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

const updateProfileImage = async (req, res) => {
  const { _id: owner } = req.user;

  const profile = await Profile.findOne({ owner });

  if (profile && profile.profileImage) {
    const publicId = profile.profileImage.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(CLOUDINARY_FOLDER_NAME + "/" + publicId);
  }

  const { url: image } = await cloudinary.uploader.upload(req.file.path, {
    folder: CLOUDINARY_FOLDER_NAME,
  });

  await fs.unlink(req.file.path);

  await Profile.findOneAndUpdate(
    { owner },
    { profileImage: image },
    { upsert: true }
  );

  res.json({ image });
};

export default {
  getProfile: ctrlWrapper(getProfile),
  updateProfileInfo: ctrlWrapper(updateProfileInfo),
  updateProfileImage: ctrlWrapper(updateProfileImage),
};
