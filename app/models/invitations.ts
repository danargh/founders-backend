import mongoose from "mongoose";
import { Invitation, User } from "../interfaces/index";
import { UserModel } from "./users";
import { required } from "joi";

// invitation
const InvitationSchema = new mongoose.Schema<Invitation>({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   groom: { type: mongoose.Schema.Types.ObjectId, ref: "Groom" },
   bride: { type: mongoose.Schema.Types.ObjectId, ref: "Bride" },
   websiteUrl: { type: String, required: true },
   dueDateActive: { type: Date, required: true },
   pricingCategory: { type: String, required: true },
   theme: { type: String, required: false },
   events: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
   guests: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
});

export const InvitationModel = mongoose.model("Invitation", InvitationSchema);

export const createInvitation = async (values: Record<string, any>) => {
   try {
      // Buat undangan baru
      const invitation = new InvitationModel(values);
      await invitation.save();

      // Tambahkan referensi undangan ke user
      await UserModel.findByIdAndUpdate(invitation.user, {
         $push: { invitations: invitation._id },
      });

      return invitation.toObject();
   } catch (error) {
      console.error("Error creating invitation:", error);
      throw error;
   }
};
export const getInvitationByUserId = async (userId: string) => {
   try {
      const invitation = await InvitationModel.find({ user: userId }).populate("groom").populate("bride").populate("events").populate("guests");
      return invitation;
   } catch (error) {
      console.error("Error getting invitation by user id:", error);
      throw error;
   }
};
export const getInvitationById = async (id: string) => {
   try {
      const invitation = await InvitationModel.findOne({ _id: id }).populate("groom").populate("bride").populate("events").populate("guests");
      return invitation;
   } catch (error) {
      console.error("Error getting invitation by id:", error);
      throw error;
   }
};

// groom
const GroomSchema = new mongoose.Schema({
   invitationId: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation", required: true },
   fullName: { type: String, required: false },
   nickName: { type: String, required: false },
   childOrder: { type: Number, required: false },
   fatherName: { type: String, required: false },
   motherName: { type: String, required: false },
   address: { type: String, required: false },
   photo: { type: String, required: false },
   socialMedia: { type: Object, required: false },
});
export const GroomModel = mongoose.model("Groom", GroomSchema);
export const getGroomByInvitationId = async (invitationId: string) => {
   try {
      const groom = await GroomModel.findOne({ invitationId });
      return groom;
   } catch (error) {
      console.error("Error getting groom by invitation id:", error);
      throw error;
   }
};
export const updateGroom = async (invitationId: string, values: Record<string, any>) => {
   try {
      const groom = await GroomModel.findOneAndUpdate({ invitationId }, values, { new: true, upsert: true, runValidators: true });
      return groom;
   } catch (error) {
      console.error("Error updating groom:", error);
      throw error;
   }
};

// bride
const BrideSchema = new mongoose.Schema({
   invitationId: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation" },
   fullName: { type: String, required: true },
   nickName: { type: String, required: true },
   childOrder: { type: Number, required: true },
   fatherName: { type: String, required: true },
   motherName: { type: String, required: true },
   address: { type: String, required: true },
   photo: { type: String, required: true },
   socialMedia: { type: Object, required: true },
});
export const BrideModel = mongoose.model("Bride", BrideSchema);
export const getBrideByInvitationId = async (invitationId: string) => {
   try {
      const bride = await BrideModel.findOne({ invitationId });
      return bride;
   } catch (error) {
      console.error("Error getting bride by invitation id:", error);
      throw error;
   }
};
export const updateBride = async (invitationId: string, values: Record<string, any>) => {
   try {
      const bride = await BrideModel.findOneAndUpdate({ invitationId }, values, { new: true, upsert: true, runValidators: true });
      return bride;
   } catch (error) {
      console.error("Error updating bride:", error);
      throw error;
   }
};

// event
const EventSchema = new mongoose.Schema({
   invitationId: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation", required: true },
   category: { type: String, required: true },
   title: { type: String, required: true },
   date: { type: Date, required: true },
   startTime: { type: String, required: true },
   endTime: { type: String, required: true },
   timezone: { type: String, required: true },
   place: { type: String, required: true },
   address: { type: String, required: true },
   googleMapsUrl: { type: String, required: true },
});
export const EventModel = mongoose.model("Event", EventSchema);
export const updateEvent = async (id: string, values: Record<string, any>) => {
   try {
      const event = await EventModel.findOneAndUpdate({ id }, values, { new: true, upsert: true, runValidators: true });
      return event;
   } catch (error) {
      console.error("Error updating event:", error);
      throw error;
   }
};
export const createEventByInvitationId = async (invitationId: string, values: Record<string, any>) => {
   try {
      const event = new EventModel({ ...values, invitationId });
      await event.save();
      return event;
   } catch (error) {
      console.error("Error creating event by invitation id:", error);
      throw error;
   }
};
export const getEventsByInvitationId = async (invitationId: string) => {
   try {
      const events = await EventModel.find({ invitationId });
      return events;
   } catch (error) {
      console.error("Error getting events by invitation id:", error);
      throw error;
   }
};
export const deleteEventById = async (id: string) => {
   try {
      const event = await EventModel.findOneAndDelete({ id });
      return event;
   } catch (error) {
      console.error("Error deleting event by id:", error);
      throw error;
   }
};

// guest
const GuestSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   category: { type: String, required: true },
   quote: { type: String, required: true },
   quoteDate: { type: Date, required: true },
});

export const GuestModel = mongoose.model("Guest", GuestSchema);

// gallery
const GallerySchema = new mongoose.Schema({
   images: { type: Array, required: true },
   music: { type: String, required: true },
   video: { type: String, required: true },
});

export const GalleryModel = mongoose.model("Gallery", GallerySchema);

// quote
const QuoteSchema = new mongoose.Schema({
   quote: { type: String, required: true },
   author: { type: String, required: true },
});

export const QuoteModel = mongoose.model("Quote", QuoteSchema);

// themes
const ThemeSchema = new mongoose.Schema({
   name: { type: String, required: true },
   category: { type: String, required: true },
   filePath: { type: String, required: true },
});

export const ThemeModel = mongoose.model("Theme", ThemeSchema);
