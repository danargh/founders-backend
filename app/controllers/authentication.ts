import express, { NextFunction } from "express";
import { loginService, registerService, validateTokenService, loginGoogleService, logoutService } from "../services/authentication";
import { createUser } from "models/users";
import { getExpiresDate } from "../helpers";

export const loginGoogle = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user, token, expiresIn, refreshToken } = await loginGoogleService(req);

      return res
         .status(200)
         .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
         .redirect(`http://localhost:3000/auth-success?userToken=${token}&refreshToken=${refreshToken}`);
   } catch (error) {
      next(error);
   }
};

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user, token, expiresIn, refreshToken } = await loginService(req);

      return res
         .status(200)
         .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
         .json({
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

export const logout = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      await logoutService(req, res);
      return res.status(200).clearCookie("refreshToken").json({
         status: "Success",
         message: "Logout successful",
      });
   } catch (error) {
      next(error);
   }
};

export const register = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdUser, token, expiresIn, refreshToken } = await registerService(req);

      return res
         .status(201)
         .cookie("refreshToken", refreshToken)
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
