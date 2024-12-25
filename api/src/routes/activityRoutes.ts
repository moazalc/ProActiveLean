import {
  createActivityController,
  getActivitiesController,
  getActivityByIdController,
  updateActivityController,
  deleteActivityController,
} from "../controllers/activityController";

import { Router } from "express";

const router = Router();

router.post("/", createActivityController);
router.get("/", getActivitiesController);
router.get("/:id", getActivityByIdController);
router.put("/:id", updateActivityController);
router.delete("/:id", deleteActivityController);

export default router;
