import { createUserWithCredentials } from "@/app/_lib/data-service";
import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    console.log("req got here");
    const { password, name, email, authMethod } = await request.json(); // This parses the JSON body
    console.log(password, "pass");
    const hashedPassword = await bcrypt.hash(password as string, 12);
    console.log(hashedPassword, "req got here");
    await createUserWithCredentials({
      email,
      name,
      password: hashedPassword,
      authMethod,
      isVerified: false,
    });

    return Response.json({
      message: "user is created",
      success: true,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create token",
    });
  }
};
