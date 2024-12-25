import {
  createFinding,
  getFindings,
  getFindingById,
  updateFinding,
  deleteFinding,
} from "../services/findingServices";
import { Request, Response } from "express";

export const createFindingController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createFinding(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getFindingsController = async (req: Request, res: Response) => {
  try {
    const result = await getFindings();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getFindingByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await getFindingById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateFindingController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const result = await updateFinding(id, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteFindingController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteFinding(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
