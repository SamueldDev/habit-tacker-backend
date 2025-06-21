


import express from "express"

import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()



// parse json bodies
app.use(express.json())

app.use(cors())

//Route
app.get("/", (req, res) => {
    res.send("habit_tracker is live")
})


const start = async () => {
    try{

      await sequelize.authenticate()
      console.log('DB connnected')

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

