import express from "express";
import { getUser, getAllUsers, deleteUser, updateUser, verifyEmail, sendEmail } from "../controllers/users";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   router.get("/users", authJwtMiddleware, getAllUsers);
   router.get("/user", authJwtMiddleware, getUser);
   router.delete("/user/:id", authJwtMiddleware, deleteUser);
   router.patch("/user/:id", authJwtMiddleware, updateUser);
   router.post("/user/verify", authJwtMiddleware, verifyEmail);
   router.get("/user/send-email", authJwtMiddleware, sendEmail);
};
