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
export const createGroom = async (values: Record<string, any>) => {
   try {
      // Buat groom baru
      const groom = new GroomModel(values);
      await groom.save();

      // Tambahkan referensi undangan ke invitation
      await InvitationModel.findByIdAndUpdate(groom.invitationId, {
         $set: { groom: groom._id },
      });

      return groom.toObject();
   } catch (error) {
      console.error("Error creating groom:", error);
      throw error;
   }
};
export const updateGroom = async (id: string, values: Record<string, any>) => {
   try {
      const groom = await GroomModel.findByIdAndUpdate(id, values, { new: true });
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
export const createBride = async (values: Record<string, any>) => {
   try {
      // Buat groom baru
      const bride = new BrideModel(values);
      await bride.save();

      // Tambahkan referensi undangan ke invitation
      await InvitationModel.findByIdAndUpdate(bride.invitationId, {
         $push: { bride: bride._id },
      });

      return bride.toObject();
   } catch (error) {
      console.error("Error creating bride:", error);
      throw error;
   }
};
export const updateBride = async (id: string, values: Record<string, any>) => {
   try {
      const bride = await BrideModel.findByIdAndUpdate(id, values, { new: true });
      return bride;
   } catch (error) {
      console.error("Error updating bride:", error);
      throw error;
   }
};

// event
const EventSchema = new mongoose.Schema({
   category: { type: String, required: true },
   title: { type: String, required: true },
   startTime: { type: Date, required: true },
   endTime: { type: Date, required: true },
   timezone: { type: String, required: true },
   place: { type: String, required: true },
   address: { type: String, required: true },
   googleMapsUrl: { type: String, required: true },
});

export const EventModel = mongoose.model("Event", EventSchema);

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
