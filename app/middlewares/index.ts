import express, { NextFunction } from "express";
// import ErrorHandler from "../utils/Error.utils";
import config from "../config";
import jwt from "jsonwebtoken";
import { Identifier, UserData } from "../interfaces";
import { ErrorException } from "../utils/Error.utils";
import logger from "../utils/Logger.utils";
import { getSessionByRefreshToken } from "../models/auth";
import { generateToken, verifyToken } from "../helpers";
import multer, { Multer } from "multer";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
   cloud_name: config.CLOUDINARY_CLOUD_NAME,
   api_key: config.CLOUDINARY_API_KEY,
   api_secret: config.CLOUDINARY_API_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
   buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

export const cloudinaryMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   try {
      const files: CloudinaryFile[] = req.files as CloudinaryFile[];
      if (!files || files.length === 0) {
         return next(new ErrorException(500, "No files provided"));
      }
      const cloudinaryUrls: string[] = [];
      for (const file of files) {
         const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 800, height: 600 }).toBuffer();

         const uploadStream = cloudinary.uploader.upload_stream(
            {
               resource_type: "auto",
               folder: "your-cloudinary-folder-name",
            } as any,
            (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
               if (err) {
                  return next(new ErrorException(500, err.message as string));
               }
               if (!result) {
                  return next(new ErrorException(500, "Cloudinary result is undefined"));
               }
               cloudinaryUrls.push(result.secure_url);

               if (cloudinaryUrls.length === files.length) {
                  //All files processed now get your images here
                  req.body.cloudinaryUrls = cloudinaryUrls;
                  next();
               }
            }
         );
         uploadStream.end(resizedBuffer);
      }
   } catch (error) {
      return next(new ErrorException(500, error.message as string));
   }
};

export const authJwtMiddleware = async (req: UserData, res: express.Response, next: express.NextFunction) => {
   const { authorization } = req.headers;
   const cookies = req.cookies;

   let token = authorization;
   let refreshToken = cookies.refreshToken;

   if (!token) {
      console.log("token");
      throw new ErrorException(401, "Unauthorized");
      return next(new ErrorException(401, "Unauthorized"));
   }
   if (!refreshToken) {
      console.log("refreshToken");
      throw new ErrorException(401, "Unauthorized");
      return next(new ErrorException(401, "Unauthorized"));
   }

   token = token.replace("Bearer ", "");
   refreshToken = refreshToken.replace("Bearer ", "");

   const dbRefreshToken = getSessionByRefreshToken(refreshToken);
   if (!dbRefreshToken) {
      throw new ErrorException(401, "Unauthorized");
      return next(new ErrorException(401, "Unauthorized"));
   }

   try {
      const secret = config.JWT_SECRET as string;
      jwt.verify(token, secret, async (err, decoded: jwt.JwtPayload) => {
         if (err) {
            throw new ErrorException(401, err.message);
         }
         // if expired
         if (decoded.exp < Date.now().valueOf() / 1000) {
            const newToken = await generateToken(decoded);
            req.headers.authorization = `Bearer ${newToken.token}`;
         }
         next();
      });
   } catch (error) {
      try {
         const secret = config.JWT_SECRET as string;
         const { _id, username, email, role }: Identifier = jwt.verify(refreshToken, secret) as Identifier;
         const newToken = await jwt.sign({ _id: _id, username: username, email: email, role: role }, secret, { expiresIn: "2h" });
         res.cookie("userToken", newToken, { httpOnly: true, sameSite: "strict" });
         next();
      } catch (error) {
         next(error);
      }
   }
};

export const errorMiddleware = (err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
   if (err instanceof ErrorException) {
      const status: number = err.status || 500;
      const message: string = err.message || "Something went wrong";
      const userMessage: string = err.userMessage || "Something went wrong";

      logger.error(`[${req.method}] - ${req.path} >> StatusCode:: ${status} | Message:: ${message}`);
      return res.status(status).json({ status: "Failed", message: message, userMessage: userMessage }).end();
   }
};
