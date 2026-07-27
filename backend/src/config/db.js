const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    // eslint-disable-next-line no-console
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      // eslint-disable-next-line no-console
      console.error(`MongoDB connection failed: ${error.message}`);
      throw error;
    }

    // eslint-disable-next-line no-console
    console.warn(`MongoDB connection failed: ${error.message}`);
    // eslint-disable-next-line no-console
    console.warn("Falling back to in-memory MongoDB for local development.");

    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri("prepwise_ai");
    const connection = await mongoose.connect(memoryUri);

    // eslint-disable-next-line no-console
    console.log(`In-memory MongoDB connected: ${connection.connection.host}`);
  }
};

const stopMemoryDB = async () => {
  if (memoryServer) {
    await mongoose.disconnect();
    await memoryServer.stop();
    memoryServer = undefined;
  }
};

module.exports = connectDB;
module.exports.stopMemoryDB = stopMemoryDB;
