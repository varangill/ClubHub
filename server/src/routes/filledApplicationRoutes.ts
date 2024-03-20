/**
 * @swagger
 * tags:
 *   name: Filled-Applications
 *   description: Filled Applications Management
 * /filled-applications:
 *   get:
 *     summary: Gets all filled applications
 *     description: Returns filled applications
 *     tags: [Filled-Applications]
 *     responses:
 *       '200':
 *         description: Successful response
 * 
 * /filled-applications/{id}:
 *   get:
 *     summary: Gets filled application based on id
 *     description: Returns filled application based on id
 *     tags: [Filled-Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Filled Application ID
 *     responses:
 *       '200':
 *         description: Successful response
 *           
 *   delete:
 *     summary: Deletes filled application based on ID
 *     description: Delete filled application based on ID
 *     tags: [Filled-Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Filled Application ID
 *     responses:
 *       '204':
 *         description: Filled Application Deleted
 * /applications/create-application:
 *   post:
 *     summary: Create a new filled application
 *     description: Create a new filled application with the provided data
 *     tags: [Filled-Applications]
 *     requestBody:
 *       description: Application data
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
 *                 description: ID of user creating application
 *               applicationId:
 *                 type: string
 *                 format: id
 *                 description: Application Id
 *               type:
 *                 type: string
 *                 format: string
 *                 description: Type of application
 *               appText:
 *                 type: string
 *                 format: string
 *                 description: Application Text
 *               name:
 *                 type: string
 *                 format: string
 *                 description: Name of Applicant
 *             required:
 *               - clubId
 *               - userId
 *               - applicationId
 *     responses:
 *       '201':
 *         description: Filled application created successfully
 * /filled-applications/club/{id}:
 *   get:
 *     summary: Gets filled applications based on ClubId
 *     description: Returns filled application based on ClubId
 *     tags: [Filled-Applications]
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
 * /filled-applications/executive/{id}:
 *   get:
 *     summary: Gets filled executive applications based on ClubId
 *     description: Returns filled executive application based on ClubId
 *     tags: [Filled-Applications]
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
 *         
 *   delete:
 *     summary: Deletes filled executive application based on ID
 *     description: Delete filled executive application based on ID
 *     tags: [Filled-Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Filled Application ID
 *     responses:
 *       '204':
 *         description: Filled Application Deleted
 * /filled-applications/member/{id}:
 *   get:
 *     summary: Gets filled member applications based on userId
 *     description: Returns filled member application based on userId
 *     tags: [Filled-Applications]
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
 *           
 *   delete:
 *     summary: Deletes filled member application based on userID
 *     description: Delete filled member application based on userID
 *     tags: [Filled-Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Filled Application ID
 *     responses:
 *       '204':
 *         description: Filled Application Deleted
 */

import { Router } from "express";
import filledApplicationController from "../controllers/filledApplicationController";
const router = Router();

router.get("/:id", filledApplicationController.getFilledApplicationInfo)
router.get("/", filledApplicationController.getFilledApplications)
router.get("/club/:id", filledApplicationController.getFilledClubApplications)
router.get("/executive/:id", filledApplicationController.getFilledExecutiveApplications)
router.get("/member/:id", filledApplicationController.getFilledMemberApplications)
router.post("/create-filled-application", filledApplicationController.createFilledApplication)
router.delete("/:id", filledApplicationController.deleteExistingFilledApplication)
router.delete("/executive/:id", filledApplicationController.deleteUsersExistingExecutiveApplications)
router.delete("/member/:id", filledApplicationController.deleteUsersExistingMemberApplications)

export default router;