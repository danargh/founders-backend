import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";

export const encryptPassword = async (password: string): Promise<string> => {
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
   } catch (error) {
      console.log(error);
   }
};

export const generateToken = async (payload: any): Promise<any> => {
   const expiresIn: number = 7200;
   const token: string = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "2h" });
   return { expiresIn, token };
};

export const getWibDate = async (input: Date): Promise<Date> => {
   input.setHours(input.getHours() + 7);
   return input;
};

export const getExpiresDate = async (expiresIn: any): Promise<Date> => {
   const utcExpiresDate = new Date(new Date().getTime() + expiresIn * 1000);
   return getWibDate(utcExpiresDate);
};
