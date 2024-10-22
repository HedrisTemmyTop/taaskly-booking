import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER_DEFAULT;

const client = twilio(accountSid, authToken);
const imageUrl = "https://devhedris-taaskly-booking.vercel.app/og2.png";

const sendWhatsappMessage = async function (body, to) {
  console.log("new message to", to);
  const response = await client.messages.create({
    body: body,
    to: `whatsapp:+2348161126466`,
    from: `whatsapp:${twilioNumber}`,
    mediaUrl: [imageUrl],
  });

  return response;
};

export default sendWhatsappMessage;
