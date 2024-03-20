import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";
import announcementRoutes from "./announcementRoutes";
import applicationRoutes from "./applicationRoutes";
import messageRoutes from "./messageRoutes";
import tagRoutes from "./tagRoutes";
import eventRoutes from "./eventRoutes";

import filledApplicationRoutes from "./filledApplicationRoutes"


router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);
router.use("/announcements", announcementRoutes);
router.use("/applications", applicationRoutes);
router.use("/messages", messageRoutes);
router.use("/tags", tagRoutes);
router.use("/filled-applications", filledApplicationRoutes)
router.use("/event", eventRoutes);


export default router;
