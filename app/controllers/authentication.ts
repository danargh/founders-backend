import express, { NextFunction } from "express";
import { loginService, registerService } from "../services/authentication";

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user, token, expiresIn } = await loginService(req);

      return res.status(200).json({
         status: "Success",
         code: 200,
         message: "Login successful",
         data: { email: user.email, username: user.username, createdAt: user.createdAt },
         auth: { token: token, expiresIn: new Date(expiresIn) },
         role: user.role,
      });
   } catch (error) {
      next(error);
   }
};

export const register = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdUser } = await registerService(req);

      return res
         .status(201)
         .json({
            status: "Success",
            code: 201,
            message: "Register successfull",
            data: { email: createdUser.email, username: createdUser.username, createdAt: createdUser.createdAt, role: createdUser.role },
         })
         .end();
   } catch (error) {
      next(error);
   }
};
