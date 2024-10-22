// "use server";

// import User from "@/app/_lib/models/User";
// import { dbConnect } from "@/app/_lib/mongodb";
// import { sendWelcome } from "@/app/_utils/sendEmail";

// import { signIn } from "@/app/_lib/auth";
// // import User from "@/app/_lib/models/User";
// import { dbConnect } from "@/app/_lib/mongodb";
// import { ErrorResponse } from "@/app/_types/user";
// import {
//   decodeToken,
//   decodeTokenWithoutVerify,
// } from "@/app/_utils/generateToken";
// import { sendWelcome } from "@/app/_utils/sendEmail";
// import { JwtPayload } from "jsonwebtoken";

// export async function verifyEmail(token: string) {

// }
// interface IJwtData extends JwtPayload {
//   userId: string;
// }

export async function GET() {
// request: Request
  // const { token } = params;
  // const url = new URL(request.url);
  // // Get the token from the URL path
  // const token = url.pathname.split("/").pop();
  // try {
  //   // Use the Web Crypto API to hash the token
  //   console.log("on server", token);
  //   await dbConnect();
  //   // const encoder = new TextEncoder();
  //   // const data = encoder.encode(token);
  //   // const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //   // const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   // const hashedToken = hashArray
  //   //   .map((b) => b.toString(16).padStart(2, "0"))
  //   //   .join("");
  //   const jwtData = decodeToken(token as string);
  //   // console.log("hasheed", hashedToken);
  //   console.log(jwtData, "jwtData");
  //   const user = await User.findById(
  //     (jwtData as IJwtData).userId as string
  //   ).select("+password");
  //   if (!user) {
  //     return new Response(
  //       JSON.stringify({
  //         success: false,
  //         message: "user not found",
  //       }),
  //       {
  //         status: 404,
  //       }
  //     );
  //   }
  //   if (user.isVerified) {
  //     const result = await signIn("credentials", {
  //       email: user.email,
  //       password: user.password,
  //       redirect: false,
  //     });
  //     if (result.error) {
  //       throw new Error(result.error);
  //     } else {
  //       return new Response(
  //         JSON.stringify({
  //           success: true,
  //           message: "Email verified successfully",
  //         }),
  //         {
  //           status: 200,
  //         }
  //       );
  //     }
  //   }
  //   user.isVerified = true;
  //   user.modifiedAt = new Date();
  //   user.lastLogin = new Date();
  //   user.verificationToken = undefined;
  //   await user.save();
  //   await sendWelcome(user);
  //   const result = await signIn("credentials", {
  //     email: user.email,
  //     password: user.password,
  //     redirect: false,
  //   });
  //   if (result.error) {
  //     throw new Error(result.error);
  //   }
  //   return new Response(
  //     JSON.stringify({
  //       success: true,
  //       message: "Email verified successfully",
  //     }),
  //     {
  //       status: 200,
  //     }
  //   );
  // } catch (error) {
  //   // Handle JWT errors
  //   const e = error as ErrorResponse;
  //   console.error("JWT error:", e.message); // Log the error for debugging
  //   let statusCode = 500;
  //   let message = "An unexpected error occurred";
  //   let data;
  //   // Customize response based on the error type
  //   if (e.name === "TokenExpiredError") {
  //     statusCode = 401; // Unauthorized
  //     data = decodeTokenWithoutVerify(token as string);
  //     message = "Token has expired try again";
  //   } else if (e.name === "JsonWebTokenError") {
  //     statusCode = 401; // Unauthorized
  //     message = "Invalid token pls register";
  //   }
  //   return new Response(JSON.stringify({ success: false, message, data }), {
  //     status: statusCode,
  //   });
  // }
}

//   catch (error) {
//     console.log(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "An error occurred during verification",
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// }
