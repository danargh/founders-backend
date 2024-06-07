import mongoose from "mongoose";
import { Invitation, User } from "../interfaces/index";
import { UserModel } from "./users";

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

// groom
const GroomSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   nickname: { type: String, required: true },
   childOrder: { type: Number, required: true },
   fatherName: { type: String, required: true },
   motherName: { type: String, required: true },
   address: { type: String, required: true },
   photo: { type: String, required: true },
   socialMedia: { type: Object, required: true },
});

export const GroomModel = mongoose.model("Groom", GroomSchema);

// bride
const BrideSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   nickname: { type: String, required: true },
   childOrder: { type: Number, required: true },
   fatherName: { type: String, required: true },
   motherName: { type: String, required: true },
   address: { type: String, required: true },
   photo: { type: String, required: true },
   socialMedia: { type: Object, required: true },
});

export const BrideModel = mongoose.model("Bride", BrideSchema);

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
