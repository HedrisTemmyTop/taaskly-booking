import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define the TypeScript interface for type safety
interface IBookingTypes extends Document {
  name: string;
  description: string; // Required now
  createdAt: Date;
  updatedAt: Date;
  price: number | "Free";
  public: "Yes" | "No"; // Only "Yes" or "No"
  active: boolean;
  availability: string;
  duration: number;
  owner: string;
}

// 2. Create the Mongoose schema
const BookingTypeSchema: Schema<IBookingTypes> = new Schema<IBookingTypes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    price: { type: Number, required: true }, // Remove the "Free" type from here
    public: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
      default: "Yes",
    },
    active: { type: Boolean, required: true, default: true },
    availability: { type: String, required: true },
    duration: { type: Number, required: true },
    owner: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// 3. Create and export the model
const BookingTypesModel: mongoose.Model<IBookingTypes> =
  mongoose.models["booking-types"] ||
  model<IBookingTypes>("booking-types", BookingTypeSchema);

export default BookingTypesModel;
