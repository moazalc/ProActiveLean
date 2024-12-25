import {
  createChecklistAnswerController,
  getChecklistAnswersController,
  getChecklistAnswerByIdController,
  updateChecklistAnswerController,
  deleteChecklistAnswerController,
} from "../controllers/checklistAnswerController";
import { Router } from "express";

const router = Router();

router.post("/", createChecklistAnswerController);
router.get("/", getChecklistAnswersController);
router.get("/:id", getChecklistAnswerByIdController);
router.put("/:id", updateChecklistAnswerController);
router.delete("/:id", deleteChecklistAnswerController);

export default router;
