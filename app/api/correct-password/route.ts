import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    const user = await request.json();

    const isCorrectPassword = await bcrypt.compare(
      user.credentialPassword,
      user.password
    );
    return Response.json({
      message: "password is compared",
      isCorrectPassword,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create token",
    });
  }
};
