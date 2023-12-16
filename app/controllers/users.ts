import express from "express";
import { deleteUserById, getUsers, getUserById } from "../models/users";
import { getAllUsersService } from "../services/user";
import { UserData } from "../interfaces/auth";

export const getAllUsers = async (req: UserData, res: express.Response, next: express.NextFunction) => {
   try {
      const { users } = await getAllUsersService(req.userData.id);
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

export const deleteUser = async (req: express.Request, res: express.Response) => {
   try {
      const { id } = req.params;

      const deletedUser = await deleteUserById(id);

      return res.json(deletedUser);
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
   try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) {
         return res.sendStatus(400);
      }

      const user = await getUserById(id);

      user.username = username;
      await user.save();

      return res.status(200).json(user).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};
