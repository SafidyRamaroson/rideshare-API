require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      timeout:60000
    });

    const mailOption = {
      from: process.env.EMAIL_ID,
      to: option.email,
      subject: option.subject,
      html: option.message,
    };

    const info = await transporter.sendMail(mailOption);
    console.log(`Email sent successfully: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


const mailTemplate = (content, buttonUrl, buttonText) => {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      text-align: center;
      font-family: 'Verdana', serif;
      color: #000;
    }
    .email-container {
      max-width: 400px;
      margin: 10px;
      background-color: #fafafa;
      padding: 25px;
      border-radius: 20px;
    }
    .email-content {
      text-align: left;
    }
    .email-button {
      background-color: #444394;
      border: 0;
      width: 200px;
      height: 30px;
      border-radius: 6px;
      color: #fff;
      text-align: center;
    }
    .fallback-link {
      margin: 0px;
      text-align: left;
      font-size: 10px;
      text-decoration: none;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <p class="email-content">
      ${content}
    </p>
    ${buttonUrl ? `<a href="${buttonUrl}" target="_blank">
      <button class="email-button">
        ${buttonText}
      </button>
    </a>` : ''}
    <p class="email-content">
      If you are unable to click the above button, copy paste the below URL into your address bar
    </p>
    <a href="${buttonUrl}" target="_blank">
      <p class="fallback-link">
        ${buttonUrl}
      </p>
    </a>
  </div>
</body>
</html>`;
};

module.exports = { sendEmail, mailTemplate };
