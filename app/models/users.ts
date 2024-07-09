import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String },
   role: { type: String, required: true, default: "user" },
   phone: { type: String, required: false },
   isVerified: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   membership: { type: String, required: true, default: "free" },
   invitations: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation" },

   OTPcode: { type: String },
   OTPCreatedAt: { type: Date },
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
export const findOrCreateUser = async (email: string, username: string) => {
   return UserModel.findOne({ email }).then((user: any) => {
      if (user) return user.toObject();
      return createUser({ email, username });
   });
};
export const createVerificationOTP = async (email: string, otp: string) => {
   return await UserModel.findOneAndUpdate({ email }, { OTPcode: otp, OTPCreatedAt: new Date() }, { new: true }).exec();
};
export const updateIsVerified = async (email: string) => {
   return await UserModel.findOneAndUpdate({ email }, { isVerified: true, OTPcode: null, OTPCreatedAt: null }, { new: true }).exec();
};
