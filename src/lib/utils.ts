import mongoose from "mongoose";

const DB: string = process.env.MONGO_DB_URL || "";

const connection = {
  isConnected: 0,
};

const connect = async () => {
  try {
    if (connection?.isConnected) {
      console.log("Connect to DB was earlier");
      return;
    }

    const db = await mongoose.connect(DB);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connect to DB");
  } catch (error) {
    throw new Error("Error in connecting to mongodb");
  }
};

export default connect;
