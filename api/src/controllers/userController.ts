import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../services/userServices";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = await deleteUser(Number(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
