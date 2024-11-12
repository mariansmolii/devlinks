import express from "express";

import * as userValidation from "../../validations/auth.js";
import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";

const authRouter = express.Router();

const userLoginValidate = validateBody(userValidation.userLoginSchema);
const userRegisterValidate = validateBody(userValidation.userRegisterSchema);

authRouter.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.current);

export default authRouter;
