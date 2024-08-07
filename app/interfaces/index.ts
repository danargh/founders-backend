import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document, Types } from "mongoose";

// auth
export interface UserData extends Request {
   userData: any;
}
export interface UserRole extends Request {
   role: string;
}
export interface Identifier extends JwtPayload {
   _id: string;
   username: string;
   email: string;
   role: string;
   iat?: number;
   exp?: number;
}

// user
export interface User {
   _id: string;
   username: string;
   email: string;
   password: string;
   role: string;
   phone: string;
   isVerified: boolean;
   createdAt: Date;
   membership: string;
   invitations: Types.ObjectId | Invitation[];
   OTPCode: string;
   OTPCreatedAt: Date;
}

// session
export interface Session {
   _id: string;
   userId: Types.ObjectId | User;
   refreshToken: string;
   userAgent: string;
   ipAddress: string;
   createdAt: Date;
}

// invitation
export interface Invitation {
   _id: string;
   user: Types.ObjectId | User;
   groom: Types.ObjectId | Groom;
   bride: Types.ObjectId | Bride;
   websiteUrl: string;
   dueDateActive: Date;
   theme: string | null;
   pricingCategory: string;
   events: Types.ObjectId | Event;
   guests: Types.ObjectId | Guest[];
}
export interface Groom {
   invitationId: Types.ObjectId | Invitation;
   fullName: string | null;
   nickName: string | null;
   childOrder: number | null;
   fatherName: string | null;
   motherName: string | null;
   address: string | null;
   photo: string | null;
   socialMedia: Record<string, string> | null;
}
export interface Bride {
   invitationId: Types.ObjectId | Invitation;
   fullName: string | null;
   nickName: string | null;
   childOrder: number | null;
   fatherName: string | null;
   motherName: string | null;
   address: string | null;
   photo: string | null;
   socialMedia: Record<string, string> | null;
}
export interface Event {
   id: string;
   invitationId: Types.ObjectId | Invitation;
   category: string;
   title: string;
   date: Date;
   startTime: string;
   endTime: string;
   timezone: string;
   place: string;
   address: string;
   googleMapsUrl: string;
}
export interface Guest {
   invitationId: Types.ObjectId | Invitation;
   fullName: string;
   address: string;
   category: string;
   status: string;
}
