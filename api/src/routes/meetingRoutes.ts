import {
  createMeetingController,
  getAllMeetingsController,
  getMeetingByIdController,
  updateMeetingController,
  deleteMeetingController,
  setAttendanceController,
} from "../controllers/meetingController";

import { Router } from "express";

const router = Router();

router.post("/", createMeetingController);
router.get("/", getAllMeetingsController);
router.get("/:id", getMeetingByIdController);
router.put("/:id", updateMeetingController);
router.delete("/:id", deleteMeetingController);
router.put("/:id/attendance", setAttendanceController);
export default router;
