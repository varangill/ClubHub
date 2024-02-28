import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";
import announcementRoutes from "./announcementRoutes"

router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/announcements", announcementRoutes)

export default router;
