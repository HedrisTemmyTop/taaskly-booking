import { ErrorResponse } from "@/app/_types/user";
import { generateToken } from "@/app/_utils/generateToken";

export const POST = async function (request) {
  try {
    const user = await request.json(); // This parses the JSON body
    console.log(user);
    const token = generateToken(user.id, "10m");

    return Response.json({
      message: "Token has been created",
      token,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create token",
    });
  }
};
