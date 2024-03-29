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
 * /clubs/owner/{id}:
 *   get:
 *     summary: Get club owner by ID
 *     description: Retrieve the club's owner user col
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
 *                 format: string
 *                 description: Club's description
 *               joinStatus:
 *                 type: string {"open", "application", "closed"}
 *                 format: string
 *                 description: Club's join status
 *               userId:
 *                 type: string
 *                 format: id
 *                 description: ID of user creating club
 *             required:
 *               - clubName
 *               - desc
 *               - joinStatus
 *       '201':
 *         description: Club created successfully
 * /clubs/kick-user:
 *   delete:
 *     summary: Kick user from a club
 *     description: Delete a membership for a user given a club
 *     tags: [Clubs]
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
 *         description: User kicked from club
 * /clubs/promote-member:
 *   post:
 *     summary: Promote a member to executive
 *     description: Update the membershipType of a user in a club to executive
 *     tags: [Clubs]
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
 *         description: User updated to executive
 * /clubs/demote-member:
 *   post:
 *     summary: Demote a member to normal member
 *     description: Update the membershipType of a user in a club to member
 *     tags: [Clubs]
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
 *         description: User updated to member
 * /clubs/transfer-ownership:
 *   post:
 *     summary: Gives ownership to a different user
 *     description: Update the membershipType of new owner to 'owner', old owner to 'executive'
 *     tags: [Clubs]
 *     requestBody:
 *       description: Old Owner ID, New Owner ID, Club ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newOwnerId:
 *                 type: ID
 *                 format: ID
 *                 description: New Owner's ID
 *               oldOwnerId:
 *                 type: ID
 *                 format: ID
 *                 description: Old Owner's ID
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *             required:
 *               - userId
 *               - clubId
 *     responses:
 *       '201':
 *         description: Ownership transferred
 * /clubs/change-status:
 *   post:
 *     summary: Change join status of a club
 *     description: Update the joinStatus of a club
 *     tags: [Clubs]
 *     requestBody:
 *       description: New (join) status, club ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string {"open", "application", "closed"}
 *                 format: string
 *                 description: New join status
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *             required:
 *               - newStatus
 *               - clubId
 *     responses:
 *       '201':
 *         description: Club status updated
 * /clubs/ban-user:
 *   post:
 *     summary: Bans a user
 *     description: Creates ban for a user and deletes existing membership
 *     tags: [Clubs]
 *     requestBody:
 *       description: User ID, club ID, banner's user ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: ID
 *                 format: ID
 *                 description: ID of person banned
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *               bannerId:
 *                 type: ID
 *                 format: ID
 *                 description: ID of person banning userId
 *             required:
 *               - userId
 *               - clubId
 *               - bannerId
 *     responses:
 *       '201':
 *         description: User banned
 * /clubs/unban-user:
 *   delete:
 *     summary: Unbans a user
 *     description: Deletes existing ban for a user
 *     tags: [Clubs]
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
 *                 description: ID of person being unbanned
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *             required:
 *               - userId
 *               - clubId
 *     responses:
 *       '201':
 *         description: User unbanned
 * /clubs/update-club:
 *   post:
 *     summary: Updates a club
 *     description: Updates a club for a given ID
 *     tags: [Clubs]
 *     requestBody:
 *       description: Club ID, Club name, club description, club join status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubId:
 *                 type: ID
 *                 format: ID
 *                 description: Club's ID
 *               name:
 *                 type: String
 *                 format: String
 *                 description: Club's new name
 *               desc:
 *                 type: String
 *                 format: String
 *                 description: Club's description
 *               status:
 *                 type: String
 *                 format: One of {'open', 'closed', 'application'}
 *                 description: Club's new status
 *             required:
 *               - clubId
 *               - name
 *               - desc
 *               - status
 *     responses:
 *       '201':
 *         description: User unbanned
 */

import { Router } from "express";
import clubController from "../controllers/clubController";
const router = Router();

router.get("/", clubController.getClubs);
router.get("/:id", clubController.getClubInfo);
router.get("/memberships/:id", clubController.getClubMemberships);
router.get("/owner/:id", clubController.getClubOwner);
router.post("/create-club", clubController.createClub);
router.post("/update-club", clubController.updateClub);
router.delete("/kick-user", clubController.kickMember);
router.post("/promote-member", clubController.promoteMember);
router.post("/demote-member", clubController.demoteMember);
router.post("/transfer-ownership", clubController.transferOwner);
router.post("/ban-user", clubController.banMember);
router.delete("/unban-user", clubController.unbanMember);
router.delete("/delete-club", clubController.deleteExistingClub);
router.get("/banned-members/:id", clubController.getBannedMembers);
export default router;
  