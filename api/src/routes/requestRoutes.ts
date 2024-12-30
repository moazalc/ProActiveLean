import {
  createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
  deleteRequestController,
} from "../controllers/requestController";

import { Router } from "express";

const router = Router();

router.post("/", createRequestController);
router.get("/", getAllRequestsController);
router.get("/:id", getRequestByIdController);
router.put("/:id", updateRequestController);
router.delete("/:id", deleteRequestController);

export default router;
