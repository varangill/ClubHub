import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.get("/:id", userController.getUserInfo);

router.get("/clubs/:id", userController.getUserClubs);

router.post("/create-user", userController.createUser);

export default router;
