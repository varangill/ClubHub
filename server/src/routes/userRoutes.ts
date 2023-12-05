import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.get("/getUser/:id", userController.getUserInfo);
router.get("/clubs/:id", userController.getUserClubs);
router.post("/create-user", userController.createUser);
router.get("/membership", userController.getClubMembership);
router.post("/join-club", userController.userJoinClub);

export default router;
