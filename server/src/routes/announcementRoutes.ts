import { Router } from "express";
import announcementController from "../controllers/announcementController";
const router = Router();

router.get("/", announcementController.getAnnouncements)
router.get("/:id", announcementController.getAnnouncementInfo)
router.get("/club/:id", announcementController.getClubAnnouncements)
router.post("/create-announcement", announcementController.createAnnouncement)

export default router;
