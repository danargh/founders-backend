import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router) => {
   router.get("/", (req, res) => res.send("Hello World!"));
   router.post("/auth/register", register);
   router.post("/auth/login", login);
};