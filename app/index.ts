import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import { authJwtMiddleware, errorMiddleware } from "./middlewares";
import connectToMongoDB from "./database/index";
import passport from "passport";

const app = express();

app.use(
   cors({
      credentials: true,
   })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// connect DB
(async () => {
   await connectToMongoDB;
})();

const server = http.createServer(app);

authJwtMiddleware(passport);
app.use(passport.initialize());

app.use(errorMiddleware);

app.use("/", router());

server.listen(3000, () => {
   console.log("Server running on http://localhost:3000/");
});
