import {
  createReviewController,
  getReviewByIdController,
  getReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController";
import { Router } from "express";

const router = Router();

router.post("/", createReviewController);
router.get("/", getReviewsController);
router.get("/:id", getReviewByIdController);
router.put("/:id", updateReviewController);
router.delete("/:id", deleteReviewController);

export default router;
