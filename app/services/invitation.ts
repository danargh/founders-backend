import { getInvitationByUserId } from "./../models/invitations";
import { createInvitation } from "../models/invitations";
import express from "express";
import { getIdentifier } from "../helpers/index";
import { Identifier } from "../interfaces/index";
import { validate, createInvitationValidation } from "../utils/Validation.utils";

export const createInvitationService = async (req: express.Request) => {
   validate(createInvitationValidation, req.body);
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));

   const requestData = req.body;

   // Buat undangan baru
   const createdInvitation = await createInvitation({
      user: identifier.id,
      ...requestData,
   });

   return { createdInvitation };
};

export const getInvitationService = async (req: express.Request) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));

   // Get invitation by user id
   const invitation = await getInvitationByUserId(identifier.id);

   return { invitation };
};
