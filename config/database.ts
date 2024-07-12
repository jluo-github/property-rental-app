import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if connected,return null

  if (connected) {
    // console.log("MongoDB is already connected");
    return;
  }

  // connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    connected = true;
    // console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
