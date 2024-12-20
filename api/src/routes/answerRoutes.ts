import {
  createAnswerController,
  getAnswerByIdController,
  updateAnswerController,
  deleteAnswerController,
} from "../controllers/answerController";

import { Router } from "express";

const router = Router();

router.post("/", createAnswerController);
router.get("/:id", getAnswerByIdController);
router.put("/:id", updateAnswerController);
router.delete("/:id", deleteAnswerController);

export default router;
