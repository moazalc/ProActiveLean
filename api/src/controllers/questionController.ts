import exp from "constants";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../services/questionServices";
import { Request, Response } from "express";

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const question = await createQuestion(data);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const question = await getQuestionById(id);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const question = await updateQuestion(id, data);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const question = await deleteQuestion(id);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
