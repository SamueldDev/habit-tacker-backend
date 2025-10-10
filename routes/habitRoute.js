

import express from 'express';
import { completeHabitToday } from '../controllers/habitCompletionController.js';
import { createHabit, getAllHabits, getHabitHistory } from '../controllers/habitController.js';
import { protectedAction } from '../middleware/authenticateMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /api/habits:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - frequency
 *             properties:
 *               name:
 *                 type: string
 *                 example: Read 10 pages
 *               frequency:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mon", "Tue", "Wed"]
 *               reminderTime:
 *                 type: string
 *                 format: time
 *                 example: "07:30:00"
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Name and frequency are required
 *       500:
 *         description: Server error
 */

router.post('/habits', protectedAction, createHabit);


/**
 * @swagger
 * /api/habits:
 *   get:
 *     summary: Get all habits for the logged-in user
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user habits
 *       500:
 *         description: Server error
 */

router.get("/habits", protectedAction, getAllHabits);


/**
 * @swagger
 * /api/habits/{id}/complete:
 *   post:
 *     summary: Mark a habit as completed for today
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the habit to complete
 *     responses:
 *       200:
 *         description: Habit marked as completed
 *       400:
 *         description: Already marked as done today
 *       404:
 *         description: Habit not found
 *       500:
 *         description: Server error
 */

router.post("/habits/:id/complete", protectedAction, completeHabitToday);


/**
 * @swagger
 * /api/habits/{id}/history:
 *   get:
 *     summary: Get history of completed dates for a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Habit ID
 *     responses:
 *       200:
 *         description: List of completion dates
 *       404:
 *         description: Habit not found
 *       500:
 *         description: Server error
 */

router.get("/habits/:id/history", protectedAction, getHabitHistory);

export default router;