import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { authJwtMiddleware, authorization } from "../middlewares";

export default (router: express.Router) => {
   router.get("/users", authJwtMiddleware, getAllUsers);
   router.delete("/users/:id", authJwtMiddleware, authorization, deleteUser);
   router.patch("/users/:id", authJwtMiddleware, authorization, updateUser);
};
