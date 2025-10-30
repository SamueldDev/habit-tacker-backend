
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: isProduction ? "postgres" : "mysql",
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});


export default sequelize;