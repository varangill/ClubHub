import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes";
import clubRoutes from "./clubRoutes";

router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);

export default router;
