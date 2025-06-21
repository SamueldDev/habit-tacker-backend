

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


// import User from "./userModel.js";

const Habit = sequelize.define("Habit", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.JSON, // Can be ["Mon", "Wed"] or "daily"
    allowNull: false,
  },
  reminderTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastCompletedAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: "habits",
});

// // 🧩 Association (many habits per user)
// Habit.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
// User.hasMany(Habit, { foreignKey: "userId" });


export default Habit;
