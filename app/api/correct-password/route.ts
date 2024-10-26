import { signIn } from "@/app/_lib/auth";
import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    const user = await request.json();

    const isCorrectPassword = await bcrypt.compare(
      user.credentialPassword,
      user.password
    );
    console.log(isCorrectPassword);
    if (!isCorrectPassword)
      throw new Error("Incorrect password, you can use the forgot password");

    await signIn(
      "credentials",
      {
        email: user.email,
        id: user.id,
        name: user.name,
        image: user.image,
        redirect: false,
      },
      "/dashboard/booking-types"
    );
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create token",
    });
  }
};
