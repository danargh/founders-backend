import express from "express";
import { googleUrl } from "../services/authentication";
import { login, loginGoogle, logout, register, validateToken } from "../controllers/authentication";

export default (router: express.Router) => {
   router.get("/", (req, res) => res.send("Hello World!"));
   router.post("/auth/register", register);
   router.post("/auth/login", login);
   router.get("/auth/validate", validateToken);
   router.get("/auth/logout", logout);

   // google
   router.get("/auth/google", (req, res) => res.redirect(googleUrl));
   router.get("/auth/google/callback", loginGoogle);
};
