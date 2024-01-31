import mongoose, { ConnectOptions } from "mongoose";

const DB: string = process.env.MONGO_DB_URL || "";

const connect = async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  console.log("Connected to DB");
  try {
  } catch (error) {
    throw new Error("Error in connecting to mongodb");
  }
};

export default connect;
