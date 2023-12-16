import { ErrorException } from "../utils/Error.utils";
import { getUserById, getUsers } from "../models/users";

export const getAllUsersService = async (id: string) => {
   // authorization
   const user = getUserById(id);
   if ((await user).role !== "admin") throw new ErrorException(403, "Forbidden");

   const users = await getUsers();
   return { users };
};
