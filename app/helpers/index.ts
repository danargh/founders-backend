import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users";

export const encryptPassword = async (password: string): Promise<string> => {
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
   } catch (error) {
      console.log(error);
   }
};

export const generateToken = (payload: any): string => {
   const token = jwt.sign(payload, config.JWT_SECRET as string, { expiresIn: "1h", algorithm: "HS256", issuer: "danargh86@gmail.com" });
   return token;
};
