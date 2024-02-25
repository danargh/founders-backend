import Joi from "joi";
import { ErrorException } from "./Error.utils";

export const loginValidation = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().required(),
});

export const registerValidation = Joi.object({
   username: Joi.string().max(100).required(),
   email: Joi.string().email().max(100).required(),
   password: Joi.string().min(8).max(100).required(),
   maleName: Joi.string().max(100).required(),
   femaleName: Joi.string().max(100).required(),
   websiteUrl: Joi.string().max(100).required(),
   phone: Joi.string().max(100).required(),
   terms: Joi.boolean().valid(true).required(),
});

export const validate = (schema: Joi.ObjectSchema<any>, payload: any) => {
   const { error, value } = schema.validate(payload);
   if (error) {
      throw new ErrorException(400, error.message);
   } else {
      return value;
   }
};
