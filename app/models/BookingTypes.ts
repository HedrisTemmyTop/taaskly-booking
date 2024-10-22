import AppError from "@/app/_utils/appError";
import mongoose, { Document, Schema, Types, model } from "mongoose";

interface IBookingTypes extends Document {
  name: string;
  description: string; // Required now
  createdAt: Date;
  updatedAt: Date;
  price: number;
  public: "Yes" | "No"; // Only "Yes" or "No"
  active: boolean;
  availability: Types.ObjectId;
  duration: number;
  owner: string;
  disabled: boolean;
  slug: string;
}

const BookingTypeSchema: Schema<IBookingTypes> = new Schema<IBookingTypes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    price: { type: Number, required: true, default: 0 },
    public: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
      default: "Yes",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    slug: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    availability: { type: mongoose.Schema.Types.ObjectId, ref: "Availability" },
    duration: { type: Number, required: true },
    owner: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

BookingTypeSchema.pre("save", async function (next) {
  const booking = this as IBookingTypes;

  const existingBooking = await BookingTypesModel.findOne({
    name: booking.name,
    owner: booking.owner,
    disabled: false,
  });

  if (existingBooking) {
    return next(
      new AppError(
        409,
        `A booking with the name "${booking.name}" already exists for this owner.`
      )
    );
  }

  next();
});

const BookingTypesModel: mongoose.Model<IBookingTypes> =
  mongoose.models["Booking-types"] ||
  model<IBookingTypes>("Booking-types", BookingTypeSchema);

export default BookingTypesModel;
