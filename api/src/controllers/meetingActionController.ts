import { Request, Response } from "express";
import {
  createMeetingAction,
  getAllMeetingActions,
  getMeetingActionByMeetingId,
  getMeetingActionById,
  updateMeetingAction,
  deleteMeetingAction,
} from "../services/meetingService";

export const createMeetingActionController = async (
  req: Request,
  res: Response
) => {
  try {
    const meetingAction = await createMeetingAction(req.body);
    res.status(201).json(meetingAction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllMeetingActionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const meetingActions = await getAllMeetingActions();
    res.status(200).json(meetingActions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMeetingActionByMeetingIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { meetingId } = req.params;
    const meetingActions = await getMeetingActionByMeetingId(Number(meetingId));
    res.status(200).json(meetingActions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMeetingActionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const meetingAction = await getMeetingActionById(Number(id));
    res.status(200).json(meetingAction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMeetingActionController = async (
  req: Request,
  res: Response
) => {
  try {
    const meetingAction = await updateMeetingAction(req.body);
    res.status(200).json(meetingAction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMeetingActionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteMeetingAction(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
