import express from "express";
import ErrorHandler from "../utils/Error.utils";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserData } from "../interfaces/auth";
import { ErrorException } from "../utils/Error.utils";
import logger from "../utils/Logger.utils";

export const authJwtMiddleware = (req: UserData, res: express.Response, next: express.NextFunction) => {
   const { authorization } = req.headers;
   if (!authorization) {
      return ErrorHandler(401, "Unauthorized", res);
   }

   const token = authorization.replace("Bearer ", "");
   if (!token) {
      return ErrorHandler(401, "Unauthorized", res);
   }

   try {
      const secret = config.JWT_SECRET as string;
      jwt.verify(token, secret, (err, decoded) => {
         if (err) {
            throw new ErrorException(401, "Unauthorized");
         }
         req.userData = decoded;
         next();
      });
   } catch (error) {
      return ErrorHandler(401, "Unauthorized", res);
   }
};

export const errorMiddleware = (err: ErrorException, req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const status: number = err.status || 500;
      const message: string = err.message || "Something went wrong";

      logger.error(`[${req.method}] - ${req.path} >> StatusCode:: ${status} | Message:: ${message}`);
      res.status(status).json({ status: "Failed", code: status, message: message }).end();
   } catch (error) {
      next(error);
   }
};
