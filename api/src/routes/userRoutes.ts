import {
  createUserController,
  getUserByIdController,
  getUserByEmailController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
} from "../controllers/userController";

import { Router } from "express";
const router = Router();

router.post("/", createUserController);
router.get("/id/:id", getUserByIdController);
router.get("/email/:email", getUserByEmailController);
router.get("/", getAllUsersController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
