"use server";
import UserModel from "@/app/_lib/models/User";
import { dbConnect } from "@/app/_lib/mongodb";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyYourEmail } from "../_htmlTemplates/template";
import { ErrorResponse, SessionInterface } from "../_types/user";
import { generateToken } from "../_utils/generateToken";
import { encrypt } from "../_utils/hashString";
import sendEmail from "../_utils/sendEmail";
import { auth, signIn, signOut } from "./auth";
import BookingTypesModel from "./models/BookingTypes";

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard/booking-types" });
}
export const signOutAction = async function () {
  await signOut({ redirectTo: "/" });
};

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("fullname");
    const password = formData.get("password");
    // const { encryptedData } = encrypt(password as string);
    const authMethod = formData.get("authMethod") as string;
    const hashedPassword = await bcrypt.hash(password as string, 12);
    const email = formData.get("email");

    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) throw new Error("E-mail is required");
    if (!password) throw new Error("Password is required");
    await dbConnect(); // Ensure you're connected to the database
    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      authMethod,
    });
    if (newUser) {
      // const token = randomBytes(32).toString("hex");
      // const user = await  UserModel.findOne({email: email})
      const token = generateToken(newUser._id, "1m");

      const verify = verifyYourEmail(
        `${process.env.NEXTAUTH_URL}/verify-email/${token}`
      );
      await sendEmail(newUser, verify, "Verify your email");
      const { encryptedData: hashedToken } = encrypt(token);

      // Use the Web Crypto API to hash the token
      // const encoder = new TextEncoder();
      // const data = encoder.encode(token);
      // const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      // const hashArray = Array.from(new Uint8Array(hashBuffer));
      // const hashedToken = hashArray
      //   .map((b) => b.toString(16).padStart(2, "0"))
      //   .join("");

      const updatedData = {
        verificationToken: hashedToken,
      };

      await UserModel.findByIdAndUpdate(
        newUser._id,
        { $set: updatedData },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
    const e = error as ErrorResponse;
    if (e.code === 11000) {
      // Check for duplicate key error (E11000)
      throw new Error("Email already exists. Please login.");
    } else {
      // Handle other errors
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function loginAction(formData: FormData) {
  const authMethod = formData.get("authMethod") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log("authMethod", authMethod);

  if (authMethod === "credentials") {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result, "result");
    if (result.error) {
      throw new Error(result.error);
    } else {
      redirect("/dashboard/booking-types");
      // window.location.href = "/booking-types"; // Change this to your redirect URL
    }
  } else {
    // const result = await signInAction();
    // console.log(result, "result");
    // if (result.error) {
    //   throw new Error(result.error);
    // }
  }
}
export async function verifyUserEmail(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid ID format");
    }

    const user = await UserModel.findById(id);

    if (!user) throw new Error("User not found, kindly register");
    if (user.isVerified) {
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      if (result.error) {
        throw new Error(result.error);
      } else {
        redirect("/dashboard/booking-types");
      }
    }
    const token = generateToken(user._id, "5m");
    const verifyLink = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;
    await sendEmail(user, verifyLink, "Verify your email");
    const { encryptedData: hashedToken } = encrypt(token);

    const updatedData = {
      verificationToken: hashedToken,
    };

    await UserModel.findByIdAndUpdate(
      user._id,
      { $set: updatedData },
      { new: true }
    ).select("+password");
  } catch (error) {
    // Log the error for debugging
    console.error("Error in verifyUserEmail:", error);

    // You could handle errors here as needed, but avoid returning responses
    throw error; // Re-throw the error to be caught by the form's error handling logic
  }
}

interface IBookinType {
  name: string;
  description: string;
  public: string;
  price: number;
  duration: number;
  availability: string;
}

export const createBookingType = async function (data: IBookinType) {
  try {
    await dbConnect();
    const {
      name,
      description,

      price,
      duration,
      availability,
    } = data;
    const session = (await auth()) as SessionInterface;
    // const userId = (session as any).user.userId; // Using 'any' to bypass type checking (not recommended)

    if (!name) {
      throw new Error("Service name is required");
    }
    if (!description) throw new Error("Service description is required");
    if (!price) throw new Error("Service price is required");
    if (!duration) throw new Error("Service duration is required");
    if (!availability) throw new Error("Service availability is required");
    if (!data.public) throw new Error("Select if public or not");

    const newBookingType = await BookingTypesModel.create({
      name,
      description,
      price,
      public: data.public,
      availability,
      duration,
      owner: session.user.userId,
    });
    if (newBookingType) {
      revalidatePath("/dashboard/booking-types");
      return { success: true, message: "Booking type created successfully!" };
    } else {
      throw new Error("Something went wrong, please try again.");
    }
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "An error occurred.");
  }
};

export const toggleBookingType = async function (id: string, val: boolean) {
  await dbConnect();
  const result = await BookingTypesModel.findByIdAndUpdate(id, {
    $set: { active: val },
  });
  console.log(result, val);
  if (result) {
    return {
      success: true,
      message: `Booking has been  ${
        result.active ? "enabled" : "disabled"
      } successfully`,
    };
  }
};
