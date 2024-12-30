import {
  createChecklistCategory,
  deleteChecklistCategory,
  getChecklistCategories,
  getChecklistCategoryById,
  updateChecklistCategory,
  getChecklistCategoryByLocationCategoryId,
} from "../services/checklistCategoryServices";
import { Request, Response } from "express";

export const getChecklistCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistCategories = await getChecklistCategories();
    res.status(200).json(checklistCategories);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getChecklistCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const checklistCategory = await getChecklistCategoryById(id);
    res.status(200).json(checklistCategory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createChecklistCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      locationCategoryId,
      questions,
      userId,
    }: {
      name: string;
      locationCategoryId: number;
      questions: { id: number; question: string }[];
      userId: number;
    } = req.body;
    const checklistCategory = await createChecklistCategory(
      name,
      locationCategoryId,
      questions,
      userId
    );
    res.status(201).json(checklistCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateChecklistCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const {
      name,
      locationCategoryId,
      questions,
      userId,
    }: {
      name: string;
      locationCategoryId: number;
      questions: { id: number; question: string }[];
      userId: number;
    } = req.body;
    const checklistCategory = await updateChecklistCategory(
      id,
      name,
      locationCategoryId,
      questions,
      userId
    );
    res.status(200).json(checklistCategory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteChecklistCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    await deleteChecklistCategory(id);
    res.status(200).json({ message: "Checklist category deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getChecklistCategoryByLocationCategoryIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const locationCategoryId = Number(req.params.id);
    const checklistCategories = await getChecklistCategoryByLocationCategoryId(
      locationCategoryId
    );
    res.status(200).json(checklistCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
