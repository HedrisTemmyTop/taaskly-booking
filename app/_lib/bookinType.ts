"use server";

import { notFound } from "next/navigation";
import createSlug from "../_utils/createSlug";
import BookingTypesModel from "./models/BookingTypes";
import { dbConnect } from "./mongodb";
import { ErrorResponse, SessionInterface } from "../_types/user";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";
interface IBookingType {
  name: string;
  description: string;
  public: string;
  price: number;
  duration: number;
  availability: string;
}

export const createBookingType = async function (data: IBookingType) {
  try {
    await dbConnect();
    const { name, description, price, duration, availability } = data;
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
    const slug = createSlug(name);
    const newBookingType = await BookingTypesModel.create({
      name,
      slug,
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
    console.log(error);
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
  console.log(result, val);
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
  const result = await BookingTypesModel.findOne({
    slug,
    disabled: false,
    owner: session?.user?.userId,
  }).lean();

  if (result) {
    return result;
  } else notFound();
};

export const getBookingTypes = async function () {
  await dbConnect();
  const result = await BookingTypesModel.find({ disabled: false }).lean();
  return result;
};

export const editBookingType = async function (id, data) {
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
      availability,
      duration,
    },
    {
      runValidators: true,
      new: true,
    }
  ).lean();
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
