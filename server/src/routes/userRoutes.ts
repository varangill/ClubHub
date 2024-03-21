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
 *             required:
 *               - userId
 *               - clubId
 *     responses:
 *       '201':
 *         description: User joined club
 * /users/leave-club:
 *   delete:
 *     summary: Make user leave a club
 *     description: Delete a membership for a user given a club
 *     tags: [Users]
 *     requestBody:
 *       description: User ID, club ID
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
 *             required:
 *               - userId
 *               - clubId
 *     responses:
 *       '201':
 *         description: User left club
 * /users/membership?userId={userId}&clubId={clubId}:
 *   get:
 *     summary: Get a user's membership data given user ID and club ID
 *     description: Retrieve a user's joined clubs
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *     responses:
 *       '200':
 *         description: Successful response
 */

import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.delete("/:id", userController.deleteUserAccount);
router.get("/", userController.getAllUsers);
router.get("/getUser/:id", userController.getUserInfo);
router.get("/clubs/:id", userController.getUserClubs);
router.post("/create-user", userController.createUser);
router.post("/register-user", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/membership", userController.getClubMembership);
router.post("/join-club", userController.userJoinClub);
router.delete("/leave-club", userController.userLeaveClub);

export default router;
