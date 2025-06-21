
import Habit from "../models/habitModel.js";
import HabitCompletion from "../models/habitCompletionModel.js";

export const createHabit = async (req, res) => {
  try {
    const { name, frequency, reminderTime } = req.body;
    const userId = req.user.id;

    if (!name || !frequency) {
      return res.status(400).json({ message: 'Name and frequency are required.' });
    }

    const habit = await Habit.create({
      userId,
      name,
      frequency,
      reminderTime: reminderTime || null,
      streak: 0,
      lastCompletedAt: null,
    });

    res.status(201).json({
      message: 'Habit created successfully',
      habit,
    });
  } catch (error) {
    console.error('Create Habit Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};







export const getAllHabits = async (req, res) => {
  try {
    const userId = req.user.id;

    const habits = await Habit.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ habits });
  } catch (error) {
    console.error("Get All Habits Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};










export const getHabitHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const habitId = req.params.id;

    // Confirm the habit belongs to the user
    const habit = await Habit.findOne({ where: { id: habitId, userId } });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const completions = await HabitCompletion.findAll({
      where: { habitId },
      attributes: ["date"],
      order: [["date", "DESC"]],
    });

    const dates = completions.map((entry) => entry.date);

    res.status(200).json({ habitId, history: dates });
  } catch (error) {
    console.error("Get Habit History Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
