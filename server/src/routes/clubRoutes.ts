import { Router } from "express";
import clubController from "../controllers/clubController";
const router = Router();

router.get("/", clubController.getClubs);
router.get("/:id", clubController.getClubInfo);
router.get("/memberships/:id", clubController.getClubMemberships);
router.post("/create-club", clubController.createClub);

export default router;
