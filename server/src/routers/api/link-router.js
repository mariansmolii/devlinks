import express from "express";

import linkController from "../../controllers/link-controller.js";

import { linkSchema } from "../../validations/link.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";

const linkRouter = express.Router();

const linkValidate = validateBody(linkSchema);

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAllLinks);

linkRouter.patch("/save", isEmptyBody, linkValidate, linkController.saveLinks);

linkRouter.delete("/remove", isEmptyBody, linkController.deleteLink);

export default linkRouter;
