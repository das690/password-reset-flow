const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Explicitly define the host and port for cloud deployment
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4,
  });

  // 2. Define the email options (Using your actual email for the 'from' field)
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;