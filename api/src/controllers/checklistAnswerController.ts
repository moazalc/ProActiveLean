import {
  createChecklistAnswer,
  getChecklistAnswers,
  getChecklistAnswerById,
  updateChecklistAnswer,
  deleteChecklistAnswer,
} from "../services/checklistAnswerServices";
import { Request, Response } from "express";

export const createChecklistAnswerController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const checklistAnswer = await createChecklistAnswer(data);
    res.status(201).json(checklistAnswer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getChecklistAnswersController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAnswers = await getChecklistAnswers();
    res.status(200).json(checklistAnswers);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getChecklistAnswerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const checklistAnswer = await getChecklistAnswerById(id);
    res.status(200).json(checklistAnswer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateChecklistAnswerController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const checklistAnswer = await updateChecklistAnswer(id, data);
    res.status(200).json(checklistAnswer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteChecklistAnswerController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    await deleteChecklistAnswer(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
