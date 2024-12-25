import {
  createChecklistCategoryController,
  getChecklistCategoriesController,
  getChecklistCategoryByIdController,
  updateChecklistCategoryController,
  deleteChecklistCategoryController,
  getChecklistCategoryByLocationCategoryIdController,
} from "../controllers/checklistCategoryController";
import { Router } from "express";

const router = Router();

router.get("/", getChecklistCategoriesController);
router.get("/:id", getChecklistCategoryByIdController);
router.post("/", createChecklistCategoryController);
router.put("/:id", updateChecklistCategoryController);
router.delete("/:id", deleteChecklistCategoryController);
router.get(
  "/locationCategory/:id",
  getChecklistCategoryByLocationCategoryIdController
);

export default router;
