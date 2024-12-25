import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../services/activityServices";
import { Request, Response } from "express";

export const createActivityController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const activity = await createActivity(data);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getActivitiesController = async (req: Request, res: Response) => {
  try {
    const activities = await getActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getActivityByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const activity = await getActivityById(id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateActivityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const activity = await updateActivity(id, data);
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteActivityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteActivity(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};
