"use server";

import { enUS } from "date-fns/locale";
import {
  bookingEmail,
  bookingWhatsappMessage,
} from "../_htmlTemplates/template";
import { ErrorResponse, IUser } from "../_types/user";
import sendEmail from "../_utils/sendEmail";
import BookingModel from "../models/Booking";

import { addMinutes, format } from "date-fns";
import { revalidatePath } from "next/cache";
import { addDuration } from "../_utils/generateTime";
import sendWhatsappMessage from "../_utils/sendWhatsappMessage";
import { auth } from "./auth";
import { dbConnect } from "./mongodb";
import UserModel from "../models/User";
import WithdrawalModel from "../models/Withdrawal";

export const createBooking = async function (bookingData) {
  //   console.log("formData", formData);
  //   const payment = await initializePayment();
  //   console.log(payment);
  //   return payment;
  const {
    price,
    bookingType,
    customerName,
    customerEmail,
    customerPhoneNumber,
    bookedDate,
    bookedTime,
    notes,
    isPaid,
    reference,
    duration,
    ownersEmail,
    ownersName,
    description,
    ownersPhoneNumber,
    countryCode,
    bookingTitle,
  } = bookingData;
  try {
    await dbConnect();
    const customerPhone = `${countryCode}${customerPhoneNumber}`;
    const data = await updateCustomerBalance(ownersEmail, price, "deposit");
    if (!data) throw new Error("Something went wrong");
    const newBooking = await BookingModel.create({
      price,
      bookingType,
      customerName,
      customerEmail,
      customerPhoneNumber: customerPhone,
      bookedDate,
      bookedTime,
      notes,
      isPaid,
      reference,
      duration,
      ownersEmail,
      ownersName,
    });

    if (newBooking) {
      /// implementation to send email and whatsapp
      const dateSelected = new Date(newBooking.bookedDate);
      const fromDate = format(dateSelected, "EEEE, MMMM do yyyy", {
        locale: enUS,
      });
      const dateSelectedPlusDuration = addMinutes(
        dateSelected,
        newBooking.duration
      );

      const toDate = format(dateSelectedPlusDuration, "EEEE, MMMM do yyyy", {
        locale: enUS,
      });
      const toTime = addDuration(newBooking.bookedTime, newBooking.duration);

      const bookingDetails = {
        ownersName,
        ownersEmail,
        receiver: ownersName,
        fromTime: bookedTime,
        fromDate,
        toTime,
        customerName,
        customerEmail,
        description,
        toDate,
        price: price === 0 ? "Free" : price,
        title: bookingTitle,
        notes,
        link: `${process.env.NEXTAUTH_URL}/booking/${newBooking.slug}`,
      };
      const template = bookingEmail(bookingDetails);
      const body = bookingWhatsappMessage(bookingDetails);
      const user = {
        email: ownersEmail,
      };

      await sendEmail(
        user as IUser,
        template,
        "A new booking has been created"
      );
      let ownerSms;
      if (ownersPhoneNumber)
        ownerSms = await sendWhatsappMessage(body, ownersPhoneNumber);

      user.email = customerEmail;
      bookingDetails.receiver = customerName;

      const customerTemplate = bookingEmail(bookingDetails);
      const customerMessageTemplate = bookingWhatsappMessage(bookingDetails);

      await sendEmail(
        user as IUser,
        customerTemplate,
        "Congratulations!, your booking has been created"
      );
      const customerSms = await sendWhatsappMessage(
        customerMessageTemplate,
        newBooking.customerPhoneNumber
      );
      if (
        customerSms.status === "queued" &&
        ownersPhoneNumber &&
        ownerSms.status === "queued"
      ) {
        await BookingModel.findByIdAndUpdate(newBooking._id, {
          customerSmsId: customerSms.sid,
          ownerSmsId: ownerSms.sid,
        });
      } else if (customerSms.status === "queued" && !ownersPhoneNumber) {
        await BookingModel.findByIdAndUpdate(newBooking._id, {
          customerSmsId: customerSms.sid,
        });
      }

      if (!customerSms || customerSms.status === "failed") {
        throw new Error(
          "Booking has been created successfully but whatsapp message was not sent pls report this booking to hedristemitope2001@gmail.com so that we can follow up and give u message in subsequent booking"
        );
      }
      revalidatePath("/dashboard/booking");
      revalidatePath("/dashboard/contact");
      return {
        success: true,
        message: "Booking has been created successfully",
        data: newBooking,
      };
    } else
      throw new Error(
        "Something went wrong, if you have paid contact hedristemitope2001@gmail.com"
      );
  } catch (error) {
    const err = error as ErrorResponse;
    return {
      success: false,
      message: err.message || "Something went wrong",
    };
  }
};

export const getUserBookings = async function () {
  try {
    await dbConnect();
    const session = await auth();
    const bookings = await BookingModel.find({
      ownersEmail: session?.user?.email,
    });

    return bookings;
  } catch (error) {
    const err = error as ErrorResponse;

    throw new Error(err.message || "Something went wrong");
  }
};

