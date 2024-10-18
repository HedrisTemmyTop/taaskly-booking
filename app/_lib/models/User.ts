// models/User.ts
import { IUser } from "@/app/_types/user";
import validateEmail from "@/app/_utils/validateEmail";
import mongoose, { Schema } from "mongoose";

// Define the user interface extending Document from Mongoose

// Define the schema for the user
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    sparse: true,
    unique: false,

    message: "Name is required",
  },

  email: {
    type: String,
    sparse: true,
    unique: true,
    validate: {
      validator: function (v: string): boolean {
        if (
          this.authMethod === "credentials" ||
          this.authMethod === "emailLink"
        ) {
          return validateEmail(v);
        }
        return true;
      },
      message: "E-mail is required",
    },
  },
  password: {
    type: String,
    sparse: true,
    select: false,
    validate: {
      validator: function (v) {
        return this.authMethod !== "credentials" || v;
        // if(this.authMethod !== "credentials") ret
      },
      message: "Password is required",
    },
    minLength: 6,
  },
  authMethod: {
    type: String,
    enum: ["credentials", "oauth", "phone", "emailLink"],
    required: true,
  },
  phoneNumber: { type: Number, required: false },
  otp: {
    code: String,
    expiresAt: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiresAt: Date,
  verificationTokenAt: Date,
  image: {
    type: String,
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
