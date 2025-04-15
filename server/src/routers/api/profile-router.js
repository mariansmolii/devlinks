import express from "express";
import profileController from "../../controllers/profile-controller.js";

import { authenticate } from "../../middlewares/index.js";
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

export default profileRouter;
