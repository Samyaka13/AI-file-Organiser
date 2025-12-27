import { Router } from "express";
import { organizeFileController } from "../controllers/organize.controller";

const router = Router();

// POST /api/organize
router.post("/organize", organizeFileController);

export default router;
