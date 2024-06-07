import { validate, loginValidation, registerValidation } from "../utils/Validation.utils";
import express from "express";
import { getUserByEmail } from "../models/users";
import { ErrorException } from "../utils/Error.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { createUser } from "../models/users";
import { encryptPassword, generateToken, refreshToken } from "../helpers";
import { User } from "interfaces";

export const loginService = async (req: express.Request) => {
   validate(loginValidation, req.body);
   const requestToken = req.headers.authorization?.replace("Bearer ", "");

   const user = await getUserByEmail(req.body.email);
   if (!user) throw new ErrorException(400, "User not found", "Email or password is incorrect");

   const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
   if (!isMatch) throw new ErrorException(400, "Invalid password", "Email or password is incorrect");

   const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
   };
   let token;
   let expiresIn;

   if (requestToken) {
      token = refreshToken(requestToken);
   } else {
      const result = await generateToken(payload);
      token = result.token;
      expiresIn = result.expiresIn;
   }
   return { user, token, expiresIn };
};

export const registerService = async (req: express.Request) => {
   validate(registerValidation, req.body);

   const existingUser = await getUserByEmail(req.body.email);
   if (existingUser) throw new ErrorException(400, "User already exists", "Email or password is incorrect");

   const createdUser: User = await createUser({
      email: req.body.email,
      username: req.body.username,
      password: await encryptPassword(req.body.password),
      maleName: req.body.maleName,
      femaleName: req.body.femaleName,
      websiteUrl: req.body.websiteUrl,
      phone: req.body.phone,
   });
   const { token, expiresIn } = await generateToken(createdUser);
   return { createdUser, token, expiresIn };
};

export const validateTokenService = async (req: express.Request, res: express.Response) => {
   const token = req.headers.authorization?.replace("Bearer ", "");
   if (!token) throw new ErrorException(401, "Unauthorized");

   const secret = config.JWT_SECRET as string;

   let email;
   jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
         if (err.name === "TokenExpiredError") {
            throw new ErrorException(401, err.message, err.message);
         }
         throw new ErrorException(400, err.message, err.message);
      } else {
         email = (decoded as jwt.JwtPayload).email;
         return decoded;
      }
   });
   return await getUserByEmail(email);
};
