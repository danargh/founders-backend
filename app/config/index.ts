import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
   DB_URL: string;
   DB_NAME: string;
   PORT: string;
   HOST: string;
   BASE_URL: string;
   JWT_SECRET: string;
   JWT_SESSION: JwtSession;

   GOOGLE_CLIENT_ID: string;
   GOOGLE_CLIENT_SECRET: string;
   GOOGLE_REDIRECT_URI: string;

   EMAIL_HOST: string;
   EMAIL_USER: string;
   EMAIL_PASS: string;
   EMAIL_SERVICE: string;

   OAUTH_EMAIL_FROM: string;
   OAUTH_REFRESH_TOKEN: string;

   CLOUDINARY_CLOUD_NAME: string;
   CLOUDINARY_API_KEY: string;
   CLOUDINARY_API_SECRET: string;
}

interface JwtSession {
   session: boolean;
}

// Create an object to share the environment variables
const config: Config = {
   DB_URL: process.env.DB_URL as string,
   DB_NAME: process.env.DB_NAME as string,
   PORT: process.env.PORT as string,
   HOST: process.env.HOST as string,
   BASE_URL: process.env.BASE_URL as string,
   JWT_SECRET: process.env.JWT_SECRET as string,
   JWT_SESSION: { session: false },

   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
   GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI as string,

   EMAIL_HOST: process.env.EMAIL_HOST as string,
   EMAIL_USER: process.env.EMAIL_USER as string,
   EMAIL_PASS: process.env.EMAIL_PASS as string,
   EMAIL_SERVICE: process.env.EMAIL_SERVICE as string,

   OAUTH_EMAIL_FROM: process.env.OAUTH_EMAIL_FROM as string,
   OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN as string,

   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};

export default config;
