import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createWorkshop = async (data: {
  startDate: Date;
  completionDate?: Date;
  relatedPlaceId: number;
  responsibleUserId: number;
  approved?: boolean;
  completed: boolean;
  attendees?: [];
}) => {
  return await prisma.workshop.create({
    data: {
      startDate: data.startDate,
      completionDate: data.completionDate,
      relatedPlace: {
        connect: {
          id: data.relatedPlaceId,
        },
      },
      responsibleUser: {
        connect: {
          id: data.responsibleUserId,
        },
      },
      approved: data.approved ?? false,
      completed: data.completed,
      workshopAttendee: data.attendees
        ? {
            createMany: {
              data: data.attendees.map((attendee) => ({
                userId: attendee,
              })),
            },
          }
        : undefined,
    },
  });
};

export const getAllWorkshops = async () => {
  return await prisma.workshop.findMany();
};

export const getWorkshopById = async (id: number) => {
  return await prisma.workshop.findUnique({
    where: { id },
  });
};

export const updateWorkshop = async (
  id: number,
  data: Partial<{
    startDate: Date;
    completionDate?: Date;
    relatedPlaceId: number;
    responsibleUserId: number;
    approved?: boolean;
    completed: boolean;
    attendees?: [];
  }>
) => {
  await prisma.workshopAttendee.deleteMany({
    where: {
      workshopId: id,
      userId: {
        notIn: data.attendees,
      },
    },
  });

  return await prisma.workshop.update({
    where: { id },
    data: {
      startDate: data.startDate,
      completionDate: data.completionDate,
      relatedPlace: data.relatedPlaceId
        ? {
            connect: {
              id: data.relatedPlaceId,
            },
          }
        : undefined,
      responsibleUser: data.responsibleUserId
        ? {
            connect: {
              id: data.responsibleUserId,
            },
          }
        : undefined,
      approved: data.approved,
      completed: data.completed,
      workshopAttendee: data.attendees
        ? {
            createMany: {
              data: data.attendees.map((attendee) => ({
                userId: attendee,
              })),
            },
          }
        : undefined,
    },
  });
};

export const deleteWorkshop = async (id: number) => {
  return await prisma.workshop.delete({
    where: { id },
  });
};

export const setAttendance = async (
  workshopId: number,
  userId: number,
  attended: boolean
) => {
  return await prisma.workshopAttendee.update({
    where: {
      workshopId_userId: {
        workshopId,
        userId,
      },
    },
    data: {
      attended,
    },
  });
};
