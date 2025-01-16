import { signIn } from "@/app/_lib/auth";
import { getUserWithPassword } from "@/app/_lib/data-service";
import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    const { email, inputPassword } = await request.json();
    const user = await getUserWithPassword(email);

    if (!user) throw new Error("User does not exist, kindly register");
    if (user.authMethod !== "credentials")
      throw new Error("You registered with a different auth method");
    if (!user.isVerified) throw new Error("Your account is not verified");
    const isCorrectPassword = await bcrypt.compare(
      inputPassword,
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
    return Response.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
