import {
  createLocation,
  getLocationById,
  getAllLocations,
  updateLocation,
  deleteLocation,
  getLocationByCategoryId,
} from "../services/locationServices";
import { Request, Response } from "express";

export const getAllLocationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const locations = await getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getLocationByCategoryIdController = async (
  req: Request,
  res: Response
) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
    const locations = await getLocationByCategoryId(categoryId);
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getLocationByIdController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    const location = await getLocationById(id);
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createLocationController = async (req: Request, res: Response) => {
  try {
    const location = await createLocation(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateLocationController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const location = await updateLocation(id, req.body);
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteLocationController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await deleteLocation(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
