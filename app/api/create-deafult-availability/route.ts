import { createAvailability } from "@/app/_lib/availability";
import { ErrorResponse } from "@/app/_types/user";
import { defaultAvailability } from "@/app/_utils/data";

export const POST = async function (req) {
  try {
    console.log("req got here");
    const user = await req.json();
    const response = await createAvailability({
      ...defaultAvailability,
      owner: user.id,
    });
    console.log(response);
    if (response.success)
      return Response.json({
        message: "Default availability  is created",
      });

    throw new Error("Something went wrong");
  } catch (error) {
    const err = error as ErrorResponse;
    console.log(error, "error");
    return Response.json({
      message: err.message || "Failed to create defaukt availability",
    });
  }
};
