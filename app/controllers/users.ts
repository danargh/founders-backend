import express, { NextFunction } from "express";
import { getAllUsersService, deleteUserService, updateUserService, sendEmailService, getUserService } from "../services/user";
import { UserData } from "../interfaces";
import { verifyEmailService } from "../services/user";

export const getUser = async (req: UserData, res: express.Response, next: express.NextFunction) => {
   try {
      const { user } = await getUserService(req);
      return res.status(200).json({
         status: "Success",
         code: 200,
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

export const getAllUsers = async (req: UserData, res: express.Response, next: express.NextFunction) => {
   try {
      const { users } = await getAllUsersService(req.userData.role);
      return res.status(200).json({
         status: "Success",
         code: 200,
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

export const deleteUser = async (req: UserData, res: express.Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const { deletedUser } = await deleteUserService(id, req.userData.id, req.userData.role);
      return res.status(200).json({
         status: "Success",
         code: 200,
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

export const updateUser = async (req: UserData, res: express.Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const { updatedUser } = await updateUserService(id, req.userData.id, req.userData.role, req.body);

      return res.status(200).json({
         status: "Success",
         code: 200,
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

export const sendEmail = async (req: UserData, res: express.Response, next: NextFunction) => {
   try {
      const { user } = await sendEmailService(req.userData.email);

      return res.status(200).json({
         status: "Success",
         code: 200,
         message: "Email sent!",
         data: {
            email: user.email,
            createdAt: user.createdAt,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const verifyEmail = async (req: UserData, res: express.Response, next: NextFunction) => {
   try {
      const { otp } = req.body;
      const { verifiedUser } = await verifyEmailService(otp, req.userData.email);

      return res.status(200).json({
         status: "Success",
         code: 200,
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
