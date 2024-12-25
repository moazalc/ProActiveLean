import {
  getRoleById,
  getRoles,
  deleteRole,
  createRole,
  updateRole,
} from "../services/roleServices";
import { Request, Response } from "express";

export const createRoleController = async (req: Request, res: Response) => {
  try {
    const role = await createRole(req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getRoleByIdController = async (req: Request, res: Response) => {
  try {
    const role = await getRoleById(Number(req.params.id));
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getRolesController = async (req: Request, res: Response) => {
  try {
    const roles = await getRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const role = await updateRole(Number(req.params.id), req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const role = await deleteRole(Number(req.params.id));
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
