import { verifyYourEmail } from "@/app/_htmlTemplates/template";
import sendEmail from "@/app/_utils/sendEmail";

export const POST = async function (request: Request) {
  try {
    const user = await request.json(); // This parses the JSON body
    console.log("user", user);
    if (!user.email || !user.name || !user.token) {
      return new Response("Missing required fields: email or name", {
        status: 400,
      });
    }

    const verify = verifyYourEmail(
      `${process.env.NEXTAUTH_URL}/verify-email/${user.token}`
    );

    const result = await sendEmail(user, verify, "Verify your email");
    console.log("result", result);
    if (result.success) {
      return new Response("Verification code sent successfully", {
        status: 200,
      });
    } else {
      return new Response("Failed to send code ", { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
