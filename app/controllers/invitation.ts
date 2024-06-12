import express from "express";
import {
   createInvitationService,
   getInvitationService,
   getInvitationByIdService,
   createGroomService,
   getGroomByInvitationIdService,
   updateGroomService,
   createBrideService,
   getBrideByInvitationIdService,
   updateBrideService,
} from "../services/invitation";
import { NextFunction } from "express";
import { Invitation } from "interfaces";

// Invitation
export const postInvitation = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdInvitation } = await createInvitationService(req);
      return res.status(201).json({
         status: "Success",
         code: 201,
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
         code: 200,
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
         code: 200,
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
export const postGroom = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdGroom } = await createGroomService(req);
      return res.status(201).json({
         status: "Success",
         code: 201,
         message: "Post groom successfull!",
         data: {
            id: createdGroom._id,
            fullName: createdGroom.fullName,
            nickName: createdGroom.nickName,
            childOrder: createdGroom.childOrder,
            fatherName: createdGroom.fatherName,
            motherName: createdGroom.motherName,
            address: createdGroom.address,
            photo: createdGroom.photo,
            socialMedia: createdGroom.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const getGroomByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { groom } = await getGroomByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         code: 200,
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
         code: 200,
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
export const postBride = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdBride } = await createBrideService(req);
      return res.status(201).json({
         status: "Success",
         code: 201,
         message: "Post bride successfull!",
         data: {
            id: createdBride._id,
            fullName: createdBride.fullName,
            nickName: createdBride.nickName,
            childOrder: createdBride.childOrder,
            fatherName: createdBride.fatherName,
            motherName: createdBride.motherName,
            address: createdBride.address,
            photo: createdBride.photo,
            socialMedia: createdBride.socialMedia,
         },
      });
   } catch (error) {
      next(error);
   }
};
export const getBrideByInvitationId = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { bride } = await getBrideByInvitationIdService(req);
      return res.status(200).json({
         status: "Success",
         code: 200,
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
         code: 200,
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
