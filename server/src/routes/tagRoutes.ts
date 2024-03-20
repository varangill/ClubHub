import { Router } from "express";
import tagController from "../controllers/tagController";
const router = Router();

router.get("/", tagController.getTags);
router.get("/:id", tagController.getClubsWithTag);
router.get("/club/:id", tagController.getClubsTags);
router.post("/", tagController.createClubTag);
router.delete("/", tagController.removeClubTag);
export default router;
