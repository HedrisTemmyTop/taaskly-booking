import { getUserById } from "@/app/_lib/data-service";
import { ErrorResponse } from "@/app/_types/user";
import {
  decodeToken,
  decodeTokenWithoutVerify,
} from "@/app/_utils/generateToken";
import { JwtPayload } from "jsonwebtoken";
interface IJwtData extends JwtPayload {
  userId: string;
}
export const POST = async function (req) {
  const { token } = await req.json();
  console.log(token, "token");
  try {
    const jwtData = decodeToken(token as string);
    const user = await getUserById((jwtData as IJwtData).userId as string);
    console.log(user, "user");
    if (!user) {
      return Response.json({
        message: "Invalid token try again",
        success: false,
      });
    }
    return Response.json({
      message: "Code is verified",
      success: true,
      data: user.id,
    });
  } catch (error) {
    // Handle JWT errors
    const e = error as ErrorResponse;
    console.error("JWT error:", e.message); // Log the error for debugging
    let statusCode = 500;
    let message = "An unexpected error occurred";
    let data;
    // Customize response based on the error type
    if (e.name === "TokenExpiredError") {
      statusCode = 401; // Unauthorized
      data = decodeTokenWithoutVerify(token as string);
      message = "Token has expired try again";
    } else if (e.name === "JsonWebTokenError") {
      statusCode = 401; // Unauthorized
      message = "Invalid token pls register";
    }

    return Response.json({
      message: message,
      data,
      statusCode,
      success: false,
    });
  }
};
