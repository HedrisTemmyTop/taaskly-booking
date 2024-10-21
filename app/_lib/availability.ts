"use server";

import { revalidatePath } from "next/cache";
import { IAvailability } from "../_types/IAvailability";
import { ErrorResponse, SessionInterface } from "../_types/user";
import AvailabilityModel from "../models/Availability";
import { auth } from "./auth";
import { dbConnect } from "./mongodb";

export const createAvailability = async function (availability) {
  await dbConnect();
  try {
    if (!availability.name) throw new Error("Name is compulsory");
    const session = (await auth()) as SessionInterface;
    const data = await AvailabilityModel.create({
      ...availability,
      owner: session?.user?.userId,
    });
    if (data) {
      revalidatePath("/dashboard/availability");
      return {
        success: true,
        message: "Availability has been created successfully",
      };
    }

    throw new Error("Something went wrong, try again");
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "Something went wrong, try again");
  }
};
export const editAvailability = async function (slug, availability) {
  await dbConnect();

  const result = await AvailabilityModel.findOneAndUpdate(
    {
      slug: slug,
    },
    availability,
    { new: true, runValidators: true }
  );
  if (result) {
    revalidatePath("/dashboard/availability");
    return {
      success: true,
      message: "Availability has been edited successfully",
    };
  } else {
    throw new Error("Something went wrong try again");
  }
};
export const getAvailability = async function (slug) {
  await dbConnect();
  try {
    const availability = (await AvailabilityModel.findOne({
      slug: slug,
    })) as unknown as IAvailability;
    if (!availability) return;

    return availability;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "Something went wrong");
  }
};

export const getUserAvailabilities = async function () {
  await dbConnect();
  const session = (await auth()) as SessionInterface;
  const availabilities = await AvailabilityModel.find({
    owner: session.user.userId,
    disabled: false,
  });

  return availabilities;
};

export const getAvailabilities = async function () {
  await dbConnect();
  const availabilities = await AvailabilityModel.find({ disabled: false });

  return availabilities;
};

export const deleteAvailability = async function (slug) {
  await dbConnect();

  const result = await AvailabilityModel.findOneAndUpdate(
    {
      slug: slug,
    },
    {
      disabled: true,
    },
    { new: true, runValidators: false }
  );

  if (result) {
    revalidatePath("/dashboard/availability");
    return {
      success: true,
      message: "Availability has been deleted successfully",
    };
  } else {
    throw new Error("Something went wrong try again");
  }
};
