import { validate, loginValidation, registerValidation } from "../utils/Validation.utils";
import express from "express";
import { findOrCreateUser, getUserByEmail } from "../models/users";
import { ErrorException } from "../utils/Error.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { createUser } from "../models/users";
import { encryptPassword, generateRefreshToken, generateToken } from "../helpers";
import { Identifier, User } from "interfaces";
import { google } from "googleapis";
import { createSession, deleteSession, getSessionByRefreshToken } from "../models/auth";

// login with google
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, config.GOOGLE_REDIRECT_URI);
const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
export const googleUrl = oauth2Client.generateAuthUrl({
   access_type: "offline",
   scope: scopes,
   include_granted_scopes: true,
   response_type: "code",
});
export const loginGoogleService = async (req: express.Request) => {
   const code = req.query.code as string;
   const { tokens } = await oauth2Client.getToken(code);
   oauth2Client.setCredentials(tokens);

   const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
   const { data } = await oauth2.userinfo.get();

   const userAgent = req.headers["user-agent"];
   const ipAddress = req.ip;

   const user = await findOrCreateUser(data.email, data.name);

   const payload: Identifier = {
      _id: user._id as unknown as string,
      username: user.username,
      email: user.email,
      role: user.role,
   };

   const refreshToken = await generateRefreshToken(payload);

   const session = await getSessionByRefreshToken(refreshToken);
   if (!session) {
      await createSession({ userId: user._id, refreshToken, userAgent, ipAddress });
   }
   const { token, expiresIn } = await generateToken(payload);

   return { user, token, expiresIn, refreshToken };
};

export const loginService = async (req: express.Request) => {
   validate(loginValidation, req.body);

   const user = await getUserByEmail(req.body.email);
   if (!user) throw new ErrorException(400, "User not found", "Email or password is incorrect");

   const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
   if (!isMatch) throw new ErrorException(400, "Invalid password", "Email or password is incorrect");

   const userAgent = req.headers["user-agent"];
   const ipAddress = req.ip;

   const payload: Identifier = {
      _id: user._id as unknown as string,
      username: user.username,
      email: user.email,
      role: user.role,
   };

   const refreshToken = await generateRefreshToken(payload);

   const session = await getSessionByRefreshToken(refreshToken);
   if (!session) {
      await createSession({ userId: user._id, refreshToken, userAgent, ipAddress });
   }
   const { token, expiresIn } = await generateToken(payload);

   return { user, token, expiresIn, refreshToken };
};

export const registerService = async (req: express.Request) => {
   validate(registerValidation, req.body);

   const existingUser = await getUserByEmail(req.body.email);
   if (existingUser) throw new ErrorException(400, "User already exists", "Email or password is incorrect");

   const userAgent = req.headers["user-agent"];
   const ipAddress = req.ip;

   const createdUser: User = await createUser({
      email: req.body.email,
      username: req.body.username,
      password: await encryptPassword(req.body.password),
      maleName: req.body.maleName,
      femaleName: req.body.femaleName,
      websiteUrl: req.body.websiteUrl,
      phone: req.body.phone,
   });
   const payload: Identifier = {
      _id: createdUser._id as unknown as string,
      username: createdUser.username,
      email: createdUser.email,
      role: createdUser.role,
   };
   const refreshToken = await generateRefreshToken(payload);

   const session = await getSessionByRefreshToken(refreshToken);
   if (!session) {
      await createSession({ userId: createdUser._id, refreshToken, userAgent, ipAddress });
   }
   const { token, expiresIn } = await generateToken(payload);

   return { createdUser, token, expiresIn, refreshToken };
};

export const validateTokenService = async (req: express.Request, res: express.Response) => {
   const token = req.headers.authorization?.replace("Bearer ", "");
   if (!token) throw new ErrorException(401, "Unauthorized");

   const secret = config.JWT_SECRET as string;

   let email;
   jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
         if (err.name === "TokenExpiredError") {
            throw new ErrorException(401, "Token Expired", "Token Expired");
         }
         throw new ErrorException(400, err.message, err.message);
      } else {
         email = (decoded as jwt.JwtPayload).email;
         return decoded;
      }
   });
   return await getUserByEmail(email);
};

export const logoutService = async (req: express.Request, res: express.Response) => {
   const cookies = req.cookies;
   const refreshToken = cookies.refreshToken;
   deleteSession(refreshToken);
};
