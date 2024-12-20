import {
  createRoleController,
  getRoleByIdController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
} from "../controllers/roleController";

import { Router } from "express";

const router = Router();

router.post("/", createRoleController);
router.get("/", getRolesController);
router.get("/:id", getRoleByIdController);
router.put("/:id", updateRoleController);
router.delete("/:id", deleteRoleController);

export default router;
