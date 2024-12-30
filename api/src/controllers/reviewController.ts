import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../services/reviewServices";

import { Request, Response } from "express";

export const createReviewController = async (req: Request, res: Response) => {
  // body example:
  // {
  //   "comment": "Great place but ...",
  //   "relatedPlaceId": 1,
  //   "customerName": "John Doe",
  //   "viewed": false,
  //   "reviewRating": [
  //     {
  //       "rating": 5,
  //       "reviewSubjectId": 1
  //     },
  //     {
  //       "rating": 4,
  //       "reviewSubjectId": 2
  //     }
  //   ]
  // }
  try {
    const review = await createReview(req.body);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getReviewsController = async (req: Request, res: Response) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getReviewByIdController = async (req: Request, res: Response) => {
  try {
    const review = await getReviewById(Number(req.params.id));
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  // body example:
  // {
  //   "viewed": true
  // }
  try {
    const review = await updateReview(Number(req.params.id), req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const review = await deleteReview(Number(req.params.id));
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
