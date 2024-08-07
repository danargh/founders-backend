import express from "express";
import {
   createInvitationService,
   getInvitationService,
   getInvitationByIdService,
   getGroomByInvitationIdService,
   updateGroomService,
   getBrideByInvitationIdService,
   updateBrideService,
   updtateEventService,
   createEventByInvitationIdService,
   getEventByInvitationIdService,
   deleteEventByIdService,
   createGuestService,
   getGuestByInvitationIdService,
   updateGuestService,
   deleteGuestByIdService,
} from "../services/invitation";
import { NextFunction } from "express";
import { Invitation } from "interfaces";
import { ErrorException } from "../utils/Error.utils";

// Invitation
export const postInvitation = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdInvitation } = await createInvitationService(req);
      return res.status(201).json({
         status: "Success",
         message: "Post invitation successfull!",
         data: {
            id: createdInvitation._id,
            websiteUrl: createdInvitation.websiteUrl,
            dueDateActive: createdInvitation.dueDateActive,
            theme: createdInvitation.theme,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const getInvitations = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { invitation } = await getInvitationService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get invitation successfull!",
         data: invitation.map((invitation: Invitation) => ({
            id: invitation._id,
            groom: invitation.groom,
            bride: invitation.bride,
            websiteUrl: invitation.websiteUrl,
            dueDateActive: invitation.dueDateActive,
            pricingCategory: invitation.pricingCategory,
            theme: invitation.theme,
            events: invitation.events,
            guests: invitation.guests,
         })),
      });
   } catch (error) {
      next(error);
   }
};
export const getInvitationById = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { invitation } = await getInvitationByIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get invitation successfull!",
         data: {
            id: invitation._id,
            groom: invitation.groom,
            bride: invitation.bride,
            websiteUrl: invitation.websiteUrl,
            dueDateActive: invitation.dueDateActive,
            pricingCategory: invitation.pricingCategory,
            theme: invitation.theme,
            events: invitation.events,
            guests: invitation.guests,
         },
      });
   } catch (error) {
      next(error);
   }
};

