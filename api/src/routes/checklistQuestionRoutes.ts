import {
  createChecklistQuestionController,
  getChecklistQuestionByIdController,
  getAllChecklistQuestionsController,
  updateChecklistQuestionController,
  deleteChecklistQuestionController,
} from "../controllers/checklistQuestionController";
import { Router } from "express";

const router = Router();

router.post("/", createChecklistQuestionController);
router.get("/", getAllChecklistQuestionsController);
router.get("/:id", getChecklistQuestionByIdController);
router.put("/:id", updateChecklistQuestionController);
router.delete("/:id", deleteChecklistQuestionController);

export default router;
