import express from "express";
import { createInvitationService, getInvitationService, getInvitationByIdService } from "../services/invitation";
import { NextFunction } from "express";
import { Invitation } from "interfaces";

export const postInvitation = async (req: express.Request, res: express.Response, next: NextFunction) => {
   try {
      const { createdInvitation } = await createInvitationService(req);
      return res.status(201).json({
         status: "Success",
         code: 201,
         message: "Post invitation successfull!",
         data: {
            groom: createdInvitation.groom,
            bride: createdInvitation.bride,
            websiteUrl: createdInvitation.websiteUrl,
            dueDateActive: createdInvitation.dueDateActive,
            theme: createdInvitation.theme,
            events: createdInvitation.events,
            guests: createdInvitation.guests,
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
