import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { env, HttpError } from "../utils/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const JWT_SECRET = env("JWT_SECRET");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

export default ctrlWrapper(authenticate);
