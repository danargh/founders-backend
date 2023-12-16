import Joi from "joi";
import { ErrorException } from "./Error.utils";

export const loginValidation = Joi.object({
   username: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
});

export const registerValidation = Joi.object({
   username: Joi.string().max(100).required(),
   email: Joi.string().email().max(100).required(),
   password: Joi.string().min(6).max(100).required(),
});

export const validate = (schema: Joi.ObjectSchema<any>, payload: any) => {
   const { error, value } = schema.validate(payload);
   if (error) {
      throw new ErrorException(400, error.message);
   } else {
      return value;
   }
};
