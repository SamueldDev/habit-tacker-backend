
import User  from "../models/userModel.js";
import HabitCompletion from "../models/habitCompletionModel.js";
import  Habit  from "../models/habitModel.js";
import dotenv from "dotenv"
dotenv.config()
import { Op } from "sequelize";
import sendReminderEmail from "../utils/sendRemainderEmail.js";

// send remainder
const sendReminders = async () => {

  const now = new Date();
  const currentTime = new Date(now.getTime() + 60 * 60 * 1000) // add +1h offset
  .toISOString()
  .substr(11, 5); // "HH:MM"


  const today = now.toISOString().split("T")[0];

  try {
    const habits = await Habit.findAll({
      where: {
        reminderTime: { [Op.not]: null },
      },
      include: [{ model: User, attributes: ["email", "name"] }],
    });

    function sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (const habit of habits) {
      const habitTime = habit.reminderTime.slice(0, 5); // "HH:MM"

       // Debug log to compare times

      //  console.log("Now:", currentTime, "Habit:", habitTime);
      //  console.log(
      //     "Local Now:", currentTime,
      //     "| UTC Now:", new Date().toISOString().substr(11, 5),
      //     "| Habit:", habitTime
      //   );


      if (habitTime === currentTime) {
        const completion = await HabitCompletion.findOne({
          where: {
            habitId: habit.id,
            date: today,
          },
        });

        if (!completion && habit.User?.email) {
          await sendReminderEmail(habit.User.email, habit.name);
          console.log(`📧 Sent reminder for "${habit.name}" to ${habit.User.email}`);

          // Throttle: wait 2 seconds before next email
           await sleep(2000);
        }
      }
    }
  } catch (error) {
    console.error("Reminder Send Error:", error);
  }
};


export default sendReminders;


