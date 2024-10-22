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
import { addDuration } from "../_utils/generateTime";
import sendWhatsappMessage from "../_utils/sendWhatsappMessage";
import { dbConnect } from "./mongodb";

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
    });

    console.log(newBooking);
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
    console.log("error", err.message);
    return {
      success: false,
      message: err.message || "Something went wrong",
    };
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
