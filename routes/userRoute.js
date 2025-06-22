

import express from "express"

import { register, login } from "../controllers/userController.js"

import authLimiter from "../middleware/rateLimitingMiddleware.js"
import { registerValidator, loginValidator, validationResultMiddleware } from "../middleware/validationMiddleware.js"

const router = express.Router()



/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Email already in use
 *       429:
 *         description: Too many requests - rate limit hit
 *       500:
 *         description: Registration failed
 */

router.post("/register", registerValidator, validationResultMiddleware, authLimiter,  register)




/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: Logs a user in and returns a JWT token.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many requests - rate limit hit
 *       500:
 *         description: Login failed
 */

router.post("/login", loginValidator, validationResultMiddleware, authLimiter, login)


export default router