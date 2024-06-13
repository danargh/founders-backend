import express, { NextFunction } from "express";
import { loginService, registerService, validateTokenService } from "../services/authentication";
import { createUser } from "models/users";
import { getExpiresDate } from "../helpers";

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user, token, expiresIn } = await loginService(req);

      return res.status(200).json({
         status: "Success",
         message: "Login successful",
         data: {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone,
            createdAt: user.createdAt,
            auth: { token: token, expiresIn: await getExpiresDate(expiresIn) },
            role: user.role,
            membership: user.membership,
            isVerified: user.isVerified,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const register = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdUser, token, expiresIn } = await registerService(req);

      return res
         .status(201)
         .json({
            status: "Success",
            message: "Register successfull",
            data: {
               id: createdUser._id,
               email: createdUser.email,
               username: createdUser.username,
               phone: createdUser.phone,
               auth: { token: token, expiresIn: await getExpiresDate(expiresIn) },
               createdAt: createdUser.createdAt,
               role: createdUser.role,
               membership: createdUser.membership,
               isVerified: createdUser.isVerified,
            },
         })
         .end();
   } catch (error) {
      next(error);
   }
};

export const validateToken = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const user = await validateTokenService(req, res);
      return res.status(200).json({
         status: "Success",
         data: {
            username: user.username,
            membership: user.membership,
            role: user.role,
         },
      });
   } catch (error) {
      next(error);
   }
};
