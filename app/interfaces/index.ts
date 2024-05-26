import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// auth
export interface UserData extends Request {
   userData: any;
}
export interface UserRole extends Request {
   role: string;
}
export interface Identifier extends JwtPayload {
   id: string;
   username: string;
   email: string;
   role: string;
   iat: number;
   exp: number;
}

// user
export interface UserResponse {
   _id: string;
   email: string;
   username: string;
   password: string;
   role: string;
   membership: string;
   createdAt: Date;

   femaleName: string;
   maleName: string;
   websiteUrl: string;
   phone: string;
   isVerified: boolean;
}
