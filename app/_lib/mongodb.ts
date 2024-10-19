import mongoose from "mongoose";
// mongodb.js

// import { MongoClient } from "mongodb";
// Fetch username and password from environment variables
const password = process.env.MONGODB_PASSWORD as string;
const username = process.env.MONGO_DB_USERNAME as string;

// Construct the MongoDB connection URL
const conString = process.env.MONGODB_URL?.replace(
  "PASSWORD",
  password
).replace("USERNAME", username) as string;

// import mongoose, { Mongoose } from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const promise = mongoose.connect(conString, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
