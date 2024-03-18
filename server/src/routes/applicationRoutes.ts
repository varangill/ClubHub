/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Applications Management
 * /applications:
 *   get:
 *     summary: Gets all applications
 *     description: Returns applications
 *     tags: [Applications]
 *     responses:
 *       '200':
 *         description: Successful response
 * 
 * /applications/{id}:
 *   get:
 *     summary: Gets application based on id
 *     description: Returns application based on id
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       '200':
 *         description: Successful response
 *           
 *   delete:
 *     summary: Deletes application based on ID
 *     description: Delete application based on ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       '204':
 *         description: Application Deleted
 * /applications/create-application:
 *   post:
 *     summary: Create a new application
 *     description: Create a new application with the provided data
 *     tags: [Applications]
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
 *               type:
 *                 type: string
 *                 format: string
 *                 description: Type of application
 *               appText:
 *                 type: string
 *                 format: string
 *                 description: Application Text
 *             required:
 *               - clubId
 *               - userId
 *     responses:
 *       '201':
 *         description: Application created successfully
 * /applications/club/{id}:
 *   get:
 *     summary: Gets applications based on ClubId
 *     description: Returns application based on ClubId
 *     tags: [Applications]
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
 * /applications/executive/{id}:
 *   get:
 *     summary: Gets executive applications based on ClubId
 *     description: Returns executive application based on ClubId
 *     tags: [Applications]
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
 * /applications/member/{id}:
 *   get:
 *     summary: Gets member applications based on ClubId
 *     description: Returns member application based on ClubId
 *     tags: [Applications]
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
 * /applications/latest/{id}:
 *   get:
 *     summary: Gets latest application based on ClubId
 *     description: Returns latest application based on ClubId
 *     tags: [Applications]
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
*/

import { Router } from "express";
import applicationController from "../controllers/applicationController";
const router = Router();

router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplicationInfo);
router.get("/club/:id", applicationController.getClubApplications);
router.get("/executive/:id", applicationController.getExecutiveClubApplication);
router.get("/member/:id", applicationController.getMemberClubApplication);
router.get("/latest/:id", applicationController.getLatestClubApplication);
router.post("/create-application", applicationController.createNewApplication);
router.delete("/:id", applicationController.deleteExistingApplication);

export default router;