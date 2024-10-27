import { getUser } from "@/app/_lib/data-service";

export const POST = async function (request: Request) {
  const { email } = await request.json();
  const user = await getUser(email);

  if (!user)
    return Response.json({
      message: "User does not exist kindly register",
      success: false,
    });

  const token = await fetch(`${process.env.NEXTAUTH_URL}/api/users/get-token`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  const tokenData = await token.json();

  const codeResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/send-code`,
    {
      method: "POST",
      body: JSON.stringify({ ...user, reset: true, token: tokenData.token }),
    }
  );

  if (codeResponse.ok)
    return Response.json({
      message: "Reset token has been sent",
      success: true,
    });

  return Response.json({
    message: "Something went wrong, try again",
    success: false,
  });
};
