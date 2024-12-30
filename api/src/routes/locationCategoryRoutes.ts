import {
  createLocationCategoryController,
  deleteLocationCategoryController,
  getLocationCategoriesController,
  getLocationCategoryByIdController,
  updateLocationCategoryController,
} from "../controllers/locationCategoryController";
import { Router } from "express";

const router = Router();

router.get("/", getLocationCategoriesController);
router.get("/:id", getLocationCategoryByIdController);
router.post("/", createLocationCategoryController);
router.put("/:id", updateLocationCategoryController);
router.delete("/:id", deleteLocationCategoryController);

export default router;
