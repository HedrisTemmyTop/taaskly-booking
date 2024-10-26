import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    console.log("req got here");
    const { password } = await request.json(); // This parses the JSON body
    console.log(password, "pass");
    const hashedPassword = await bcrypt.hash(password as string, 12);
    console.log(hashedPassword, "req got here");
    return Response.json({
      message: "password is hashed",
      hashedPassword,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create token",
    });
  }
};
