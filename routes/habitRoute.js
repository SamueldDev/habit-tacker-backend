


// routes/habitRoutes.js
import express from 'express';
import { completeHabitToday } from '../controllers/habitCompletionController.js';

import { createHabit, getAllHabits, getHabitHistory } from '../controllers/habitController.js';
import { protectedAction } from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.post('/habits', protectedAction, createHabit);
router.get("/habits", protectedAction, getAllHabits);

router.post("/habits/:id/complete", protectedAction, completeHabitToday);
router.get("/habits/:id/history", protectedAction, getHabitHistory);

export default router;