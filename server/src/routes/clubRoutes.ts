/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Club management
 * /clubs:
 *   get:
 *     summary: Gets all clubs
 *     description: Returns all clubs
 *     tags: [Clubs]
 *     responses:
 *       '200':
 *         description: Clubs returned successfully
 * /clubs/{id}:
 *   get:
 *     summary: Get club info by ID
 *     description: Retrieve a club by ID
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *     responses:
 *       '200':
 *         description: Successful response
 * /clubs/memberships/{id}:
 *   get:
 *     summary: Get club memberships by ID
 *     description: Retrieve all of a club's members
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *     responses:
 *       '200':
 *         description: Successful response
 * /clubs/create-club:
 *   post:
 *     summary: Create a new club
 *     description: Create a new club with the provided data
 *     tags: [Clubs]
 *     requestBody:
 *       description: Club data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubName:
 *                 type: string
 *                 description: Club's name
 *               desc:
 *                 type: string
 *                 format: email
 *                 description: Club's description
 *               joinStatus:
 *                 type: string {"open", "application", "closed"}
 *                 format: string
 *                 description: Club's join status
 *             required:
 *               - clubName
 *               - desc
 *               - joinStatus
 *       '201':
 *         description: Club created successfully
 */

import { Router } from "express";
import clubController from "../controllers/clubController";
const router = Router();

router.get("/", clubController.getClubs);
router.get("/:id", clubController.getClubInfo);
router.get("/memberships/:id", clubController.getClubMemberships);
router.post("/create-club", clubController.createClub);

export default router;
