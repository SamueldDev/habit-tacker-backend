

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
  timestamps: false, //
  tableName: "reminder_logs",
});

export default ReminderLog;
