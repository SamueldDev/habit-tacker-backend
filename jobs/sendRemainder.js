
import User  from "../models/userModel.js";
import HabitCompletion from "../models/habitCompletionModel.js";
import  Habit  from "../models/habitModel.js";

import dotenv from "dotenv"
dotenv.config()


import { Op } from "sequelize";
import sendReminderEmail from "../utils/sendRemainderEmail.js";

dotenv.config();


// send remainder
const sendReminders = async () => {
  const now = new Date();
  const currentTime = now.toTimeString().split(":").slice(0, 2).join(":"); // "HH:MM"

  const today = now.toISOString().split("T")[0];

  try {
    const habits = await Habit.findAll({
      where: {
        reminderTime: { [Op.not]: null },
      },
      include: [{ model: User, attributes: ["email", "name"] }],
    });

    for (const habit of habits) {
      const habitTime = habit.reminderTime.slice(0, 5); // "HH:MM"

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
        }
      }
    }
  } catch (error) {
    console.error("Reminder Send Error:", error);
  }
};



export default sendReminders;


