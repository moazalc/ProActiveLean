import { Request, Response } from "express";
import {
  createMeeting,
  getMeetingById,
  getAllMeetings,
  updateMeeting,
  deleteMeeting,
  setAttendance,
} from "../services/meetingService";

export const createMeetingController = async (req: Request, res: Response) => {
  try {
    const meeting = await createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllMeetingsController = async (req: Request, res: Response) => {
  try {
    const meetings = await getAllMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMeetingByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const meeting = await getMeetingById(Number(id));
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMeetingController = async (req: Request, res: Response) => {
  try {
    const meeting = await updateMeeting(req.body);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMeetingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteMeeting(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const setAttendanceController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { attended } = req.body;
    const meeting = await setAttendance(Number(id), req.body, attended);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
