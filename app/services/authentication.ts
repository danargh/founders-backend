import { validate, loginValidation } from "../utils/Validation.utils";
import express from "express";
import { getUserByEmail } from "../models/users";
import { ErrorException } from "../utils/Error.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { createUser } from "../models/users";
import { encryptPassword } from "../helpers";

export const loginService = async (req: express.Request) => {
   validate(loginValidation, req.body);

   const user = await getUserByEmail(req.body.email);
   if (!user) throw new ErrorException(400, "User not found");

   const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
   if (!isMatch) throw new ErrorException(400, "Invalid password");

   const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
   };
   const expiresIn = 7200;

   const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "2h" });

   return { user, token, expiresIn };
};

export const registerService = async (req: express.Request) => {
   validate(loginValidation, req.body);

   const existingUser = await getUserByEmail(req.body.email);
   if (existingUser) throw new ErrorException(400, "User already exists");

   const createdUser = await createUser({
      email: req.body.email,
      username: req.body.username,
      password: await encryptPassword(req.body.password),
   });

   return { createdUser };
};

export const validateTokenService = async (req: express.Request) => {
   const token = req.headers.authorization?.replace("Bearer ", "");
   if (!token) throw new ErrorException(401, "Unauthorized");

   const secret = config.JWT_SECRET as string;
   jwt.verify(token, secret, (err, decoded) => {
      if (err) {
         throw new ErrorException(401, err.message);
      } else {
         return decoded;
      }
   });
};
