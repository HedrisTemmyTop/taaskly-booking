// import User from "@/app/_lib/models/User";
// import { dbConnect } from "@/app/_lib/mongodb";
// import { sendWelcome } from "@/app/_utils/sendEmail";

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/verify-email/${token}`
    );
    const data = await response.json();

    return data;
  } catch {
    throw new Error("Something went wrong");
  }
  // Use the Web Crypto API to hash the token
  // await dbConnect();
  // const encoder = new TextEncoder();
  // const data = encoder.encode(token);
  // const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  // const hashArray = Array.from(new Uint8Array(hashBuffer));
  // const hashedToken = hashArray
  //   .map((b) => b.toString(16).padStart(2, "0"))
  //   .join("");
  // throw new Error("Token has expired or user not found");
  // const user = await User.findOne({
  //   verificationToken: hashedToken,
  //   verificationTokenExpiresAt: { $gt: Date.now() },
  // });
  // if (!user) throw new Error("Token has expired or user not found");
  // user.isVerified = true;
  // user.modifiedAt = new Date();
  // user.lastLogin = new Date();
  // user.verificationToken = undefined;
  // user.verificationTokenAt = undefined;
  // user.verificationTokenExpiresAt = undefined;
  // const verifiedUser = await user.save();
  // // await sendWelcome(user);
  // return {
  //   success: true,
  //   message: "User verified successfully",
  //   user: verifiedUser,
  // };
  // redirect("/booking-types");
}
