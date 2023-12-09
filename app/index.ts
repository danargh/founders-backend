import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares";

const app = express();

app.use(
   cors({
      credentials: true,
   })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
   console.log("Server running on http://localhost:3000/");
});

const MONGO_URL = "mongodb://0.0.0.0:27017/api_founders"; // DB URI

mongoose.Promise = Promise;
mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use(errorMiddleware);

app.use("/", router());
