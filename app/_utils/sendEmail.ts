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

const sendEmail = async (
  user: IUser,

  template: string,
  subject: string
) => {
  const mailOptions = {
    from: `HedrisTemmyTop <${process.env.EMAIL}>`,
    to: user.email,
    subject: subject,
    html: template,
  };

  await newTransport().sendMail(mailOptions);
};

export const sendWelcome = async function (user: IUser) {
  await sendEmail(
    user,

    welcome,
    "Welcome to Taaskly Bookings DevHedris Version"
  );
};

export default sendEmail;
