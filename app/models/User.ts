import mongoose, { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  phoneNumber?: string | number;
  email: string;
  password?: string;
  authMethod: "oauth" | "credentials" | "emailLink" | "phone";
  otp?: string;
  isVerified: boolean;
  createdAt: Date;
  modifiedAt: Date;
  name: string;
  lastLogin?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  verificationTokenAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: Date;
  image?: string;
  bio?: string;
  userBalance?: number;
  id?: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    phoneNumber: {
      type: Schema.Types.Mixed,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    authMethod: {
      type: String,
      enum: ["oauth", "credentials", "emailLink", "phone"],
      required: true,
      default: "credentials",
    },
    otp: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastLogin: {
      type: Date,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpiresAt: {
      type: Date,
      select: false,
    },
    verificationTokenAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetTokenExpiresAt: {
      type: Date,
      select: false,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    userBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create a virtual for id that maps to _id
userSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const UserModel: mongoose.Model<IUser> =
  (mongoose.models && mongoose.models.User) || model<IUser>("User", userSchema);

export default UserModel;
