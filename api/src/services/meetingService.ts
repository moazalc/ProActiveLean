import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMeeting = async (data: {
  startDate: Date;
  startTime: Date;
  endDate: Date | null;
  relatedPlaceId: number;
  responsibleUserId: number;
  approved: boolean;
  completed: boolean;
  attendees: number[];
}) => {
  return await prisma.meeting.create({
    data: {
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      responsibleUser: { connect: { id: data.responsibleUserId } },
      approved: data.approved,
      completed: data.completed,
      meetingAttendee: {
        createMany: {
          data: data.attendees.map((attendee) => ({
            userId: attendee,
          })),
        },
      },
    },
  });
};

export const getAllMeetings = async () => {
  return await prisma.meeting.findMany({
    include: {
      relatedPlace: true,
      responsibleUser: true,
      meetingAttendee: true,
      meetingAction: true,
    },
  });
};

export const getMeetingById = async (id: number) => {
  return await prisma.meeting.findUnique({
    where: { id },
    include: {
      relatedPlace: true,
      responsibleUser: true,
      meetingAttendee: true,
      meetingAction: true,
    },
  });
};

export const updateMeeting = async (data: {
  id: number;
  startDate: Date;
  startTime: Date;
  endDate: Date | null;
  relatedPlaceId: number;
  responsibleUserId: number;
  approved: boolean;
  completed: boolean;
  attendees: number[];
}) => {
  if (data.attendees) {
    await prisma.meetingAttendee.deleteMany({
      where: { meetingId: data.id, userId: { notIn: data.attendees } },
    });
  }
  return await prisma.meeting.update({
    where: { id: data.id },
    data: {
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      responsibleUser: { connect: { id: data.responsibleUserId } },
      approved: data.approved,
      completed: data.completed,
      meetingAttendee: {
        createMany: {
          data: data.attendees
            ? data.attendees.map((attendee) => ({
                userId: attendee,
              }))
            : [],
        },
      },
    },
  });
};

export const deleteMeeting = async (id: number) => {
  return await prisma.meeting.delete({
    where: { id },
  });
};

export const setAttendance = async (
  meetingId: number,
  userId: number,
  attended: boolean
) => {
  return await prisma.meetingAttendee.update({
    where: { meetingId_userId: { meetingId, userId } },
    data: { attended },
  });
};

export const createMeetingAction = async (body: {
  meetingId: number;
  description: string;
  status: boolean | null;
  requestedByUserId: number;
  requestedToUserId: number;
}) => {
  const {
    meetingId,
    description,
    status,
    requestedByUserId,
    requestedToUserId,
  } = body;
  return await prisma.meetingAction.create({
    data: {
      meeting: { connect: { id: meetingId } },
      description,
      status,
      requestedByUser: { connect: { id: requestedByUserId } },
      requestedToUser: { connect: { id: requestedToUserId } },
    },
  });
};

export const getAllMeetingActions = async () => {
  return await prisma.meetingAction.findMany({
    include: {
      meeting: true,
      requestedByUser: true,
      requestedToUser: true,
    },
  });
};

export const getMeetingActionByMeetingId = async (meetingId: number) => {
  return await prisma.meetingAction.findMany({
    where: { meetingId },
    include: {
      meeting: true,
      requestedByUser: true,
      requestedToUser: true,
    },
  });
};

export const getMeetingActionById = async (id: number) => {
  return await prisma.meetingAction.findUnique({
    where: { id },
    include: {
      meeting: true,
      requestedByUser: true,
      requestedToUser: true,
    },
  });
};

export const updateMeetingAction = async (body: {
  id: number;
  description: string;
  status: boolean | null;
  requestedByUserId: number;
  requestedToUserId: number;
}) => {
  const { id, description, status, requestedByUserId, requestedToUserId } =
    body;
  return await prisma.meetingAction.update({
    where: { id },
    data: {
      description,
      status,
      requestedByUser: { connect: { id: requestedByUserId } },
      requestedToUser: { connect: { id: requestedToUserId } },
    },
  });
};

export const deleteMeetingAction = async (id: number) => {
  return await prisma.meetingAction.delete({
    where: { id },
  });
};
