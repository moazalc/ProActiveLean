import { fiveSCategory, hseCategory, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createActivity = async (data: {
  fiveSCategory?: fiveSCategory;
  hseCategory?: hseCategory;
  auditDate: Date;
  completionDate?: Date;
  relatedPlaceId: number;
  responsibleUserId: number;
  appointedUserId: number;
}) => {
  return await prisma.activity.create({
    data: {
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      auditDate: data.auditDate,
      completionDate: data.completionDate,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      responsibleUser: { connect: { id: data.responsibleUserId } },
      appointedUser: { connect: { id: data.appointedUserId } },
    },
  });
};

export const getActivities = async () => {
  return await prisma.activity.findMany();
};

export const getActivityById = async (id: number) => {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      responsibleUser: true,
      appointedUser: true,
      relatedPlace: true,
      answer: true,
    },
  });
};

export const updateActivity = async (
  id: number,
  data: {
    fiveSCategory?: fiveSCategory;
    hseCategory?: hseCategory;
    auditDate: Date;
    completionDate?: Date;
    relatedPlaceId: number;
    responsibleUserId: number;
    appointedUserId: number;
  }
) => {
  return await prisma.activity.update({
    where: {
      id,
    },
    data: {
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      auditDate: data.auditDate,
      completionDate: data.completionDate,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      responsibleUser: { connect: { id: data.responsibleUserId } },
      appointedUser: { connect: { id: data.appointedUserId } },
    },
  });
};

export const deleteActivity = async (id: number) => {
  return await prisma.activity.delete({
    where: {
      id,
    },
  });
};
