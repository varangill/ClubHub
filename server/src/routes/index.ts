import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";
import announcementRoutes from "./announcementRoutes";
import applicationRoutes from "./applicationRoutes";
import messageRoutes from "./messageRoutes";

router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/announcements", announcementRoutes);
router.use("/applications", applicationRoutes);
router.use("/messages", messageRoutes);

export default router;
