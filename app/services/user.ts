import { ErrorException } from "../utils/Error.utils";
import { createVerificationOTP, deleteUserById, getUserByEmail, getUserById, getUsers, updateIsVerified, updateUserById } from "../models/users";
import crypto from "crypto";
import sendMail from "../utils/Email.utils";
import express from "express";
import { getIdentifier } from "../helpers";
import { Identifier } from "../interfaces";

export const getUserService = async (req: express.Request) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));

   // authorization only owner or admin
   // if (identifier.role === "user") {
   //    throw new ErrorException(403, "Forbidden");
   // }

   const user = await getUserById(identifier._id);
   if (!user) throw new ErrorException(404, "User not found");

   return { user };
};

export const getAllUsersService = async (role: string) => {
   // authorization only admin
   if (role !== "admin") throw new ErrorException(403, "Forbidden");

   const users = await getUsers();
   return { users };
};

export const deleteUserService = async (id: string, actorId: string, role: string) => {
   // authorization only owner or admin
   if (role === "user" && actorId !== id) {
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

export const sendEmailService = async (email: string) => {
   const user = await getUserByEmail(email);
   if (!user) throw new ErrorException(404, "User not found");

   try {
      createVerificationOTP(user._id.toString(), crypto.randomBytes(4).toString("hex"));

      const message = `Kode OTP kamu : ${user.OTPcode}`;
      await sendMail(email, "Kode OTP", message);
      return { user };
   } catch (error) {
      throw new ErrorException(500, "Internal server error");
   }
};

export const verifyEmailService = async (otp: string, email: string) => {
   const user = await getUserByEmail(email);
   if (!user) throw new ErrorException(404, "User not found");

   if (user.OTPcode !== otp) throw new ErrorException(400, "Invalid OTP");

   // otp only valid for 1 minutes
   if (new Date().getTime() - new Date(user.OTPcreatedAt).getTime() > 1 * 60 * 1000) {
      throw new ErrorException(400, "OTP expired");
   }

   const verifiedUser = await updateIsVerified(user._id.toString());

   return { verifiedUser };
};

// export const newPasswordService = async (id: string, actorId: string, password: string) => {
//    const { id } = req.params;
//    const { password } = req.body;

//    const user = await getUserById(id);

//    user.password = password;
//    await user.save();
// }
