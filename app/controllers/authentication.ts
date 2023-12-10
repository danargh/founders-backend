import express from "express";

import { getUserByEmail, createUser, UserModel } from "../models/users";
import ErrorHandler from "../utils/Error.utils";
import jwt from "jwt-simple";
import config from "../config";
import logger from "../utils/Logger.utils";
import bcrypt from "bcrypt";
import { encryptPassword } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
   try {
      if (!req.body.email || !req.body.password) {
         return ErrorHandler(400, "Missing fields", res);
      }

      const user = await getUserByEmail(req.body.email);
      if (!user) {
         return ErrorHandler(401, "Unauthorized", res);
      }

      console.log(user);
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
         return ErrorHandler(401, "Unauthorized", res);
      }

      const payload = {
         id: user._id,
         expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      const token = jwt.encode(payload, config.JWT_SECRET);

      logger.info("Login successful");
      return res.status(200).json({
         status: "Success",
         code: 200,
         message: "Login successful",
         data: user,
         token: token,
      });
   } catch (error) {
      console.error(error);
      return ErrorHandler(500, "Login failed", res);
   }
};

export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
         return ErrorHandler(400, "Missing fields", res);
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
         return ErrorHandler(400, "User already exists", res);
      }

      const createdUser = await createUser({
         email: email,
         username: username,
         password: await encryptPassword(password),
      });
      if (!createdUser) {
         return ErrorHandler(500, "Register failed", res);
      } else {
         logger.info("Register successfull");
         return res.status(201).json({ status: "Success", code: 201, message: "Register successfull", data: createdUser }).end();
      }
   } catch (error) {
      console.log(error);
   }
};
