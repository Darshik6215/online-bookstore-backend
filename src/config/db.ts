import { config } from "dotenv";
import { connect } from "mongoose";

config();

export const connectDB = async () => {
  try {
    console.log("✅ Database Connected.");
    await connect(process.env.MONGO_URL as string);
  } catch (error) {
    console.log("❌ Database Connection Error!");
  }
};
