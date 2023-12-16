import { Request } from "express";

export interface UserData extends Request {
   userData: any;
}
