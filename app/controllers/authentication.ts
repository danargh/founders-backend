import express, { NextFunction } from "express";
import { loginService, registerService, validateTokenService } from "../services/authentication";
import { createUser } from "models/users";
import { getExpiresDate } from "../helpers";

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user, token, expiresIn } = await loginService(req);

      return res.status(200).json({
         status: "Success",
         code: 200,
         message: "Login successful",
         data: {
            id: user._id,
            email: user.email,
            username: user.username,
            femaleName: user.femaleName,
            maleName: user.maleName,
            websiteUrl: user.websiteUrl,
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
            code: 201,
            message: "Register successfull",
            data: {
               id: createdUser._id,
               email: createdUser.email,
               username: createdUser.username,
               femaleName: createdUser.femaleName,
               maleName: createdUser.maleName,
               websiteUrl: createdUser.websiteUrl,
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
      const user = await validateTokenService(req);
      return res.status(200).json({
         status: "Success",
         code: 200,
         message: "Validate successfull",
         data: {
            id: user._id,
            membership: user.membership,
            username: user.username,
         },
      });
   } catch (error) {
      next(error);
   }
};
