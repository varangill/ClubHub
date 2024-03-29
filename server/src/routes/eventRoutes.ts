/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcement Management
 * /announcements/{id}:
 *   get:
 *     summary: Gets announcement based on id
 *     description: Returns announcement based on id
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       '200':
 *         description: Successful response
 *   delete:
 *     summary: Deletes announcement based on ID
 *     description: Delete announcement based on ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       '201':
 *         description: Announcement Deleted
 * /announcements/club/{id}:
 *   get:
 *     summary: Gets announcements based on ClubId
 *     description: Returns announcement based on ClubId
 *     tags: [Announcements]
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
 * /announcements/create-announcement:
 *   post:
 *     summary: Create a new announcement
 *     description: Create a new announcement with the provided data
 *     tags: [Announcements]
 *     requestBody:
 *       description: Announcement data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubId:
 *                 type: string
 *                 format: id
 *                 description: Club Id
 *               userId:
 *                 type: string
 *                 format: id
 *                 description: ID of user creating announcement
 *               announcementTitle:
 *                 type: string
 *                 format: string
 *                 description: Announcement Title
 *               announcementText:
 *                 type: string
 *                 format: string
 *                 description: Announcement Description
 *             required:
 *               - clubId
 *               - userId
 *               - announcementTitle
 *               - announcementText
 *     responses:
 *       '201':
 *         description: Announcement created successfully
 */

import { Router } from "express";
import eventController from "../controllers/eventController";
const router = Router();

router.get("/event/:event-id", eventController.getEventInfo);
router.get("/club/events/:id", eventController.getClubEvents);
router.post("/create-event/:event-id", eventController.createEvent);
router.delete("/:id", eventController.deleteExistingEvent);

export default router;
