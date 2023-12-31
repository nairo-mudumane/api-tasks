import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;

/**Opens Mongoose's default connection to MongoDB */
export async function connectToDatabase(): Promise<void> {
  console.log("connecting to database...");

  try {
    if (uri) {
      mongoose.set("strict", true);
      mongoose.set("debug", process.env.NODE_ENV === "development");

      await mongoose.connect(String(uri), {
        dbName,
        retryReads: true,
        retryWrites: true,
        connectTimeoutMS: 12000,
      });
    } else {
      throw new Error("No database url provided");
    }
  } catch (error: Error | any) {
    throw new Error(error.message);
  }

  console.log("connected to database");
}
