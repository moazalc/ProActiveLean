import {
  createChecklistAssignmentController,
  getChecklistAssignmentsController,
  getChecklistAssignmentByIdController,
  updateChecklistAssignmentController,
  deleteChecklistAssignmentController,
} from "../controllers/checklistAssignmentController";
import { Router } from "express";

const router = Router();

router.post("/", createChecklistAssignmentController);
router.get("/", getChecklistAssignmentsController);
router.get("/:id", getChecklistAssignmentByIdController);
router.put("/:id", updateChecklistAssignmentController);
router.delete("/:id", deleteChecklistAssignmentController);

export default router;
