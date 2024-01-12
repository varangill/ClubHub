/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /users/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data
 *     tags: [Users]
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully
 * /users/getUser/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successful response
 * /users/clubs/{id}:
 *   get:
 *     summary: Get every club a user is in by user ID
 *     description: Retrieve a user's joined clubs
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successful response
 * /users/login:
 *   post:
 *     summary: Try to login a user
 *     description: Check if a user has valid password for login
 *     tags: [Users]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User logged in
 * /users/join-club:
 *   post:
 *     summary: Make user join a club
 *     description: Create a membership for a user given a club
 *     tags: [Users]
 *     requestBody:
 *       description: User ID, club ID, membership type
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: ID
 *                 format: ID
 *                 description: User's ID
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *               membershipType:
 *                 type: string {'owner', 'executive', 'member'}
 *                 format: string
 *                 description: Membership type
 *             required:
 *               - userId
 *               - clubId
 *               - membershipType
 *     responses:
 *       '201':
 *         description: User joined club
 */

import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.get("/getUser/:id", userController.getUserInfo);
router.get("/clubs/:id", userController.getUserClubs);
router.post("/create-user", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/membership", userController.getClubMembership);
router.post("/join-club", userController.userJoinClub);

export default router;
