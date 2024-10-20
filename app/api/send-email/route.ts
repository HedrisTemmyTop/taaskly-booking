import { sendWelcome } from "@/app/_utils/sendEmail";

export const GET = async function (request: Request) {
  const user = await request.json(); // Attempt to read the body

  return await sendWelcome(user);
};
