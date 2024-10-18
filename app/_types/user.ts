import { JwtPayload } from "jsonwebtoken";

export interface IUser extends Document {
  phoneNumber: number;
  email: string;
  password: string;
  authMethod: "oauth" | "credentials" | "emailLink" | "phone";
  otp: string;
  isVerified: boolean;
  createdAt: Date;
  modifiedAt: Date;
  name: string;
  lastLogin: Date;
  verificationToken: string;
  verificationTokenExpiresAt: Date;
  verificationTokenAt: Date;
  image: string;
}

export interface ISignUp {
  email: string;
  name: string;
  password: string;
  authMethod: "oauth" | "credentials" | "emailLink" | "phone";
}

export interface DecodedToken extends JwtPayload {
  userId: string;
}

export interface ErrorResponse {
  message: string;
  name: string;
  code: number;
}

export interface UserInterface {
  name: string;
  email: string;
  image: string;
  userId?: string;
}

export interface ResultErr {
  error?: string;
  user?: { id: string; name: string; email: string }; // Example user object
}
export interface SessionInterface {
  user: UserInterface;
  expires: string;
}
