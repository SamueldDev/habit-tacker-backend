

import sequelize from "../config/db.js";
import ReminderLog from "./remainderLogModel.js";
import Habit from "./habitModel.js";
import HabitCompletion from "./habitCompletionModel.js";
import User from "./userModel.js";

//  Associations
ReminderLog.belongsTo(Habit, { foreignKey: "habitId", onDelete: "CASCADE" });
Habit.hasMany(ReminderLog, { foreignKey: "habitId" });

HabitCompletion.belongsTo(Habit, { foreignKey: "habitId", onDelete: "CASCADE" });
Habit.hasMany(HabitCompletion, { foreignKey: "habitId" });

Habit.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Habit, { foreignKey: "userId" });

export{
    sequelize,
    ReminderLog,
    Habit,
    User

}

