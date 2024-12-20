import { Request, Response } from "express";
import {
  createAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "../services/answerServices";

export const createAnswerController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const answer = await createAnswer(data);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAnswerByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const answer = await getAnswerById(id);
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateAnswerController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const answer = await updateAnswer(id, data);
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteAnswerController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteAnswer(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
