export const welcome = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Bookings Babami</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #ffffff; /* White background */
            color: #333; /* Black text */
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .welcome-title {
            font-size: 2.5em;
            color: #007BFF; /* Primary blue */
            margin-bottom: 10px;
        }

        .welcome-message {
            font-size: 1.2em;
            color: #555; /* Darker gray */
            line-height: 1.5;
        }

        .funny-message {
            font-size: 1.1em;
            color: #FF5722; /* Accent color */
            margin-top: 20px;
        }

        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #777; /* Lighter gray */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="welcome-title">Welcome to Bookings Babami 🥰</h1>
        <p class="welcome-message">Just dey create booking appointment dey go jarey. Everywhere good eje.</p>
        <p class="funny-message">
            You don enter where booking no be wahala, na only enjoyment we dey find! 🚀<br>
            Just like pepper soup, we go make sure your appointment hot! 🔥<br>
            No stress, no carry last; we go do am sharp sharp! 😄
        </p>
        <p class="footer">Thanks for choosing us. You sabi say, na only God fit stop our bookings! 🙌🏾</p>
    </div>
</body>
</html>
`;

export const verifyYourEmail = function (url: string) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #ffffff; /* White background */
              color: #333; /* Black text */
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff; /* White background */
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 20px 0;
          }
          .header h1 {
              color: #4CAF50; /* Green color */
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #007BFF; /* Primary button color */
              color: white;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #0056b3; /* Darker shade on hover */
          }
          .footer {
              text-align: center;
              font-size: 0.9em;
              color: #777; /* Lighter gray */
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Verify Your Email, Naija Style!</h1>
          </div>
          <p>Hey there, my G! 🌟</p>
          <p>
              You dey close to becoming part of our fam! Just click the button below to verify your email address.
          </p>
          <a href="${url}" class="button">Verify Your Email</a>
          <p>
              If you no fit click the button, just copy and paste this link into your browser: <br>
              <a href="${url}">${url}</a>
          </p>
          <div class="footer">
              <p>Thank you for joining us! We dey appreciate you. ❤️</p>
              <p>If you no sign up for this, make you ignore this email.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};
