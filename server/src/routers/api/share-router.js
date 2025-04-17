import express from "express";
import shareController from "../../controllers/share-controller.js";

const shareRouter = express.Router();

shareRouter.get("/:id", shareController.getShareData);

export default shareRouter;
