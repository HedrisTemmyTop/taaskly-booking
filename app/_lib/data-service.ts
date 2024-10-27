// import User from "@/app/_lib/models/User";
// import { dbConnect } from "@/app/_lib/mongodb";
// import { sendWelcome } from "@/app/_utils/sendEmail";

// import { IUser } from "../_types/user";

import { ErrorResponse, IUser } from "../_types/user";
import { supabase } from "./supabase";

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(`/api/auth/verify-email/${token}`);
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
    console.log(error, "error message");
    throw new Error("User could not be created");
  }
  const defaultAvResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/create-deafult-availability`,
    {
      method: "POST",
      body: JSON.stringify(data[0]),
    }
  );

  if (defaultAvResponse.ok) {
    await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: "POST",
      body: JSON.stringify(data[0]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // await sendWelcome(data[0]);

    return data;
  } else {
    throw new Error("Somethingw went wrong ");
  }
};

export const createUserWithCredentials = async function (newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();
  if (error) {
    console.log(error);
    if (error.code === "23505") throw new Error("Email already exist");
    else throw new Error("User could not be created");
  }

  if (data) {
    // const [newUser]: IUser[] = data as IUser[];
    const token = await fetch("/api/users/get-token", {
      method: "POST",
      body: JSON.stringify(data[0]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tokenData = await token.json();
    console.log(tokenData);
    const response = await fetch(`/api/send-code`, {
      method: "POST",
      body: JSON.stringify({
        ...data[0],
        token: tokenData.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    // const responseData = await response.json();
    // console.log(responseData);
    if (!response.ok) throw new Error("Something went wrong");
    return {
      success: true,
      message: "Verification code sent to your mail",
    };
  }

  // await sendWelcome(data[0]);
};
export async function getUser(email: string) {
  const { data, error } = await supabase
    .from("users_safe")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

export async function getUserWithPassword(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

export async function getUserById(id: string) {
  const { data } = await supabase
    .from("users_safe")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export const updateUser = async (
  userId: string,
  updatedUserData: Partial<IUser>
) => {
  const user = await getUserById(userId);
  if (!user) throw new Error("You brazzy gaan ooo, user does not exist");

  const { data, error } = await supabase
    .from("users") // Replace with your table name
    .update(updatedUserData)
    .eq("id", userId) // Assuming 'id' is the primary key for your users table
    .select();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("User could not be updated");
  }
  if (!data || data.length === 0) throw new Error("User does not exist");
  return data; // Return the updated user data
};

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("fullname");
    const password = formData.get("password");
    // const { encryptedData } = encrypt(password as string);
    const authMethod = formData.get("authMethod") as string;
    const hashResponse = await fetch("/api/hashPassword", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    console.log("hashResponse here", hashResponse);
    const hashData = await hashResponse.json();
    console.log("hashData", hashData);
    const email = formData.get("email");

    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) throw new Error("E-mail is required");
    if (!password) throw new Error("Password is required");
    // await dbConnect(); // Ensure you're connected to the database
    const newUser = await createUserWithCredentials({
      email,
      name,
      password: hashData.hashedPassword,
      authMethod,
      isVerified: false,
    });
    console.log(newUser);
    if (newUser) return newUser;
    throw new Error("something went wrong");
  } catch (error) {
    console.error(error);
    const e = error as ErrorResponse;

    // Handle other errors
    throw new Error(
      e.message || "An unexpected error occurred. Please try again later."
    );
  }
}

export async function resetPassword(userId: string, password: string) {
  const hashResponse = await fetch("/api/hashPassword", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  console.log(userId);
  const user = await getUserById(userId);
  console.log(user);
  if (!user) throw new Error("You brazzy gaan ooo, user does not exist");

  console.log("hashResponse here", hashResponse);
  const hashData = await hashResponse.json();
  console.log(hashData);
  const { data, error } = await supabase
    .from("users")
    .update({
      password: hashData.hashedPassword,
      passwordResetTokenExpiresAt: null,
      passwordResetToken: null,
      authMethod: "credentials",
    })
    .eq("id", userId) // Assuming 'id' is the primary key for your users table
    .select();

  // Get affected rows count

  console.log(data, error);
  if (error) throw new Error(error.message || "Something went wrong");
  // updateUser()

  return {
    success: true,
    data,
  };
}
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await getUserWithPassword(email);
  if (!user) throw new Error("User does not exist, kindly register");
  if (user.authMethod !== "credentials")
    throw new Error("You registered with a different auth method");
  if (!user.isVerified) throw new Error("Your account is not verified");
  const response = await fetch("/api/correct-password", {
    method: "POST",
    body: JSON.stringify({
      ...user,
      credentialPassword: password,
    }),
  });
  const responseData = await response.json();
  if (responseData.success) window.location.href = "/dashboard/booking-types";
  else throw new Error(responseData.message || "Something went wrong");
}
