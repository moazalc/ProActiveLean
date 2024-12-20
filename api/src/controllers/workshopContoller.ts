import {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
  setAttendance,
} from "../services/workshopServices";
import { Request, Response } from "express";

export const createWorkshopController = async (req: Request, res: Response) => {
  try {
    const workshop = await createWorkshop(req.body);
    res.json(workshop);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllWorkshopsController = async (
  req: Request,
  res: Response
) => {
  try {
    const workshops = await getAllWorkshops();
    res.json(workshops);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getWorkshopByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const workshop = await getWorkshopById(Number(req.params.id));
    res.json(workshop);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateWorkshopController = async (req: Request, res: Response) => {
  try {
    const workshop = await updateWorkshop(Number(req.params.id), req.body);
    res.json(workshop);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteWorkshopController = async (req: Request, res: Response) => {
  try {
    const workshop = await deleteWorkshop(Number(req.params.id));
    res.json(workshop);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const setAttendanceController = async (req: Request, res: Response) => {
  try {
    const attendance = await setAttendance(
      Number(req.params.id),
      req.body,
      req.body.attended
    );
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
