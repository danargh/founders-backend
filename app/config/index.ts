import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
   DB_URL: string;
   DB_NAME: string;
   PORT: string;
   HOST: string;
   JWT_SECRET: string;
   JWT_SESSION: JwtSession;
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
   JWT_SECRET: process.env.JWT_SECRET as string,
   JWT_SESSION: { session: false },
};

export default config;
