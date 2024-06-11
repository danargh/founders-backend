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

export const ifTokenExpired = async (token: string): Promise<boolean> => {
   // const secret = config.JWT_SECRET as string;
   const [, payload] = token.split(".");
   const decodedPayload = JSON.parse(atob(payload));
   const exp = decodedPayload.exp * 1000; // Convert to milliseconds
   return Date.now() >= exp;
};

export const refreshToken = async (token: string): Promise<string> => {
   const secret = config.JWT_SECRET as string;
   const decodedToken = jwt.verify(token, secret) as Identifier;
   const newToken = jwt.sign({ id: decodedToken.id }, secret, { expiresIn: "2h" });
   return newToken;
};

export const getWibDate = async (input: Date): Promise<Date> => {
   input.setHours(input.getHours() + 7);
   return input;
};

// get identifer from token
export const getIdentifier = async (token: string): Promise<Identifier> => {
   try {
      const secret = config.JWT_SECRET as string;
      const identifier = jwt.verify(token, secret) as Identifier;
      return identifier;
   } catch (error) {
      console.log(error);
      throw new ErrorException(401, "Unauthorized");
   }
};

export const getExpiresDate = async (expiresIn: any): Promise<Date> => {
   const utcExpiresDate = new Date(new Date().getTime() + expiresIn * 1000);
   return getWibDate(utcExpiresDate);
};
