import { connect, connection } from "mongoose";
import config from "../config";

export async function connectDBTesting() {
   try {
      await connect(`${config.DB_URL}${config.DB_NAME}`);
   } catch (error) {
      console.log("DB connect for testing error");
   }
}

export async function closeDBTesting() {
   try {
      await connection.close();
   } catch (error) {
      console.log("DB close for testing error");
   }
}
