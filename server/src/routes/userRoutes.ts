import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.get("/getUser/:id", userController.getUserInfo);
router.get("/clubs/:id", userController.getUserClubs);
router.post("/create-user", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/membership", userController.getClubMembership);
router.post("/join-club", userController.userJoinClub);
router.post("/getUserWithName/:name", userController.getUserInfoWithName);

export default router;
