import express from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   router.get("/users", authJwtMiddleware, getAllUsers);
   router.delete("/users/:id", authJwtMiddleware, deleteUser);
   router.patch("/users/:id", authJwtMiddleware, updateUser);
};
