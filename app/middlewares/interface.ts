import { Request } from "express";

export interface UserData {
   email: string;
   username: string;
}

export interface ValidationRequest extends Request {
   userData: UserData;
}
