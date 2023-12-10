import express, { Handler } from "express";
import { merge, get } from "lodash";
import ErrorHandler from "../utils/Error.utils";
import { UserModel, getUserById, getUserBySessionToken } from "../models/users";
import config from "../config";
import passportJWT from "passport-jwt";
import logger from "../utils/Logger.utils";

const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

export const authJwtMiddleware = (passport: any) => {
   const params = {
      secretOrKey: config.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   };

   const strategy = new JWTStrategy(params, async (jwtPayload, done) => {
      try {
         const user = await UserModel.findById(jwtPayload.id);
         if (!user) {
            return done(null, false);
         }

         // if (jwtPayload.expire <= Date.now()) {
         //    return done(null, false);
         // }

         return done(null, user);
      } catch (error) {
         logger.error(error);
         return done(error, false);
      }
   });

   passport.use(strategy);
};

export const errorMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
   if (!err) {
      next();
      return;
   }
   ErrorHandler(err.status, err.message, res);
};

// export const isAuthenticated = async (err: any, user: any, info: any) => {
//    if (err) {
//       return err;
//    }
//    if (!user) {
//       return new Error("Unauthorized");
//    }
//    return user;
// }

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
