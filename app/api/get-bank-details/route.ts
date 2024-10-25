import { ErrorResponse } from "@/app/_types/user";

export const GET = async function (req) {
  const { searchParams } = new URL(req.url);
  const account_number = searchParams.get("account_number");
  const bank_code = searchParams.get("bank_code");
  try {
    const response = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, "data");
    if (!response.ok) throw new Error(data.code);

    return Response.json({
      message: "User bank details has been queried",
      data,
    });
  } catch (error) {
    const err = error as ErrorResponse;
    console.log("error,", error);
    if(err.message === "invalid_bank_code"){
        return Response.json({
            message: "Invalid bank details",
          });
    }
    return Response.json({
      message: err.message || "User account not gotten",
    });
  }
};
