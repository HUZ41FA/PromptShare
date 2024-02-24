import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to mongodb");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt_share",
    });
  } catch (err) {
    console.log(err);
  }
};
