import { supabase } from "@/app/_lib/supabase";
import crypto from "crypto";

export const POST = async function (req) {
  const { token } = await req.json();
  console.log(token, "token");
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(hashedToken);
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("passwordResetToken", hashedToken)
      .single();
    console.log(data);
    if (!data)
      return Response.json({
        message: "Invalid token try again",
        success: false,
      });
    const expiryDate = new Date(data.passwordResetTokenExpiresAt);
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
      data: data.id,
    });
  } catch (error) {
    return Response.json({
      message: error.message || "Something went wrong",

      success: false,
    });
  }
};
