import {
  createLocationController,
  getLocationByIdController,
  getAllLocationsController,
  updateLocationController,
  deleteLocationController,
  getLocationByCategoryIdController,
} from "../controllers/locationControllers";
import { Router } from "express";

const router = Router();

router.get("/", getAllLocationsController);
router.get("/category/:categoryId", getLocationByCategoryIdController);
router.get("/:id", getLocationByIdController);
router.post("/", createLocationController);
router.put("/:id", updateLocationController);
router.delete("/:id", deleteLocationController);

export default router;
