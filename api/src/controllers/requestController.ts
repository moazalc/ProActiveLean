import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../services/requestServices";
import { Request, Response } from "express";

export const createRequestController = async (req: Request, res: Response) => {
  try {
    const request = await createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllRequestsController = async (req: Request, res: Response) => {
  try {
    const requests = await getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getRequestByIdController = async (req: Request, res: Response) => {
  try {
    const request = await getRequestById(Number(req.params.id));
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateRequestController = async (req: Request, res: Response) => {
  try {
    const request = await updateRequest(Number(req.params.id), req.body);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteRequestController = async (req: Request, res: Response) => {
  try {
    const request = await deleteRequest(Number(req.params.id));
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
