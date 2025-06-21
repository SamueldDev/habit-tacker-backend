

import express from "express"

import { register, login } from "../controllers/userController.js"
import { protectedAction } from "../middleware/authenticateMiddleware.js"

const router = express.Router()


router.post("/register",  register)
router.post("/login", login)


export default router