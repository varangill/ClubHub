

import { Router } from "express";
import announcementController from "../controllers/announcementController";
import { fetchClubAnnouncements } from "../services/announcementService";
const router = Router();

router.get("/:id", announcementController.getAnnouncementInfo)
router.get("/club/:id", announcementController.getClubAnnouncements)
router.post("/create-announcement", announcementController.createAnnouncement)
router.delete("/:id", announcementController.deleteExistingAnnouncement)

export default router;
