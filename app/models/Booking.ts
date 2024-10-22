import mongoose, { Schema, Types } from "mongoose";
import generateSlugFromObjectId from "../_utils/generateSlug";

interface IBooking extends Document {
  price: number;
  bookingType: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  bookedDate: Date;
  bookedTime: string;
  notes: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  reference: string;
  slug: string;
  customerSmsId: string;
  ownerSmsId: string;
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    reference: {
      type: String,
    },
    slug: {
      type: String,
    },
    ownerSmsId: String,
    customerSmsId: String,
    bookingType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking-Type",
    },
    customerName: {
      type: String,
      required: [true, "Customer's name is required"],
    },
    customerPhoneNumber: {
      type: String,
      required: [true, "Customer's phone number is required"],
    },
    bookedDate: {
      type: Date,
      required: [true, "Booked date is required"],
    },
    bookedTime: {
      type: String,
      required: [true, "Booking time is required"],
    },
    notes: {
      type: String,
    },
    isPaid: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", function (next) {
  if (this._id && !this.slug) {
    this.slug = generateSlugFromObjectId(this._id);
  }
  next();
});
const BookingModel =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default BookingModel;
