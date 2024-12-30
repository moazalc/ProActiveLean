import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

export const createFieldTour = async (data: {
  relatedPlaceId: number;
  date: Date;
  responsibleUserId: number;
  fieldTourAttendees: [];
}) => {
  return await prisma.fieldTour.create({
    data: {
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      date: new Date(data.date),
      responsibleUser: { connect: { id: data.responsibleUserId } },
      fieldTourAttendee: {
        createMany: {
          data: data.fieldTourAttendees.map((attendee) => ({
            userId: attendee,
          })),
        },
      },
    },
  });
};

export const getFieldTours = async () => {
  return await prisma.fieldTour.findMany({
    include: {
      relatedPlace: true,
      responsibleUser: true,
      fieldTourAttendee: true,
      finding: true,
    },
  });
};

export const getFieldTourById = async (id: number) => {
  return await prisma.fieldTour.findUnique({
    where: { id },
    include: {
      relatedPlace: true,
      responsibleUser: true,
      fieldTourAttendee: true,
      finding: true,
    },
  });
};

export const updateFieldTour = async (
  id: number,
  data: {
    relatedPlaceId?: number;
    date: Date;
    responsibleUserId?: number;
    attendees?: [];
  }
) => {
  if (data.attendees) {
    await prisma.fieldTourAttendee.deleteMany({
      where: { fieldTourId: id, userId: { notIn: data.attendees } },
    });
  }

  return await prisma.fieldTour.update({
    where: { id },
    data: {
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      date: new Date(data?.date),
      responsibleUser: { connect: { id: data.responsibleUserId } },
      fieldTourAttendee: {
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

export const deleteFieldTour = async (id: number) => {
  return await prisma.fieldTour.delete({
    where: { id },
  });
};

export const setAttendance = async (
  fieldTourId: number,
  userId: number,
  attended: boolean
) => {
  return await prisma.fieldTourAttendee.update({
    where: { fieldTourId_userId: { fieldTourId, userId } },
    data: { attended },
  });
};
