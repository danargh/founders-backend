import express, { Application } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import { errorMiddleware } from "./middlewares";
import connectToMongoDB from "./database/index";

const app: Application = express();

// connect DB
(async () => {
   await connectToMongoDB;
})();

// init middleware
app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init routes
app.use("/", router());

// init error middleware
app.use(errorMiddleware);

// get user ip
// app.set( true);

// init swagger?

export default app;
