import {
  createReviewSubject,
  getReviewSubjectById,
  updateReviewSubject,
  deleteReviewSubject,
  getReviewSubjects,
  getReviewSubjectsByPlaceId,
} from "../services/reviewSubjectServices";

import { Request, Response } from "express";

export const getReviewSubjectsByPlaceIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubjects = await getReviewSubjectsByPlaceId(
      Number(req.params.locationId)
    );
    res.status(200).json(reviewSubjects);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createReviewSubjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubject = await createReviewSubject(req.body);
    res.status(201).json(reviewSubject);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getReviewSubjectsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubjects = await getReviewSubjects();
    res.status(200).json(reviewSubjects);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getReviewSubjectByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubject = await getReviewSubjectById(Number(req.params.id));
    res.status(200).json(reviewSubject);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateReviewSubjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubject = await updateReviewSubject(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(reviewSubject);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteReviewSubjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewSubject = await deleteReviewSubject(Number(req.params.id));
    res.status(200).json(reviewSubject);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
