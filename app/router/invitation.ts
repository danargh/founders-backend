import express from "express";
import { postInvitation, getInvitations, getInvitationById, postGroom, getGroomByInvitationId, updateGroom, postBride, getBrideByInvitationId, updateBride } from "../controllers/invitation";
import { authJwtMiddleware } from "../middlewares";

export default (router: express.Router) => {
   // general
   router.post("/invitation", authJwtMiddleware, postInvitation);
   router.get("/invitation", authJwtMiddleware, getInvitations);
   router.get("/invitation/:id", authJwtMiddleware, getInvitationById);

   // groom
   router.post("/groom", authJwtMiddleware, postGroom);
   router.get("/groom/:invitationId", authJwtMiddleware, getGroomByInvitationId);
   router.put("/groom/:id", authJwtMiddleware, updateGroom);

   // bride
   router.post("/bride", authJwtMiddleware, postBride);
   router.get("/bride/:invitationId", authJwtMiddleware, getBrideByInvitationId);
   router.put("/bride/:id", authJwtMiddleware, updateBride);
};
