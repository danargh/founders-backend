import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, required: true, default: "admin" },
   createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
   return UserModel.find({ role: "user" });
};
export const getUserByEmail = (email: string) => {
   return UserModel.findOne({ email });
};
export const getUserBySessionToken = (sessionToken: string) => {
   return UserModel.findOne({ "authentication.sessionToken": sessionToken });
};
export const getUserById = (id: string) => {
   return UserModel.findById(id);
};
export const createUser = (values: Record<string, any>) => {
   return new UserModel(values).save().then((user: any) => user.toObject());
};
export const deleteUserById = (id: string) => {
   return UserModel.findOneAndDelete({ _id: id });
};
export const updateUserById = (id: string, values: Record<string, any>) => {
   return UserModel.findByIdAndUpdate(id, values);
};