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