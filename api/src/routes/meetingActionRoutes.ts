import {
  createMeetingController,
  getAllMeetingsController,
  getMeetingByIdController,
  updateMeetingController,
  deleteMeetingController,
} from "../controllers/meetingController";
import Router from "express";

const router = Router();

router.post("/", createMeetingController);
router.get("/", getAllMeetingsController);
router.get("/:id", getMeetingByIdController);
router.put("/:id", updateMeetingController);
router.delete("/:id", deleteMeetingController);

export default router;
