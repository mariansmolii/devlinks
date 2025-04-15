import express from "express";
import profileController from "../../controllers/profile-controller.js";

import { authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { updateProfileSchema } from "../../validations/profile.js";

const profileRouter = express.Router();
const profileValidate = validateBody(updateProfileSchema);

profileRouter.use(authenticate);

profileRouter.get("/", profileController.getProfile);

profileRouter.patch(
  "/update",
  profileValidate,
  profileController.updateProfileInfo
);

profileRouter.patch(
  "/upload",
  upload.single("profileImage"),
  profileController.updateProfileImage
);

export default profileRouter;
