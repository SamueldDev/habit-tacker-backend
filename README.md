
# 🧠 Habit Tracker API

A simple and efficient REST API for tracking daily habits, built with **Node.js**, **Express**, **MySQL**, and **SendGrid** for email reminders.

## 🚀 Features

- ✅ User Registration & Login (JWT Authentication)
- ✅ Create & Manage Daily Habits
- ✅ Mark Habits as Completed
- ✅ Track Habit Completion History
- ✅ Streaks & Daily Resets (via cron job)
- ✅ Email Reminders using SendGrid

---

## 🚀 Live Demo & API Docs

- 📡 **Base URL**: [`https://habit-tacker-backend-production.up.railway.app/`](https://habit-tacker-backend-production.up.railway.app/)
  
- 📘 **Swagger Docs**: [`/api-docs`](https://habit-tacker-backend-production.up.railway.app/api-docs)
  
- 📬 **Postman Collection**: [View on GitHub](https://github.com/SamueldDev/habit-tacker-backend.git/blob/main/Habit_tracker_API.postman_collection.json)

## 📦 Technologies Used

- Node.js + Express
- Sequelize ORM + MySQL
- JWT for Authentication
- SendGrid (Email)
- dotenv for environment config

---

## ⚙️ Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/SamueldDev/habit-tacker-backend.git
   cd habit-tracker

---

Install dependencies:

npm install

Configure environment:
Create a .env file in the root and add:

PORT=5000

DB_NAME=your_db_name

DB_USER=your_mysql_user

DB_PASSWORD=your_mysql_password

JWT_SECRET=your_secret_key

SENDGRID_API_KEY=your_sendgrid_key

VERIFIED_SENDER_EMAIL=your_verified_sender_email

npm run dev

Start the server:

npm run dev

📁 Project Structure

habit-tracker/

├── controllers/

├── models/

├── routes/

├── utils/

├── middleware/

├── jobs/ # Cron jobs for daily resets/reminders

├── config/ # DB and env setup

└── server.js

---

📬 API Endpoints

| Method | Route         | Description             |
| ------ | ------------- | ----------------------- |
| POST   | /api/register | Register new user       |
| POST   | /api/login    | Login and get JWT token |

| Method | Route                     | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | /api/habits               | Create a new habit          |
| GET    | /api/habits               | Get all user’s habits       |
| POST   | /api/habits/\:id/complete | Mark a habit done for today |
| GET    | /api/habits/\:id/history  | Get completion history      |

| Method | Route          | Description              |
| ------ | -------------- | ------------------------ |
| GET    | /api/testemail | Send test reminder email |

🕑 Daily Cron Jobs

Habit streaks are reset every 24 hours

Reminders sent via SendGrid to users with uncompleted habits

Setup using node-cron in /jobs/ directory

🧪 Testing

Use Postman to test all routes. Pass your JWT token in the headers:

🧪 API Docs & Tools

📘 Swagger API Documentation

👉 View Swagger Docs

📬 Postman Collection

👉 Open in Postman

Use Postman to test all routes. Pass your JWT token in the headers:

Authorization: Bearer <your_token>

🧑‍💻 Author

Samuel Friday

Backend Developer

Feel free to connect!

✅ License

This project is open-source and free to use.

---
