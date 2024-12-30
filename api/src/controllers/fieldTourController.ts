import {
  createFieldTour,
  getFieldTours,
  getFieldTourById,
  updateFieldTour,
  deleteFieldTour,
  setAttendance,
} from "../services/fieldTourServices";

import { Request, Response } from "express";

export const createFieldTourController = async (
  req: Request,
  res: Response
) => {
  try {
    const fieldTour = await createFieldTour(req.body);
    res.status(201).json(fieldTour);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getFieldToursController = async (req: Request, res: Response) => {
  try {
    const fieldTours = await getFieldTours();
    res.status(200).json(fieldTours);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getFieldTourByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const fieldTour = await getFieldTourById(Number(req.params.id));
    res.status(200).json(fieldTour);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateFieldTourController = async (
  req: Request,
  res: Response
) => {
  try {
    const fieldTour = await updateFieldTour(Number(req.params.id), req.body);
    res.status(200).json(fieldTour);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteFieldTourController = async (
  req: Request,
  res: Response
) => {
  try {
    const fieldTour = await deleteFieldTour(Number(req.params.id));
    res.status(200).json(fieldTour);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const setAttendanceController = async (req: Request, res: Response) => {
  try {
    const { workshopId, userId, attended } = req.body;
    const attendance = await setAttendance(workshopId, userId, attended);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
