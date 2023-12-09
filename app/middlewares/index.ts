import express from "express";
import { merge, get } from "lodash";
import ErrorHandler from "../utils/Error.utils";

import { getUserBySessionToken } from "../models/users";

export const errorMiddleware = (
   err: any,
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   if (!err) {
      next();
      return;
   }
   ErrorHandler(err.status, err.message, res);
};

export const isAuthenticated = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const sessionToken = req.cookies["ANTONIO-AUTH"];

      if (!sessionToken) {
         // throw new ResponseError("Unauthorized", 403);
         ErrorHandler(403, "Unauthorized", res);
         // return res.sendStatus(403);
      }

      const existingUser = await getUserBySessionToken(sessionToken);

      if (!existingUser) {
         return res.sendStatus(403);
      }

      merge(req, { identity: existingUser });

      return next();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};

export const isOwner = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
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
