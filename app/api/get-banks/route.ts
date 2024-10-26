import { ErrorResponse } from "@/app/_types/user";

export const GET = async function () {
  try {
    const response = await fetch("https://api.paystack.co/bank", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch banks");

    const data = await response.json();

    return Response.json({
      message: "Nigeria banks has been queried",
      data,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to fetch banks",
    });
  }
};
