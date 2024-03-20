import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";
import announcementRoutes from "./announcementRoutes";
import applicationRoutes from "./applicationRoutes";
import messageRoutes from "./messageRoutes";
import filledApplicationRoutes from "./filledApplicationRoutes"

router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/announcements", announcementRoutes);
router.use("/applications", applicationRoutes);
router.use("/messages", messageRoutes);
router.use("/filled-applications", filledApplicationRoutes)

export default router;
