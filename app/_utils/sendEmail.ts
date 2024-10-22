import nodemailer from "nodemailer";
import { IUser } from "../_types/user";
import { welcome } from "../_htmlTemplates/template";

// class Email {
//   to: string;
//   firstname: string;
//   url: string;
//   from: string;
//   constructor(user: IUser, url: string) {
//     this.to = user.email;
//     this.firstname = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `HedrisTemmyTop <${process.env.EMAIL}>`;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       host: "",
//       port: "",
//       auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
//     });
//   }

//   async sendEmail(template: string, subject: string) {
//     const mailOptions = {
//       from: `HedrisTemmyTop <${process.env.EMAIL}>`,
//       to: "idristemitope2001@gmail.com",
//       subject: subject,
//       html: template,
//     };

//     await this.newTransport().sendMail(mailOptions);
//   }
//   async sendWelcome() {
//     this.sendEmail(welcome, "Welcome to Taaskly Bookings");
//   }
// }

const newTransport = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendEmail = async (user: IUser, template: string, subject: string) => {
  const mailOptions = {
    from: `HedrisTemmyTop <${process.env.EMAIL}>`,
    to: user.email,
    subject: subject,
    html: template,
  };

  try {
    const response = await newTransport().sendMail(mailOptions);

    // Check if the response indicates success (some email libraries might not have an `ok` property)
    if (response && response.accepted && response.accepted.length > 0) {
      return { success: true, message: "Email sent successfully." };
    } else {
      console.error("Failed to send email:", response);
      return { success: false, message: "Failed to send email." };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
};

export const sendWelcome = async function (user: IUser) {
  const result = await sendEmail(
    user,

    welcome,
    "Welcome to Taaskly Bookings DevHedris Version"
  );
  // if (result.success) {
  //   return {
  //     success: true,
  //   };
  // }
  return result;
};

export default sendEmail;
