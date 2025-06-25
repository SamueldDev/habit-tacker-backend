
import express from "express"

import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
import cors from "cors"
import cron from "node-cron"
import sendReminders from "./jobs/sendRemainder.js";
import { setupSwagger } from "./config/swagger.js";

import { resetStreaks } from "./jobs/resetStreaks.js";
dotenv.config();

import userRoute from "./routes/userRoute.js"
import habitRoute from "./routes/habitRoute.js"


const PORT = process.env.PORT || 5000;

const app = express()

setupSwagger(app)

// parse json bodies
app.use(express.json())

app.use(cors())

//Routes
app.get("/", (req, res) => {
    res.send("habit_tracker is live")
})

app.use("/api/user", userRoute)
app.use("/api", habitRoute)



const start = async () => {
    try{

      await sequelize.authenticate()
      console.log('DB connected')

      await sequelize.sync({ alter: true})
      console.log("database synced ")


      app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
      })
      
      cron.schedule("59 23 * * *", async () => {
          console.log("⏱ Running daily streak reset...");
          await resetStreaks();
      });
  
      cron.schedule("* * * * *", async () => {
        console.log("📧 Running daily reminder emails...");
        await sendReminders();
      });

    }catch(err){  
        console.error("Unable to connect to database:", err)
    }
}


start()














  //  cron.schedule("* * * * *", async () => {
  //   console.log("⏱ Running streak reset every minute (DEV MODE)");
  //   await resetStreaks();
  // });


  // cron.schedule("0 20 * * *", async () => {
  //   console.log("📧 Running daily reminder emails...");
  //   await sendReminders();
  // });


 // nodemon server.js

