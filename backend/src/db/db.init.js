import mongoose from "mongoose";

export const initializeDB = async () => {
  try {
    console.info("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.info("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.info("MongoDB disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};
