/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Club messages
 * /messages/club/{id}:
 *   get:
 *     summary: Gets all messages from a club
 *     description: Returns all clubs
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *     responses:
 *       '200':
 *         description: Messages returned
 * /messages/send:
 *   post:
 *     summary: Sends a message to a club
 *     description: Creates a message for a club's chatroom
 *     tags: [Messages]
 *     properties:
 *       clubId:
 *         type: ID
 *         format: ID
 *         description: Club's ID
 *       userId:
 *         type: ID
 *         format: ID
 *         description: User's ID
 *       text:
 *         type: String
 *         format: String
 *         description: Message's text content
 *       username:
 *         type: String
 *         format: String
 *         description: Name of user sending the message
 *     responses:
 *       '200':
 *         description: Message created
 * /messages/{id}:
 *   post:
 *     summary: Edits an existing message
 *     description: Updates a message at given ID
 *     tags: [Messages]
 *     properties:
 *       messageId:
 *         type: ID
 *         format: ID
 *         description: Message's ID
 *       newText:
 *         type: String
 *         format: String
 *         description: Message's new text content
 *     responses:
 *       '200':
 *         description: Message updated
 *   delete:
 *     summary: Deletes a message
 *     description: Deletes a message at given ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message's ID
 *     responses:
 *       '200':
 *         description: Message updated
 */

import { Router } from "express";
import messageController from "../controllers/messageController";
const router = Router();

router.get("/club/:id", messageController.getClubMessages);
router.post("/send", messageController.sendMessage);
router.post("/:id", messageController.editMessage);
router.delete("/:id", messageController.removeMessage);

export default router;
