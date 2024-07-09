import { ErrorException } from "../utils/Error.utils";
import { createVerificationOTP, deleteUserById, getUserByEmail, getUserById, getUsers, updateIsVerified, updateUserById } from "../models/users";
import crypto from "crypto";
import sendMail from "../utils/Email.utils";
import express from "express";
import { getIdentifier, randEmailVerificationCode } from "../helpers";
import { Identifier } from "../interfaces";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "../config";

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({
   refresh_token: config.OAUTH_REFRESH_TOKEN,
});

export const sendEmailService = async (email: string) => {
   const user = await getUserByEmail(email);
   if (!user) throw new ErrorException(404, "User not found");

   const otp = await randEmailVerificationCode();
   createVerificationOTP(email, otp);

   let result;
   try {
      const accessToken = await oauth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            type: "OAuth2",
            user: config.OAUTH_EMAIL_FROM,
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            refreshToken: config.OAUTH_REFRESH_TOKEN,
            accessToken: accessToken.token,
         },
      });

      // mail options
      const mailOptions = {
         from: config.OAUTH_EMAIL_FROM,
         to: email,
         subject: "Email Verification",
         html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
               body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
               }
               .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
               }
               .header {
                  text-align: center;
                  padding: 20px;
                  background-color: #4CAF50;
                  color: #ffffff;
               }
               .content {
                  padding: 20px;
               }
               .content p {
                  font-size: 16px;
                  color: #333333;
                  line-height: 1.5;
               }
               .code {
                  display: block;
                  width: fit-content;
                  margin: 20px auto;
                  padding: 10px 20px;
                  background-color: #f4f4f4;
                  border: 1px solid #dddddd;
                  font-size: 24px;
                  letter-spacing: 4px;
                  color: #333333;
               }
               .footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #777777;
               }
            </style>
            </head>
            <body>
            <div class="container">
               <div class="header">
                  <h1>[YourAppName]</h1>
               </div>
               <div class="content">
                  <p>Hello [UserName],</p>
                  <p>Thank you for signing up for [YourAppName]! To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
                  <p class="code">${otp}</p>
                  <p>If you did not request this verification code, please ignore this email.</p>
                  <p>Thank you,<br>The [YourAppName] Team</p>
               </div>
               <div class="footer">
                  <p>&copy; 2024 [YourAppName]. All rights reserved.</p>
               </div>
            </div>
            </body>
         </html>
         `,
      };

      result = await transporter.sendMail(mailOptions);
   } catch (error) {
      throw new ErrorException(500, error, "Internal server error");
   }
   return result;
};

export const verifyEmailService = async (otp: string, email: string) => {
   const user = await getUserByEmail(email);
   if (!user) throw new ErrorException(404, "User not found");

   if (user.OTPcode !== otp) throw new ErrorException(400, "Invalid OTP");

   // otp only valid for 1 minutes
   if (new Date().getTime() - new Date(user.OTPCreatedAt).getTime() > 2 * 60 * 1000) {
      throw new ErrorException(400, "OTP expired");
   }

   const verifiedUser = await updateIsVerified(email);

   return { verifiedUser };
};

export const getUserService = async (req: express.Request) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));

   // authorization only owner or admin
   // if (identifier.role === "user") {
   //    throw new ErrorException(403, "Forbidden");
   // }

   const user = await getUserById(identifier._id);
   if (!user) throw new ErrorException(404, "User not found");

   return { user };
};

export const getAllUsersService = async (role: string) => {
   // authorization only admin
   if (role !== "admin") throw new ErrorException(403, "Forbidden");

   const users = await getUsers();
   return { users };
};

export const deleteUserService = async (id: string, actorId: string, role: string) => {
   // authorization only owner or admin
   if (role === "user" && actorId !== id) {
      throw new ErrorException(403, "Forbidden");
   }

   const deletedUser = await deleteUserById(id);
   if (!deletedUser) throw new ErrorException(404, "User not found");

   return { deletedUser };
};

export const updateUserService = async (id: string, actorId: string, role: string, payload: any) => {
   // authorization only owner
   if (actorId !== id && role !== "admin") {
      throw new ErrorException(403, "Forbidden");
   }

   const updatedUser = await updateUserById(id, payload);
   if (!updatedUser) throw new ErrorException(404, "User not found");

   return { updatedUser };
};
