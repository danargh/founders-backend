import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, required: true, default: "user" },
   phone: { type: String, required: true },
   isVerified: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   membership: { type: String, required: true, default: "free" },
   invitations: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation" },

   OTPcode: { type: String },
   OTPcreatedAt: { type: Date },
});

const SessionSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   token: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = async () => {
   return await UserModel.find({ role: "user" }).exec();
};
export const getUserByEmail = async (email: string) => {
   return UserModel.findOne({ email });
};
export const getUserById = async (id: string) => {
   return await UserModel.findById(id).exec();
};
export const createUser = async (values: Record<string, any>) => {
   return new UserModel(values).save().then((user: any) => user.toObject());
};
export const deleteUserById = async (id: string) => {
   return await UserModel.findOneAndDelete({ _id: id }).exec();
};
export const deleteUserByEmail = async (email: string) => {
   return await UserModel.findOneAndDelete({ email: email }).exec();
};
export const updateUserById = async (id: string, values: Record<string, any>) => {
   return await UserModel.findByIdAndUpdate(id, values, { new: true }).exec();
};
export const createVerificationOTP = async (id: string, otp: string) => {
   return await UserModel.findByIdAndUpdate(id, { OTPcode: otp, OTPcreatedAt: new Date() }, { new: true }).exec();
};
export const updateIsVerified = async (id: string) => {
   return await UserModel.findByIdAndUpdate(id, { isVerified: true }, { new: true }).exec();
};
