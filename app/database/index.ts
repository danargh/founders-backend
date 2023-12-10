import { connect } from "mongoose";
import config from "../config";

const connectToMongoDB = async () => {
   try {
      await connect(`${config.DB_URL}${config.DB_NAME}`);
      console.log("Connected to MongoDB");
   } catch (error) {
      console.error("Failed to connect to MongoDB", error);
   }
};

export default connectToMongoDB();
