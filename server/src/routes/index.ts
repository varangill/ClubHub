import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";
import announcementRoutes from "./announcementRoutes"
import applicationRoutes from "./applicationRoutes"

router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/announcements", announcementRoutes)
router.use("/applications", applicationRoutes)

export default router;
