import express from "express";
// import ErrorHandler from "../utils/Error.utils";
import config from "../config";
import jwt from "jsonwebtoken";
import { Identifier, UserData } from "../interfaces";
import { ErrorException } from "../utils/Error.utils";
import logger from "../utils/Logger.utils";
import { getSessionByRefreshToken } from "../models/auth";

export const authJwtMiddleware = async (req: UserData, res: express.Response, next: express.NextFunction) => {
   const { authorization } = req.headers;
   const cookies = req.cookies;

   let token = authorization;
   let refreshToken = cookies.refreshToken;

   if (!token) {
      console.log("token");
      return next(new ErrorException(401, "Unauthorized"));
   }
   if (!refreshToken) {
      console.log("refreshToken");
      return next(new ErrorException(401, "Unauthorized"));
   }

   token = token.replace("Bearer ", "");
   refreshToken = refreshToken.replace("Bearer ", "");

   const dbRefreshToken = getSessionByRefreshToken(refreshToken);
   if (!dbRefreshToken) {
      return next(new ErrorException(401, "Unauthorized"));
   }

   try {
      const secret = config.JWT_SECRET as string;
      jwt.verify(token, secret, (err, decoded) => {
         if (err) {
            throw new ErrorException(401, err.message);
         }
         req.userData = decoded;
         next();
      });
   } catch (error) {
      try {
         const secret = config.JWT_SECRET as string;
         const { _id, username, email, role }: Identifier = jwt.verify(refreshToken, secret) as Identifier;
         const newToken = await jwt.sign({ _id: _id, username: username, email: email, role: role }, secret, { expiresIn: "2h" });
         res.cookie("userToken", newToken, { httpOnly: true, sameSite: "strict" });
         next();
      } catch (error) {
         next(error);
      }
   }
};

export const errorMiddleware = (err: ErrorException, req: express.Request, res: express.Response, next: express.NextFunction) => {
   const status: number = err.status || 500;
   const message: string = err.message || "Something went wrong";
   const userMessage: string = err.userMessage || "Something went wrong";

   logger.error(`[${req.method}] - ${req.path} >> StatusCode:: ${status} | Message:: ${message}`);
   res.status(status).json({ status: "Failed", message: message, userMessage: userMessage }).end();
};
