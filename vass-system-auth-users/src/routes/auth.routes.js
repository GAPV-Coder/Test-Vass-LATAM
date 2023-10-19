import express from 'express';

import {registerUser, loginUser} from '../controllers/auth.controller.js';
import { validateLoginUser, validateRegisterUser } from '../middlewares/validated.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Routes for user registration and authentication.
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               occupation:
 *                 type: string
 *               biography:
 *                 type: string
 *               phone:
 *                 type: string
 *               birthDay:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       400:
 *         description: Request error.
 */
router.post('/register', validateRegisterUser, registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     description: Log in with user credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully authenticated.
 *       401:
 *         description: Incorrect credentials.
 */
router.post('/login', validateLoginUser, loginUser);

export default router;