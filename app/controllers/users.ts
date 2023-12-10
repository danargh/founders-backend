import express, { ErrorRequestHandler, NextFunction } from "express";

import { deleteUserById, getUsers, getUserById } from "../models/users";
import ErrorHandler from "../utils/Error.utils";
import logger from "../utils/Logger.utils";

export const getAllUsers = async (err: ErrorRequestHandler, req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const users = await getUsers();
      console.log(users);
      return res.json(users);
   } catch (error) {
      logger.info(error);
      // return res.json({ message: "error cuy" });
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
