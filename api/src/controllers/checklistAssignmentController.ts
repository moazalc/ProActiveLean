import {
  createChecklistAssignment,
  getChecklistAssignments,
  getChecklistAssignmentById,
  updateChecklistAssignment,
  deleteChecklistAssignment,
} from "../services/checklistAssignmentServices";

import { Request, Response } from "express";

export const createChecklistAssignmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAssignment = await createChecklistAssignment(req.body);
    res.status(201).json(checklistAssignment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getChecklistAssignmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAssignments = await getChecklistAssignments();
    res.status(200).json(checklistAssignments);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getChecklistAssignmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAssignment = await getChecklistAssignmentById(
      Number(req.params.id)
    );
    res.status(200).json(checklistAssignment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateChecklistAssignmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAssignment = await updateChecklistAssignment(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(checklistAssignment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteChecklistAssignmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const checklistAssignment = await deleteChecklistAssignment(
      Number(req.params.id)
    );
    res.status(200).json(checklistAssignment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
