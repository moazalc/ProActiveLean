import {
  createFieldTourController,
  getFieldToursController,
  getFieldTourByIdController,
  updateFieldTourController,
  deleteFieldTourController,
  setAttendanceController,
} from "../controllers/fieldTourController";

import { Router } from "express";

const router = Router();

router.post("/", createFieldTourController);
router.get("/", getFieldToursController);
router.get("/:id", getFieldTourByIdController);
router.put("/:id", updateFieldTourController);
router.delete("/:id", deleteFieldTourController);
router.put("/:id/attendance", setAttendanceController);
export default router;
