// mongodb.js
import mongoose from "mongoose";
import BookingModel from "../models/Booking";
import AvailabilityModel from "../models/Availability";
import BookingTypesModel from "../models/BookingTypes";

const password = process.env.MONGODB_PASSWORD as string;
const username = process.env.MONGO_DB_USERNAME as string;

// Construct the MongoDB connection URL
const conString = process.env.MONGODB_URL?.replace(
  "PASSWORD",
  password
).replace("USERNAME", username) as string;

global.mongoose = global.mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (global.mongoose.conn) {
    console.log("Connected from previous");
    return global.mongoose.conn;
  }

  try {
    const promise = mongoose.connect(conString);

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Newly connected");

    // Ensure the models are registered after connection
    ensureModelsRegistered();

    return global.mongoose.conn;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) return;
  global.mongoose.conn = null;
  mongoose.disconnect();
};

function ensureModelsRegistered() {
  if (!mongoose.models.Availability) {
    mongoose.model("Availability", AvailabilityModel.schema);
  }
  if (!mongoose.models.Booking) {
    mongoose.model("Booking", BookingModel.schema);
  }
  if (!mongoose.models.BookingTypesModel) {
    mongoose.model("Booking-types", BookingTypesModel.schema);
  }
}
