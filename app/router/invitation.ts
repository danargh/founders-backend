import express from "express";
import { postInvitation, getInvitations, getInvitationById } from "../controllers/invitation";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   router.post("/invitation", authJwtMiddleware, postInvitation);
   router.get("/invitation", authJwtMiddleware, getInvitations);
   router.get("/invitation/:id", authJwtMiddleware, getInvitationById);
};
