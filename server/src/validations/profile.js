import Joi from "joi";

import { emailRegexp } from "../utils/index.js";

export const updateProfileSchema = Joi.object({
  profileImage: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profileEmail: Joi.string().pattern(emailRegexp),
});
