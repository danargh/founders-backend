import {
   getInvitationByUserId,
   getInvitationById,
   getGroomByInvitationId,
   getBrideByInvitationId,
   updateBride,
   updateEvent,
   getEventsByInvitationId,
   createGuestByInvitationId,
   getGuestsByInvitationId,
   updateGuest,
   deleteGuestById,
} from "./../models/invitations";
import { createInvitation, updateGroom, createEventByInvitationId, deleteEventById } from "../models/invitations";
import express from "express";
import { getIdentifier } from "../helpers/index";
import { Identifier } from "../interfaces/index";
import { validate, createInvitationValidation } from "../utils/Validation.utils";

// Invitation
export const createInvitationService = async (req: express.Request) => {
   validate(createInvitationValidation, req.body);
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));
   const requestData = req.body;

   // Buat undangan baru
   const createdInvitation = await createInvitation({
      user: identifier._id,
      ...requestData,
   });

   return { createdInvitation };
};
export const getInvitationService = async (req: express.Request) => {
   const identifier: Identifier = await getIdentifier(req.headers.authorization?.replace("Bearer ", ""));

   // Get invitation by user id
   const invitation = await getInvitationByUserId(identifier._id);

   return { invitation };
};
export const getInvitationByIdService = async (req: express.Request) => {
   const { id } = req.params;

   // Get invitation by user id
   const invitation = await getInvitationById(id);

   return { invitation };
};

// Groom
export const getGroomByInvitationIdService = async (req: express.Request) => {
   const { invitationId } = req.params;

   const groom = await getGroomByInvitationId(invitationId);

   return { groom };
};
export const updateGroomService = async (req: express.Request) => {
   const { invitationId } = req.params;
   const requestData = req.body;

   const updatedGroom = await updateGroom(invitationId, requestData);

   return { updatedGroom };
};

// Bride
export const getBrideByInvitationIdService = async (req: express.Request) => {
   const { invitationId } = req.params;

   const bride = await getBrideByInvitationId(invitationId);

   return { bride };
};
export const updateBrideService = async (req: express.Request) => {
   const { invitationId } = req.params;
   const requestData = req.body;

   const updatedBride = await updateBride(invitationId, requestData);

   return { updatedBride };
};

// Event
export const updtateEventService = async (req: express.Request) => {
   const { id } = req.params;
   const requestData = req.body;

   const updatedInvitation = await updateEvent(id, requestData);

   return { updatedInvitation };
};
export const createEventByInvitationIdService = async (req: express.Request) => {
   const { invitationId } = req.params;
   const requestData = req.body;

   const createdEvent = await createEventByInvitationId(invitationId, requestData);

   return { createdEvent };
};
export const getEventByInvitationIdService = async (req: express.Request) => {
   const { invitationId } = req.params;

   const event = await getEventsByInvitationId(invitationId);

   return { event };
};
export const deleteEventByIdService = async (req: express.Request) => {
   const { id } = req.params;

   const deletedEvent = await deleteEventById(id);

   return { deletedEvent };
};

// Guest
export const createGuestService = async (req: express.Request) => {
   const { invitationId } = req.params;
   const requestData = req.body;

   const createdGuest = await createGuestByInvitationId(invitationId, requestData);

   return { createdGuest };
};
export const getGuestByInvitationIdService = async (req: express.Request) => {
   const { invitationId } = req.params;

   const guest = await getGuestsByInvitationId(invitationId);

   return { guest };
};
export const updateGuestService = async (req: express.Request) => {
   const { id } = req.params;
   const requestData = req.body;

   const updatedGuest = await updateGuest(id, requestData);

   return { updatedGuest };
};
export const deleteGuestByIdService = async (req: express.Request) => {
   const { id } = req.params;

   const deletedGuest = await deleteGuestById(id);

   return { deletedGuest };
};
