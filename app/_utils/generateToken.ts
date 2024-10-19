import jwt from "jsonwebtoken";
// import { IUser } from "../_types/user";

export const generateToken = (userId: string, expirationTime: string) => {
  // const options
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: expirationTime,
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};
export const decodeTokenWithoutVerify = (token: string) => {
  return jwt.decode(token); // Decode without verifying
};
