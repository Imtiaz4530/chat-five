import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("Connect To MongoDB");
  } catch (e) {
    console.log("Mongo connection error --> ", e.message);
  }
};

export default connectToMongoDB;
