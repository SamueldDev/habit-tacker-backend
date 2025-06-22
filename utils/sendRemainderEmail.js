
import dotenv from "dotenv"
dotenv.config()

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendReminderEmail = async (to, habitName) => {
  const msg = {
    to,
    from: process.env.VERIFIED_SENDER_EMAIL,
    subject: "⏰ Habit Reminder",
    text: `Don't forget to complete your habit: ${habitName}`,
    html: `<strong>Don't forget to complete your habit: ${habitName}</strong>`,
  };

  await sgMail.send(msg);
};

export default sendReminderEmail;
































// testsing sendgrid via route
// import dotenv from "dotenv"
// dotenv.config()

// import sgMail from "@sendgrid/mail";
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendReminderEmail = async (to) => {
//   const msg = {
//     to: to,
//     from: process.env.VERIFIED_SENDER_EMAIL,
//     subject: "⏰ Habit Reminder",
//     text: "Don't forget to complete your habit",
//     html: "<strong>Don't forget to complete your habit</strong>",
//   };

//    // ✅ Debug logs
//   console.log("Sending to:", to);
//   console.log("From:", process.env.VERIFIED_SENDER_EMAIL);
//   console.log("API Key Present:", !!process.env.SENDGRID_API_KEY);


//   await sgMail.send(msg);
// };

// export default sendReminderEmail;






