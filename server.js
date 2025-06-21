

import express from "express"

import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();


import userRoute from "./routes/userRoute.js"
import habitRoute from "./routes/habitRoute.js"

const PORT = process.env.PORT || 5000;

const app = express()



// parse json bodies
app.use(express.json())

app.use(cors())

//Route
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

      //  await sequelize.sync({ force: true})
      // console.log("tabeles dropped and recreated ")

      app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
      })

    }catch(err){  
        console.error("Unable to connect to database:", err)
    }
}


start()

 // nodemon server.js

