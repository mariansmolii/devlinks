import Joi from "joi";

export const linkSchema = Joi.object({
  links: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        platform: Joi.object({
          value: Joi.string().required(),
          label: Joi.string().required(),
          iconName: Joi.string().required(),
          color: Joi.string().required(),
        }).required(),
        index: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});