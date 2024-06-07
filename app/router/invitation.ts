import express from "express";
import { postInvitation, getInvitation } from "../controllers/invitation";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   router.post("/invitation", authJwtMiddleware, postInvitation);
   router.get("/invitation", authJwtMiddleware, getInvitation);
};
