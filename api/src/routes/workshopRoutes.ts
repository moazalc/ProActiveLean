import {
  createWorkshopController,
  getAllWorkshopsController,
  getWorkshopByIdController,
  updateWorkshopController,
  deleteWorkshopController,
  setAttendanceController,
} from "../controllers/workshopContoller";

import express from "express";

const router = express.Router();

router.post("/", createWorkshopController);
router.get("/", getAllWorkshopsController);
router.get("/:id", getWorkshopByIdController);
router.put("/:id", updateWorkshopController);
router.delete("/:id", deleteWorkshopController);
router.put("/:id/attendance", setAttendanceController);
export default router;
