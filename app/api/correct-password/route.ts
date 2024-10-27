import { signIn } from "@/app/_lib/auth";
import { ErrorResponse } from "@/app/_types/user";
import bcrypt from "bcryptjs";

export const POST = async function (request: Request) {
  try {
    const user = await request.json();
    console.log(user);
    const isCorrectPassword = await bcrypt.compare(
      user.credentialPassword,
      user.password
    );
    console.log(isCorrectPassword);
    if (!isCorrectPassword)
      throw new Error("Incorrect password, you can use the forgot password");

    await signIn("credentials", {
      email: user.email,
      id: user.id,
      name: user.name,
      image: user.image,
      redirect: false,
    });
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
