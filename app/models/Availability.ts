import mongoose, { model, Schema } from "mongoose";
import { Day } from "../_types/IAvailability";
import generateSlugFromObjectId from "../_utils/generateSlug";

export interface IAvailability extends Document {
  name: string;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
  disabled: boolean;
  owner: string;
  updatedAt: Date;
  createdAt: Date;
  slug: string;
}

const availabilitySchema: Schema<IAvailability> = new Schema<IAvailability>(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    disabled: { type: Boolean, default: false, select: false },
    slug: {
      type: String,
    },

    monday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    tuesday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    wednesday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    thursday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    friday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    saturday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
    sunday: {
      isActive: Boolean,
      time: [
        {
          from: String,
          to: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

availabilitySchema.pre("save", function (next) {
  if (!this.slug && this._id) {
    this.slug = generateSlugFromObjectId(this._id);
  }
  next();
});

const AvailabilityModel: mongoose.Model<IAvailability> =
  mongoose.models.Availability ||
  model<IAvailability>("Availability", availabilitySchema);

export default AvailabilityModel;
