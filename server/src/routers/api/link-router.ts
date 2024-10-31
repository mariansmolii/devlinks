import express from "express";
import linkController from "../../controllers/link-controller";
import { authenticate, isEmptyBody, isValidId } from "../../middlewares";

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAllLinks);

linkRouter.patch("/", isEmptyBody, linkController.updateOrCreateLinks);

linkRouter.delete("/:linkId", isValidId, linkController.deleteLink);

export default linkRouter;
