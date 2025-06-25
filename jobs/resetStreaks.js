
import dotenv from "dotenv"
import  Habit  from "../models/habitModel.js";


import { Op } from "sequelize";
dotenv.config();

// reset streak
export const resetStreaks = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const habitsToReset = await Habit.findAll({
      where: {
        [Op.or]: [
          { lastCompletedAt: { [Op.ne]: today } },
          { lastCompletedAt: null },
        ],
      },
    });

    console.log(`Found ${habitsToReset.length} habits to reset`);
    for (const habit of habitsToReset) {
      console.log(`Resetting ${habit.name} | Last Completed: ${habit.lastCompletedAt}`);
      habit.streak = 0;
      lastCompletedAt = today 
      await habit.save();
    }

    console.log(`✅ Reset streaks for ${habitsToReset.length} habits.`);
  } catch (error) {
    console.error("Reset Streak Error:", error);
  }
};

export default resetStreaks;
