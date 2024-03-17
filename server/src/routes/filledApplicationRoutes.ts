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

export default router;