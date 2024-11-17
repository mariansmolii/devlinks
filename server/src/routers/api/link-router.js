import express from "express";

import linkController from "../../controllers/link-controller.js";

import { linkSchema } from "../../validations/link.js";
import { validateBody } from "../../decorators/index.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

const linkRouter = express.Router();

const linkValidate = validateBody(linkSchema.linkSchema);

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAllLinks);

linkRouter.patch("/save", isEmptyBody, linkValidate, linkController.saveLinks);

linkRouter.delete("/:linkId", isValidId, linkController.deleteLink);

export default linkRouter;
