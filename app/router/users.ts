import express from "express";
import { getAllUsers, deleteUser, updateUser, verifyEmail, sendEmail } from "../controllers/users";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   router.get("/users", authJwtMiddleware, getAllUsers);
   router.delete("/users/:id", authJwtMiddleware, deleteUser);
   router.patch("/users/:id", authJwtMiddleware, updateUser);
   router.post("/user/verify", authJwtMiddleware, verifyEmail);
   router.get("/user/send-email", authJwtMiddleware, sendEmail);
};
