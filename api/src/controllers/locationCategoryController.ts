import {
  createLocationCategory,
  deleteLocationCategory,
  getLocationCategories,
  updateLocationCategory,
  getLocationCategoryById,
} from "../services/locationCategoryServices";
import { Request, Response } from "express";

export const getLocationCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getLocationCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getLocationCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const category = await getLocationCategoryById(Number(id));
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createLocationCategoryController = async (
  req: Request,
  res: Response
) => {
  const { name, parentId } = req.body;
  try {
    const category = await createLocationCategory(name, parentId);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateLocationCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, parentId } = req.body;
  try {
    const category = await updateLocationCategory(Number(id), name, parentId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteLocationCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await deleteLocationCategory(Number(id));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
