import { getUser, updateUser } from "@/app/_lib/data-service";
import crypto from "crypto";
export const POST = async function (request: Request) {
  const { email } = await request.json();
  const user = await getUser(email);

  if (!user)
    return Response.json({
      message: "User does not exist kindly register",
      success: false,
    });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const codeResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/send-code`,
    {
      method: "POST",
      body: JSON.stringify({ ...user, reset: true, token: resetToken }),
    }
  );

  if (codeResponse.ok) {
    const fiveMinutesLater = Date.now() + 300000; // 5 minutes in the future

    await updateUser(user.id, {
      passwordResetToken,
      passwordResetTokenExpiresAt: new Date(fiveMinutesLater),
    });
    return Response.json({
      message: "Reset token has been sent",
      success: true,
    });
  }
  return Response.json({
    message: "Something went wrong, try again",
    success: false,
  });
};
