import express from "express";
import { deleteUserById, getUsers, getUserById } from "../models/users";
import ErrorHandler from "../utils/Error.utils";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
   try {
      const users = await getUsers();
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
               })
         ),
      });
   } catch (error) {
      return ErrorHandler(400, "Get users failed", res);
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
