"use server";
import { redirect } from "next/navigation";
// import UserModel from "@/app/_lib/models/User";
// import { redirect } from "next/navigation";
// import { verifyYourEmail } from "../_htmlTemplates/template";
import { signIn, signOut } from "./auth";
import { getUserById } from "./data-service";
// import { generateToken } from "../_utils/generateToken";
// import sendEmail from "../_utils/sendEmail";
// import { encrypt } from "../_utils/hashString";

export async function signInAction() {
  // await dbConnect();
  await signIn("google", {
    redirectTo: "/dashboard/booking-types",
  });
  // console.log("result==>", result);
}
export const signOutAction = async function (path = "/") {
  await signOut({ redirectTo: path });
};

// export async function loginAction(formData: FormData) {
//   const authMethod = formData.get("authMethod") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   console.log("authMethod", authMethod);

//   if (authMethod === "credentials") {
//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//     console.log(result, "result");
//     if (result.error) {
//       throw new Error(result.error);
//     } else {
//       redirect("/dashboard/booking-types");
//       // window.location.href = "/booking-types"; // Change this to your redirect URL
//     }
//   } else {
//     // const result = await signInAction();
//     // console.log(result, "result");
//     // if (result.error) {
//     //   throw new Error(result.error);
//     // }
//   }
// }
export async function verifyUserEmail(id) {
  // const id = formData.get("id") as string;
  console.log(id);

  try {
    if (!id) {
      throw new Error("Invalid ID format");
    }

    // const user = await UserModel.findById(id);
    const user = await getUserById(id);

    if (!user) throw new Error("User not found, kindly register");
    if (user.isVerified) {
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      if (result.error) {
        throw new Error(result.error);
      } else {
        redirect("/dashboard/booking-types");
      }
    }
    const token = await fetch("/api/users/get-token", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tokenData = await token.json();

    const response = await fetch(`/api/send-code`, {
      method: "POST",
      body: JSON.stringify({
        ...user,
        token: tokenData.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Something went wrong");
    return {
      success: true,
      message: "Verification code sent to your mail",
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error in verifyUserEmail:", error);

    // You could handle errors here as needed, but avoid returning responses
    throw error; // Re-throw the error to be caught by the form's error handling logic
  }
}

// export async function createNewUser(user) {
//   await dbConnect();
//   return await UserModel.create({
//     email: user.email,
//     name: user.name,
//     image: user.image,
//     authMethod: "oauth",
//     isVerified: true,
//   });
// }
// export async function findUser(user) {
//   return await UserModel.findOne({ email: user.email });
// }
