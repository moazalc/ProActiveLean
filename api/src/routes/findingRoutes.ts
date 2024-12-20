import {
  createFindingController,
  getFindingsController,
  getFindingByIdController,
  updateFindingController,
  deleteFindingController,
} from "../controllers/findingController";

import { Router } from "express";

const router = Router();

router.post("/", createFindingController);
router.get("/", getFindingsController);
router.get("/:id", getFindingByIdController);
router.put("/:id", updateFindingController);
router.delete("/:id", deleteFindingController);

export default router;
