import express, { Handler } from "express";
import { merge, get } from "lodash";
import ErrorHandler from "../utils/Error.utils";
import { UserModel, getUserById, getUserBySessionToken } from "../models/users";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserData, ValidationRequest } from "./interface";

export const authJwtMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
   const ValidationRequest = req as ValidationRequest;
   const { authorization } = ValidationRequest.headers;
   if (!authorization) {
      return ErrorHandler(401, "Unauthorized", res);
   }

   const token = authorization.replace("Bearer ", "");
   if (!token) {
      return ErrorHandler(401, "Unauthorized", res);
   }
   const secret = config.JWT_SECRET;

   try {
      const jwtDecode = jwt.verify(token, secret) as UserData;
      ValidationRequest.userData = jwtDecode;
      next();
   } catch (error) {
      return ErrorHandler(401, "Unauthorized", res);
   }
};

export const authorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { id } = req.params;
      const currentUserId = get(req, "identity._id") as string;

      if (!currentUserId) {
         return res.sendStatus(400);
      }

      if (currentUserId.toString() !== id) {
         return res.sendStatus(403);
      }

      next();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};

export const errorMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
   if (!err) {
      next();
      return;
   }
   ErrorHandler(err.status, err.message, res);
};
