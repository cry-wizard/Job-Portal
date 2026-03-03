import mongoose from "mongoose";
import "dotenv/config";

const MG_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    if (!MG_URL) {
      throw new Error("MONGO_URL not defined in .env");
    }
    await mongoose.connect(MG_URL, {});
    console.log("MongoseDB connected");
  } catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
