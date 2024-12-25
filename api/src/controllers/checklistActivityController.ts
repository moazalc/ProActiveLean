import {
  createChecklistActivity,
  getChecklistActivityById,
  getChecklistActivities,
  updateChecklistActivity,
  deleteChecklistActivity,
} from "../services/checklistActivityServices";
import { Request, Response } from "express";

export const createChecklistActivityController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistActivity = await createChecklistActivity(req.body);
    res.status(201).json(checklistActivity);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getChecklistActivityByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistActivity = await getChecklistActivityById(
      Number(req.params.id)
    );
    res.status(200).json(checklistActivity);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getChecklistActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistActivities = await getChecklistActivities();
    res.status(200).json(checklistActivities);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateChecklistActivityController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistActivity = await updateChecklistActivity(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(checklistActivity);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteChecklistActivityController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteChecklistActivity(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
