import {
  createQuestionController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionController,
  deleteQuestionController,
} from "../controllers/questionController";

import { Router } from "express";

const router = Router();

router.post("/", createQuestionController);
router.get("/", getQuestionsController);
router.get("/:id", getQuestionByIdController);
router.put("/:id", updateQuestionController);
router.delete("/:id", deleteQuestionController);

export default router;
