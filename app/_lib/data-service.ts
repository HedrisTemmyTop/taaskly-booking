import UserModel from "@/app/models/User";
import { dbConnect } from "@/app/_lib/mongodb";
// import { sendWelcome } from "@/app/_utils/sendEmail";

import { ErrorResponse, IUser } from "../_types/user";

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
  try {
    await dbConnect();
    const createdUser = await UserModel.create(newUser);
    const userData = createdUser.toJSON();

    const defaultAvResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/create-deafult-availability`,
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    if (defaultAvResponse.ok) {
      await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // await sendWelcome(userData);

      return [userData];
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: unknown) {
    const err = error as { code?: number };
    if (err.code === 11000) {
      throw new Error("Email already exists");
    }
    throw new Error("User could not be created");
  }
};

export const createUserWithCredentials = async function (newUser) {
  try {
    await dbConnect();
    const createdUser = await UserModel.create(newUser);
    const userData = createdUser.toJSON();

    const token = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users/get-token`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const tokenData = await token.json();
    console.log(tokenData);
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-code`, {
      method: "POST",
      body: JSON.stringify({
        ...userData,
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
  } catch (error: unknown) {
    console.log(error);
    const err = error as { code?: number };
    if (err.code === 11000) throw new Error("Email already exist");
    else throw new Error("User could not be created");
  }

  // await sendWelcome(userData);
};
export async function getUser(email: string) {
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...user,
      id: user._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserWithPassword(email: string) {
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email }).select("+password").lean();

    if (!user) {
      return null;
    }

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...user,
      id: user._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    console.log(userData, "data");
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    await dbConnect();
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return null;
    }

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...user,
      id: user._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export const updateUser = async (
  userId: string,
  updatedUserData: Partial<IUser>
) => {
  try {
    await dbConnect();
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true, runValidators: true }
    ).lean();

    if (!user) throw new Error("You brazzy gaan ooo, user does not exist");

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...user,
      id: user._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    console.log([userData]);
    return [userData]; // Return array to match Supabase format
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("User could not be updated");
  }
};

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("fullname");
    const password = formData.get("password");
    // const { encryptedData } = encrypt(password as string);
    const authMethod = formData.get("authMethod") as string;
    // const hashResponse = await fetch("/api/register-user", {
    //   method: "POST",
    //   body: JSON.stringify({}),
    // });
    // console.log("hashResponse here", hashResponse);
    // const hashData = await hashResponse.json();
    // console.log("hashData", hashData);
    const email = formData.get("email");

    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) throw new Error("E-mail is required");
    if (!password) throw new Error("Password is required");
    // await dbConnect(); // Ensure you're connected to the database
    const newUser = await fetch("/api/register-user", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        password,
        authMethod,
        isVerified: false,
      }),
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

  try {
    await dbConnect();
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashData.hashedPassword,
          passwordResetTokenExpiresAt: null,
          passwordResetToken: null,
          authMethod: "credentials",
        },
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) throw new Error("User does not exist");

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...updatedUser,
      id: updatedUser._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    console.log([userData]);
    return {
      success: true,
      data: [userData],
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    throw new Error(err.message || "Something went wrong");
  }
}
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch("/api/login-user", {
    method: "POST",
    body: JSON.stringify({
      email,
      inputPassword: password,
    }),
  });
  // if (!user) throw new Error("User does not exist, kindly register");
  // if (user.authMethod !== "credentials")
  //   throw new Error("You registered with a different auth method");
  // if (!user.isVerified) throw new Error("Your account is not verified");
  // const response = await fetch("/api/correct-password", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     ...user,
  //     image: null,
  //     credentialPassword: password,
  //   }),
  // });
  console.log("response", response);
  const responseData = await response.json();
  console.log(responseData, response, "response");
  if (responseData.success) window.location.href = "/dashboard/booking-types";
  else throw new Error(responseData.message || "Something went wrong");
}
