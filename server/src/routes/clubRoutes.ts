import { Router } from "express";
import clubController from "../controllers/clubController";
const router = Router();

router.get("/", clubController.getClubs);
router.get("/:id", clubController.getClubInfo);
router.post("/create-club", clubController.createClub);

export default router;