// Groom
export const getGroomByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { groom } = await getGroomByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get groom successfull!",
         data: {
            id: groom._id,
            fullName: groom.fullName,
            nickName: groom.nickName,
            childOrder: groom.childOrder,
            fatherName: groom.fatherName,
            motherName: groom.motherName,
            address: groom.address,
            photo: groom.photo,
            socialMedia: groom.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const updateGroom = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { updatedGroom } = await updateGroomService(req);
      return res.status(200).json({
         status: "Success",
         message: "Update groom successfull!",
         data: {
            id: updatedGroom._id,
            fullName: updatedGroom.fullName,
            nickName: updatedGroom.nickName,
            childOrder: updatedGroom.childOrder,
            fatherName: updatedGroom.fatherName,
            motherName: updatedGroom.motherName,
            address: updatedGroom.address,
            photo: updatedGroom.photo,
            socialMedia: updatedGroom.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};

// Bride
export const getBrideByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { bride } = await getBrideByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get bride successfull!",
         data: {
            id: bride._id,
            fullName: bride.fullName,
            nickName: bride.nickName,
            childOrder: bride.childOrder,
            fatherName: bride.fatherName,
            motherName: bride.motherName,
            address: bride.address,
            photo: bride.photo,
            socialMedia: bride.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const updateBride = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { updatedBride } = await updateBrideService(req);
      return res.status(200).json({
         status: "Success",
         message: "Update bride successfull!",
         data: {
            id: updatedBride._id,
            fullName: updatedBride.fullName,
            nickName: updatedBride.nickName,
            childOrder: updatedBride.childOrder,
            fatherName: updatedBride.fatherName,
            motherName: updatedBride.motherName,
            address: updatedBride.address,
            photo: updatedBride.photo,
            socialMedia: updatedBride.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};

// Event
export const updateEvent = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { updatedInvitation } = await updtateEventService(req);
      return res.status(200).json({
         status: "Success",
         message: "Update event successfull!",
         data: {
            id: updatedInvitation._id,
            invitationId: updatedInvitation.invitationId,
            category: updatedInvitation.category,
            title: updatedInvitation.title,
            date: updatedInvitation.date,
            startTime: updatedInvitation.startTime,
            endTime: updatedInvitation.endTime,
            timezone: updatedInvitation.timezone,
            place: updatedInvitation.place,
            address: updatedInvitation.address,
            googleMapsUrl: updatedInvitation.googleMapsUrl,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const createEventByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdEvent } = await createEventByInvitationIdService(req);
      return res.status(201).json({
         status: "Success",
         message: "Create event successfull!",
         data: {
            id: createdEvent._id,
            invitationId: createdEvent.invitationId,
            category: createdEvent.category,
            title: createdEvent.title,
            date: createdEvent.date,
            startTime: createdEvent.startTime,
            endTime: createdEvent.endTime,
            timezone: createdEvent.timezone,
            place: createdEvent.place,
            address: createdEvent.address,
            googleMapsUrl: createdEvent.googleMapsUrl,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const getEventByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { event } = await getEventByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get event successfull!",
         data: event.map((event: any) => ({
            id: event._id,
            invitationId: event.invitationId,
            category: event.category,
            title: event.title,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            timezone: event.timezone,
            place: event.place,
            address: event.address,
            googleMapsUrl: event.googleMapsUrl,
         })),
      });
   } catch (error) {
      next(error);
   }
};
export const deleteEventById = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { deletedEvent } = await deleteEventByIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Delete event successfull!",
         data: {
            id: deletedEvent._id,
            invitationId: deletedEvent.invitationId,
            category: deletedEvent.category,
            title: deletedEvent.title,
            date: deletedEvent.date,
            startTime: deletedEvent.startTime,
            endTime: deletedEvent.endTime,
            timezone: deletedEvent.timezone,
            place: deletedEvent.place,
            address: deletedEvent.address,
            googleMapsUrl: deletedEvent.googleMapsUrl,
         },
      });
   } catch (error) {
      next(error);
   }
};

// Guest
export const createGuest = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdGuest } = await createGuestService(req);
      return res.status(201).json({
         status: "Success",
         message: "Create guest successfull!",
         data: {
            id: createdGuest._id,
            invitationId: createdGuest.invitationId,
            fullName: createdGuest.fullName,
            address: createdGuest.address,
            category: createdGuest.category,
            status: createdGuest.status,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const getGuestByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { guest } = await getGuestByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Get guest successfull!",
         data: guest.map((guest: any) => ({
            id: guest._id,
            invitationId: guest.invitationId,
            fullName: guest.fullName,
            address: guest.address,
            category: guest.category,
            status: guest.status,
         })),
      });
   } catch (error) {
      next(error);
   }
};
export const updateGuest = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { updatedGuest } = await updateGuestService(req);
      return res.status(200).json({
         status: "Success",
         message: "Update guest successfull!",
         data: {
            id: updatedGuest._id,
            invitationId: updatedGuest.invitationId,
            fullName: updatedGuest.fullName,
            address: updatedGuest.address,
            category: updatedGuest.category,
            status: updatedGuest.status,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const deleteGuestById = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { deletedGuest } = await deleteGuestByIdService(req);
      return res.status(200).json({
         status: "Success",
         message: "Delete guest successfull!",
         data: {
            id: deletedGuest._id,
            invitationId: deletedGuest.invitationId,
            fullName: deletedGuest.fullName,
            address: deletedGuest.address,
            category: deletedGuest.category,
            status: deletedGuest.status,
         },
      });
   } catch (error) {
      next(error);
   }
};

// Gallery
export const uploadGallery = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { cloudinaryUrls } = req.body;
      return res.status(200).json({
         status: "Success",
         message: "Upload gallery successfull!",
         data: cloudinaryUrls,
      });
   } catch (error) {
      next(error);
   }
};

export const imageUploadHandler = async (req: express.Request, res: express.Response) => {
   try {
      const cloudinaryUrls = req.body.cloudinaryUrls;
      if (cloudinaryUrls.length === 0) {
         throw new ErrorException(500, "Internal Server Errror");
      }
      const images = cloudinaryUrls;
      return res.send(images);
   } catch (error) {
      return res.status(500).json({ error });
   }
};
