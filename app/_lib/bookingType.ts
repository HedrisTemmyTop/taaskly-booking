"use server";

import { revalidatePath } from "next/cache";
import { ErrorResponse, SessionInterface } from "../_types/user";
import createSlug from "../_utils/createSlug";
import BookingTypesModel from "../models/BookingTypes";
import { auth } from "./auth";
import { dbConnect } from "./mongodb";
import { BookingTypesResponse } from "../_types/IBookingTypes";
import { supabase } from "./supabase";
interface IBookingType {
  name: string;
  description: string;
  public: string;
  price: number;
  duration: number;
  availability: { id: string; name: string };
}

export const createBookingType = async function (data: IBookingType) {
  try {
    await dbConnect();
    const { name, description, price, duration, availability } = data;
    console.log(data);
    const session = (await auth()) as SessionInterface;
    // const userId = (session as any).user.userId; // Using 'any' to bypass type checking (not recommended)

    if (!name) {
      throw new Error("Service name is required");
    }
    if (!description) throw new Error("Service description is required");
    if (price < 0) throw new Error("Service price should be 0 or more");
    if (duration < 1)
      throw new Error("Service duration is should be 1mins and above ");
    if (!availability.id) throw new Error("Service availability is required");
    if (!data.public) throw new Error("Select if public or not");
    const slug = createSlug(name);
    console.log(availability);
    const newBookingType = await BookingTypesModel.create({
      name,
      slug,
      description,
      price,
      public: data.public,
      availability: availability.id,

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
    if (err.code === 409) {
      err.message = "Booking name already exist";
    }
    throw new Error(err.message || "An error occurred.");
  }
};

export const toggleBookingType = async function (id: string, val: boolean) {
  await dbConnect();
  const result = await BookingTypesModel.findByIdAndUpdate(
    id,
    {
      $set: { active: val },
    },
    { new: true }
  ).lean();
  if (result) {
    revalidatePath("/dashboard/booking-types");
    return {
      success: true,
      message: `Booking has been  ${
        result.active ? "enabled" : "disabled"
      } successfully`,
    };
  }
};

export const getBookingType = async function (slug: string) {
  await dbConnect();
  const session = (await auth()) as SessionInterface;
  const result = (await BookingTypesModel.findOne({
    slug,
    disabled: false,
    owner: session?.user?.userId,
  })) as unknown as BookingTypesResponse;
  console.log("rrr", result);
  return result;
};

export const getBookingTypes = async function () {
  await dbConnect();
  const result = await BookingTypesModel.find({ disabled: false });
  return result;
};

export const editBookingType = async function (id, data) {
  await dbConnect();
  const slug = createSlug(data.name);
  const {
    name,

    description,
    price,

    availability,
    duration,
  } = data;
  const result = await BookingTypesModel.findByIdAndUpdate(
    id,
    {
      name,
      slug,
      description,
      price,
      public: data.public,
      availability: availability.id,
      duration,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  if (result) {
    revalidatePath("/dashboard/booking-types");
    return {
      success: true,
      message: `Booking has been  editted successfully`,
    };
  } else {
    throw new Error("Something went wrong, please try again.");
  }
};

export const deleteBookingType = async function (id: string) {
  await dbConnect();

  const result = await BookingTypesModel.findByIdAndUpdate(id, {
    $set: {
      disabled: true,
    },
  });

  if (result) {
    revalidatePath("/dashboard/booking-types");

    return {
      success: true,
      message: `Booking has been deleted successfully`,
    };
  }

  throw new Error("Something went wrong");
};

export const getUserBookingWithAvailability = async function (slug) {
  await dbConnect();
  const response = await BookingTypesModel.findOne({ slug }).populate(
    "availability"
  );

  // const response = await BookingTypesModel.findOne({
  //   slug,
  // }).populate("availability");
  return JSON.parse(JSON.stringify(response));
};

export async function getUserInServer(email: string) {
  console.log(email);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  console.log(data);

  return JSON.parse(JSON.stringify(data));
}
