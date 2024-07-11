import express from "express";
import {
   postInvitation,
   getInvitations,
   getInvitationById,
   getGroomByInvitationId,
   updateGroom,
   getBrideByInvitationId,
   updateBride,
   updateEvent,
   createEventByInvitationId,
   getEventByInvitationId,
   deleteEventById,
   createGuest,
   getGuestByInvitationId,
   updateGuest,
   deleteGuestById,
   uploadGallery,
} from "../controllers/invitation";
import { authJwtMiddleware, cloudinaryMiddleware } from "../middlewares";

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

   // event
   router.put("/event/:id", authJwtMiddleware, updateEvent);
   router.post("/event/:invitationId", authJwtMiddleware, createEventByInvitationId);
   router.get("/event/:invitationId", authJwtMiddleware, getEventByInvitationId);
   router.delete("/event/:id", authJwtMiddleware, deleteEventById);

   // guest
   router.post("/guest/:invitationId", authJwtMiddleware, createGuest);
   router.get("/guest/:invitationId", authJwtMiddleware, getGuestByInvitationId);
   router.put("/guest/:id", authJwtMiddleware, updateGuest);
   router.delete("/guest/:id", authJwtMiddleware, deleteGuestById);

   // gallery
   router.post("gallery/upload", cloudinaryMiddleware, uploadGallery);
};
