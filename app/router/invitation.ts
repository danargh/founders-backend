import express from "express";
import { postInvitation, getInvitations, getInvitationById, getGroomByInvitationId, updateGroom, getBrideByInvitationId, updateBride } from "../controllers/invitation";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   // general
   router.post("/invitation", authJwtMiddleware, postInvitation);
   router.get("/invitation", authJwtMiddleware, getInvitations);
   router.get("/invitation/:id", authJwtMiddleware, getInvitationById);

   // groom
   router.get("/groom/:invitationId", authJwtMiddleware, getGroomByInvitationId);
   router.put("/groom/:invitationId", authJwtMiddleware, updateGroom);

   // bride
   router.get("/bride/:invitationId", authJwtMiddleware, getBrideByInvitationId);
   router.put("/bride/:invitationId", authJwtMiddleware, updateBride);
};
