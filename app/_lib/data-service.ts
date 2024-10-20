// import User from "@/app/_lib/models/User";
// import { dbConnect } from "@/app/_lib/mongodb";
// import { sendWelcome } from "@/app/_utils/sendEmail";

// import { IUser } from "../_types/user";
import { IUser } from "../_types/user";
import { supabase } from "./supabase";

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/verify-email/${token}`
    );
    const data = await response.json();

    return data;
  } catch {
    throw new Error("Something went wrong");
  }
  // Use the Web Crypto API to hash the token
  // await dbConnect();
  // const encoder = new TextEncoder();
  // const data = encoder.encode(token);
  // const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  // const hashArray = Array.from(new Uint8Array(hashBuffer));
  // const hashedToken = hashArray
  //   .map((b) => b.toString(16).padStart(2, "0"))
  //   .join("");
  // throw new Error("Token has expired or user not found");
  // const user = await User.findOne({
  //   verificationToken: hashedToken,
  //   verificationTokenExpiresAt: { $gt: Date.now() },
  // });
  // if (!user) throw new Error("Token has expired or user not found");
  // user.isVerified = true;
  // user.modifiedAt = new Date();
  // user.lastLogin = new Date();
  // user.verificationToken = undefined;
  // user.verificationTokenAt = undefined;
  // user.verificationTokenExpiresAt = undefined;
  // const verifiedUser = await user.save();
  // // await sendWelcome(user);
  // return {
  //   success: true,
  //   message: "User verified successfully",
  //   user: verifiedUser,
  // };
  // redirect("/booking-types");
}

export const createUserWithOauth = async function (newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();
  if (error) {
    throw new Error("User could not be created");
  }
  console.log("new user created", data);

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
    method: "POST",
    body: JSON.stringify(data[0]),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response, "respnse here");
  // await sendWelcome(data[0]);

  return data;
};

export async function getUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getUserById(id: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export const updateUser = async (
  userId: string,
  updatedUserData: Partial<IUser>
) => {
  const { data, error } = await supabase
    .from("users") // Replace with your table name
    .update(updatedUserData)
    .eq("id", userId) // Assuming 'id' is the primary key for your users table
    .select();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("User could not be updated");
  }

  console.log("User updated successfully:", data);
  return data; // Return the updated user data
};
