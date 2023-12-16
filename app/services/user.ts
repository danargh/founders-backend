import express from "express";
import { ErrorException } from "../utils/Error.utils";
import { deleteUserById, getUserById, getUsers, updateUserById } from "../models/users";
import { updateUser } from "../controllers/users";

export const getAllUsersService = async (role: string) => {
   // authorization only admin
   if (role !== "admin") throw new ErrorException(403, "Forbidden");

   const users = await getUsers();
   return { users };
};

export const deleteUserService = async (id: string, actorId: string, role: string) => {
   // authorization only owner or admin
   if (actorId !== id && role !== "admin") {
      throw new ErrorException(403, "Forbidden");
   } else if (role !== "admin") {
      throw new ErrorException(403, "Forbidden");
   }

   const deletedUser = await deleteUserById(id);
   if (!deletedUser) throw new ErrorException(404, "User not found");

   return { deletedUser };
};

export const updateUserService = async (id: string, actorId: string, role: string, payload: any) => {
   // authorization only owner
   if (actorId !== id && role !== "admin") {
      throw new ErrorException(403, "Forbidden");
   }

   const updatedUser = await updateUserById(id, payload);
   if (!updatedUser) throw new ErrorException(404, "User not found");

   return { updatedUser };
};

// export const newPasswordService = async (id: string, actorId: string, password: string) => {
//    const { id } = req.params;
//    const { password } = req.body;

//    const user = await getUserById(id);

//    user.password = password;
//    await user.save();
// }
