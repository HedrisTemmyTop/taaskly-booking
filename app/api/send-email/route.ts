import { sendWelcome } from "@/app/_utils/sendEmail";

export const POST = async function (request: Request) {
  try {
    const user = await request.json(); // This parses the JSON body
    console.log(user, "user");

    if (!user.email || !user.name) {
      return new Response("Missing required fields: email or name", {
        status: 400,
      });
    }

    const result = await sendWelcome(user);

    if (result.success) {
      return new Response("Welcome email sent successfully", { status: 200 });
    } else {
      return new Response("Failed to send welcome email", { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
