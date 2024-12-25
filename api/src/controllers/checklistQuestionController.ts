import {
  createChecklistQuestion,
  deleteChecklistQuestion,
  getChecklistQuestionById,
  getChecklistQuestions,
  updateChecklistQuestion,
} from "../services/checklistQuestionServices";
import { Request, Response } from "express";

export const createChecklistQuestionController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const checklistQuestion = await createChecklistQuestion(data);
    res.json(checklistQuestion);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllChecklistQuestionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistQuestions = await getChecklistQuestions();
    res.json(checklistQuestions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getChecklistQuestionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const checklistQuestion = await getChecklistQuestionById(id);
    res.json(checklistQuestion);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateChecklistQuestionController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const checklistQuestion = await updateChecklistQuestion(id, data);
    res.json(checklistQuestion);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteChecklistQuestionController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const checklistQuestion = await deleteChecklistQuestion(id);
    res.json(checklistQuestion);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
