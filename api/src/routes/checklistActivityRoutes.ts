import {
  createChecklistActivityController,
  getChecklistActivityByIdController,
  getChecklistActivitiesController,
  updateChecklistActivityController,
  deleteChecklistActivityController,
} from "../controllers/checklistActivityController";
import { Router } from "express";

const router = Router();

router.post("/", createChecklistActivityController);
router.get("/:id", getChecklistActivityByIdController);
router.get("/", getChecklistActivitiesController);
router.put("/:id", updateChecklistActivityController);
router.delete("/:id", deleteChecklistActivityController);

export default router;
