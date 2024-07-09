import express, { NextFunction } from "express";
import { getAllUsersService, deleteUserService, updateUserService, sendEmailService, getUserService } from "../services/user";
import { UserData } from "../interfaces";
import { verifyEmailService } from "../services/user";
import { getIdentifier } from "../helpers";
import { Identifier } from "../interfaces";

export const getUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const { user } = await getUserService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get user successfull!",
         data: {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone,
            createdAt: user.createdAt,
            role: user.role,
            membership: user.membership,
            isVerified: user.isVerified,
         },
      });
   } catch (error) {
      return next(error);
   }
};

export const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   try {
      const { users } = await getAllUsersService(identifier.role);
      return res.status(200).json({
         status: "Success",
         message: "Get users successfull!",
         data: users.map(
            (user) =>
               new Object({
                  email: user.email,
                  username: user.username,
                  createdAt: user.createdAt,
                  role: user.role,
               })
         ),
      });
   } catch (error) {
      return next(error);
   }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   try {
      const { id } = req.params;
      const { deletedUser } = await deleteUserService(id, identifier._id, identifier.role);
      return res.status(200).json({
         status: "Success",
         message: "Delete user successfull!",
         data: {
            email: deletedUser.email,
            username: deletedUser.username,
            createdAt: deletedUser.createdAt,
            role: deletedUser.role,
         },
      });
   } catch (error) {
      return next(error);
   }
};

export const updateUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   try {
      const { id } = req.params;
      const { updatedUser } = await updateUserService(id, identifier._id, identifier.role, req.body);

      return res.status(200).json({
         status: "Success",
         message: "Update user successfull!",
         data: {
            email: updatedUser.email,
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            role: updatedUser.role,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const sendEmail = async (req: express.Request, res: express.Response, next: NextFunction) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   try {
      const { envelope } = await sendEmailService(identifier.email);

      return res.status(200).json({
         status: "Success",
         message: "Email sent!",
         data: {
            emailFrom: envelope.from,
            emailTo: envelope.to,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const verifyEmail = async (req: express.Request, res: express.Response, next: NextFunction) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   try {
      const { otp } = req.body;
      const { verifiedUser } = await verifyEmailService(otp as string, identifier.email as string);

      return res.status(200).json({
         status: "Success",
         message: "Email verified!",
         data: {
            email: verifiedUser.email,
            createdAt: verifiedUser.createdAt,
         },
      });
   } catch (error) {
      next(error);
   }
};
