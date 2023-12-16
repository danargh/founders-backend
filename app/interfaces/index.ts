import { Request } from "express";

// auth
export interface UserData extends Request {
   userData: any;
}
export interface UserRole extends Request {
   role: string;
}

// user
export interface UserResponse {
   _id: string;
   email: string;
   username: string;
   password: string;
   role: string;
   createdAt: Date;
}
