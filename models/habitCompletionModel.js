

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const HabitCompletion = sequelize.define("HabitCompletion", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  habitId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  tableName: "habit_completions",
  indexes: [
    {
      unique: true,
      fields: ['habitId', 'date'], // One completion per habit per day
    }
  ]
});

// // 🧩 Associations
// HabitCompletion.belongsTo(Habit, { foreignKey: "habitId", onDelete: "CASCADE" });
// Habit.hasMany(HabitCompletion, { foreignKey: "habitId" });

export default HabitCompletion;
