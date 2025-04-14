import express from "express";
import profileController from "../../controllers/profile-controller.js";

import { authenticate } from "../../middlewares/index.js";

const profileRouter = express.Router();

profileRouter.use(authenticate);

profileRouter.get("/", profileController.getProfile);

profileRouter.patch("/update", profileController.updateProfileInfo);

export default profileRouter;
