
import HabitCompletion from "../models/habitCompletionModel.js";
import  Habit  from "../models/habitModel.js";


export const completeHabitToday = async (req, res) => {
  const userId = req.user.id;
  const habitId = req.params.id;
  const today = new Date().toISOString().split("T")[0]; //  "2025-06-21"

  try {
    //  Find the habit
    const habit = await Habit.findOne({ where: { id: habitId, userId } });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Check if already completed today
    const alreadyCompleted = await HabitCompletion.findOne({
      where: {
        habitId,
        date: today,
      },
    });

    if (alreadyCompleted) {
      return res.status(400).json({ message: "Habit already marked as done today" });
    }

    //  Create completion record
    await HabitCompletion.create({
      habitId,
      date: today,
      isCompleted: true,
    });

    //  Update streak if lastCompletedAt is yesterday
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    let newStreak = 1;
    if (habit.lastCompletedAt === yesterday) {
      newStreak = habit.streak + 1;
    }

    await habit.update({
      lastCompletedAt: today,
      streak: newStreak,
    });

    res.status(200).json({
      message: "Habit marked as completed for today",
      streak: newStreak,
    });
  } catch (error) {
    console.error("Complete Habit Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