export const getUserBookingStats = async function () {
  try {
    await dbConnect();
    const session = await auth();
    const ownerEmail = session?.user?.email;

    if (!ownerEmail) {
      throw new Error("Owner email is missing.");
    }

    const bookings = await BookingModel.aggregate([
      {
        $match: { ownersEmail: ownerEmail },
      },
      {
        $group: {
          _id: "$customerEmail",
          numberOfBookings: { $sum: 1 },
          latestBooking: { $last: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          customerEmail: "$_id",
          numberOfBookings: 1,
          latestBooking: 1,
        },
      },
    ]);

    return bookings;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

// export default async function initializePayment() {
//   try {
//     const transactionDetails = {
//       email: "customer@email.com",
//       amount: 10000,
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Customer's name",
//             variable_name: "customer_name",
//             value: "John Doe",
//           },
//         ],
//       },
//     };

//     const response = await fetch(
//       "https://api.paystack.co/transaction/initialize",

//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use your secret key
//           "Content-Type": "application/json",
//         },
//         cache: "no-cache",
//         body: JSON.stringify(transactionDetails),
//       }
//     );
//     const data = (await response.json()) as IPaystackInitialize;

//     console.log(data);

//     return data;
//   } catch (error) {
//     const err = error as ErrorResponse;
//     console.error("Payment initialization error:", error);
//     return {
//       status: false,
//       message: err.message || "Payment initialization error",
//     };
//   }
// }

//   else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export const verifyPayment = async function (reference) {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference.reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    const err = error as ErrorResponse;

    throw new Error(
      err.message ||
        "Something went wrong, pls contact our support if you have made the payment"
    );
  }
};

export const getBookings = async function () {
  try {
    await dbConnect();
    const bookings = await BookingModel.find();

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "Something went wrong");
  }
};

export const getBooking = async function (slug) {
  try {
    await dbConnect();
    const bookings = await BookingModel.findOne({ slug }).populate(
      "bookingType"
    );

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "Something went wrong");
  }
};

export const updateCustomerBalance = async function (
  email: string,
  amount: number,
  type: "deposit" | "withdraw",
  withdrawData?: {
    userId: string;
    accountName: string;
    accountNumber: number;
    bankName: string;
    gatewayFee: number;
    amountReceived: number;
  }
) {
  if (type !== "deposit" && type !== "withdraw") {
    throw new Error("Invalid transaction type");
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email })
      .select("userBalance")
      .lean();

    if (!user) {
      throw new Error("User could not be found");
    }

    let newBalance;
    if (type === "deposit") {
      newBalance = (user.userBalance || 0) + amount;
    }
    if (type === "withdraw") {
      if (amount <= (user.userBalance || 0)) {
        newBalance = (user.userBalance || 0) - amount;
        const newWithdrawal = await WithdrawalModel.create({
          amountDebited: amount,
          userId: withdrawData?.userId,
          userEmail: email,
          status: "success",
          accountNumber: withdrawData?.accountNumber,
          bankName: withdrawData?.bankName,
          accountName: withdrawData?.accountName,
          gatewayFee: withdrawData?.gatewayFee,
          amountReceived: withdrawData?.amountReceived,
          usersBalanceAtThatTime: newBalance,
        });
        if (!newWithdrawal) {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("Insufficient funds");
      }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { userBalance: newBalance } },
      { new: true }
    ).lean();

    if (!updatedUser) {
      throw new Error("User could not be updated");
    }

    revalidatePath("/dashboard/wallet");

    // Convert MongoDB _id to id for consistency
    const userData = {
      ...updatedUser,
      id: updatedUser._id.toString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (userData as Record<string, unknown> & { _id?: unknown })._id;

    return [userData]; // Return array to match Supabase format
  } catch (error: unknown) {
    const err = error as { message?: string };
    throw new Error(err.message || "Something went wrong");
  }
};

export const withdrawFunds = async function (withdrawData, formData) {
  const accountName = formData.get("accountName");
  const accountNumber = Number(formData.get("accountNumber"));
  const bankName = formData.get("bankName");
  const bankCode = formData.get("bankCode");
  const gatewayFee = Number(formData.get("gatewayFee"));
  const amountReceived = Number(formData.get("amountReceived"));
  const withdrawDetails = {
    userId: withdrawData.userId,
    accountName,
    accountNumber,
    amountReceived,
    gatewayFee,
    bankName,
    recepientCode: undefined,
    status: "",
    transferCode: undefined,
    reference: undefined,
  };
  const amountDebited = amountReceived + gatewayFee;
  //   userId: string;
  // accountName: string;
  // accountNumber: number;
  // bankName: string;
  // gatewayFee: number;
  // amountReceived: number;
  try {
    const recepientCode = await createTransferRecipient(
      accountNumber,
      bankCode,
      accountName
    );
    if (!recepientCode) throw new Error("Error occured");
    withdrawDetails.recepientCode = recepientCode;
    // withdrawDetails.status = "pending";
    // const transferResponse = await initiateTransfer(
    //   amountReceived,
    //   recepientCode
    // );
    // withdrawDetails.reference = transferResponse.reference;
    // withdrawDetails.transferCode = transferResponse.transfer_code;
    withdrawDetails.status = "success";
    const data = await updateCustomerBalance(
      withdrawData.email,
      amountDebited,
      "withdraw",
      withdrawDetails
    );
    if (!data) {
      throw new Error("Something went wrong");
    }
    return {
      success: true,
      message: "Check your aza for audio money",
    };
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.message || "Something went wrong");
  }
};

const createTransferRecipient = async (
  account_number: number,
  bank_code: string,
  name: string
) => {
  try {
    const response = await fetch("https://api.paystack.co/transferrecipient", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "nuban",
        name,
        account_number: String(account_number),
        bank_code,
        currency: "NGN",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data.recipient_code;
    } else {
      const error = await response.json();
      throw new Error(error.message || "Failed to create transfer recipient");
    }
  } catch (error) {
    console.log(error);
  }
};

// Initiate the transfer
// const initiateTransfer = async (amount: number, recipient_code: string) => {
//   console.log("first", amount, recipient_code);
//   const response = await fetch("https://api.paystack.co/transfer", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       source: "balance",
//       amount: amount * 100,
//       recipient: recipient_code,
//       reason: "Withdrawal from account",
//     }),
//   });

//   if (!response.ok) {
//     const err = await response.json();
//     console.log(err);
//     throw new Error(err.message || "Transfer failed");
//   }

//   return await response.json();
// };
