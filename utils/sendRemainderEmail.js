

import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Create transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendReminderEmail = async (to, habitName) => {
  const mailOptions = {
    from: `"Habit Tracker" <${process.env.GMAIL_USER}>`,
    to,
    subject: "⏰ Habit Reminder",
    text: `Don't forget to complete your habit: ${habitName}`,
    html: `<strong>Don't forget to complete your habit: ${habitName}</strong>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendReminderEmail;
