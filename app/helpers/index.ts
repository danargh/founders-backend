import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";
import { ErrorException } from "../utils/Error.utils";
import { Identifier } from "interfaces"; // Add this import statement

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

export const decodedToken = async (token: string): Promise<any> => {
   const secret = config.JWT_SECRET as string;

   // let identifier: Identifier;
   const identifier = jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
         throw new ErrorException(401, err.message);
      } else {
         // identifier = decoded as jwt.JwtPayload;
         return decoded;
      }
   });
   return identifier;
};
