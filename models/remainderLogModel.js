

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// import Habit from "./Habit.js";

const ReminderLog = sequelize.define("ReminderLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  habitId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "email", // could be "email", "sms", "push", etc.
  },
}, {
  timestamps: false, // You already have sentAt, no need for createdAt/updatedAt
  tableName: "reminder_logs",
});

// // 🧩 Associations
// ReminderLog.belongsTo(Habit, { foreignKey: "habitId", onDelete: "CASCADE" });
// Habit.hasMany(ReminderLog, { foreignKey: "habitId" });

export default ReminderLog;
