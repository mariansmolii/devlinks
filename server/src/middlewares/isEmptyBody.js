import { HttpError } from "../utils/index.js";

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "all fields empty"));
  }
  next();
};

export default isEmptyBody;
