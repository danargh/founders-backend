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
   EMAIL_HOST: string;
   EMAIL_USER: string;
   EMAIL_PASS: string;
   EMAIL_SERVICE: string;
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
   EMAIL_HOST: process.env.EMAIL_HOST as string,
   EMAIL_USER: process.env.EMAIL_USER as string,
   EMAIL_PASS: process.env.EMAIL_PASS as string,
   EMAIL_SERVICE: process.env.EMAIL_SERVICE as string,
};

export default config;
