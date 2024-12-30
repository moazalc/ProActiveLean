import {
  createReviewSubjectController,
  getReviewSubjectByIdController,
  updateReviewSubjectController,
  deleteReviewSubjectController,
  getReviewSubjectsController,
  getReviewSubjectsByPlaceIdController,
} from "../controllers/reviewSubjectController";
import { Router } from "express";

const router = Router();

router.post("/", createReviewSubjectController);
router.get("/", getReviewSubjectsController);
router.get("/:id", getReviewSubjectByIdController);
router.get("/location/:locationId", getReviewSubjectsByPlaceIdController);
router.put("/:id", updateReviewSubjectController);
router.delete("/:id", deleteReviewSubjectController);

export default router;
