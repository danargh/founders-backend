import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { authJwtMiddleware, isOwner } from "../middlewares";
import passport from "passport";

export default (router: express.Router) => {
   router.get("/users", passport.authenticate("jwt", { session: false }), getAllUsers);
   router.delete("/users/:id", authJwtMiddleware, isOwner, deleteUser);
   router.patch("/users/:id", authJwtMiddleware, isOwner, updateUser);
};
