import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, required: true, default: "user" },
   createdAt: { type: Date, default: Date.now },

   femaleName: { type: String, required: true },
   maleName: { type: String, required: true },
   websiteUrl: { type: String, required: true },
   phone: { type: String, required: true },
   verificationOTP: { type: String },
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
