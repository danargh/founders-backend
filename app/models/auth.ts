import mongoose from "mongoose";
import { Session } from "../interfaces/index";

const SessionSchema = new mongoose.Schema<Session>({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   refreshToken: { type: String, required: true },
   userAgent: { type: String, required: true },
   ipAddress: { type: String, required: true },
   createdAt: { type: Date, required: true, default: Date.now, expires: "1d" },
});
export const SessionModel = mongoose.model("Session", SessionSchema);
export const createSession = async (values: Record<string, any>) => {
   try {
      const session = new SessionModel(values);
      await session.save();
   } catch (error) {
      console.error("Error creating session:", error);
      throw error;
   }
};
export const getSessionByRefreshToken = async (refreshToken: string) => {
   try {
      const session = await SessionModel.findOne({ refreshToken });
      return session;
   } catch (error) {
      console.error("Error getting session by refresh token:", error);
      throw error;
   }
};
export const deleteSession = async (refreshToken: string) => {
   try {
      await SessionModel.deleteOne({ refreshToken: refreshToken });
   } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
   }
};
