import UserModel from "@/app/models/User";
import { dbConnect } from "@/app/_lib/mongodb";
import crypto from "crypto";

export const POST = async function (req) {
  const { token } = await req.json();
  console.log(token, "token");
  try {
    await dbConnect();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(hashedToken);
    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
    })
      .select("+passwordResetToken +passwordResetTokenExpiresAt")
      .lean();

    console.log(user);
    if (!user) {
      return Response.json({
        message: "Invalid token try again",
        success: false,
      });
    }

    const expiryDate = new Date(user.passwordResetTokenExpiresAt!);
    if (expiryDate.getTime() < Date.now()) {
      console.log(expiryDate.getTime(), Date.now());
      return Response.json({
        message: " Token has expired try again",
        success: false,
      });
    }

    return Response.json({
      message: "Code is verified",
      success: true,
      data: user._id.toString(),
    });
  } catch (error: unknown) {
    const e = error as { message?: string };
    return Response.json({
      message: e.message || "Something went wrong",
      success: false,
    });
  }
};
