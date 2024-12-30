import { PrismaClient, locationCategory } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllLocations = async () => {
  return await prisma.location.findMany({
    include: {
      finding: true,
      request: true,
      workshop: true,
      activity: true,
      meeting: true,
      question: true,
      review: true,
      reviewSubject: true,
      subLocation: true,
      fieldTour: true,
      responsibleUser: true,
      category: true,
      parent: true,
    },
  });
};

export const getLocationById = async (id: number) => {
  return await prisma.location.findUnique({
    where: { id },
    include: {
      finding: true,
      request: true,
      workshop: true,
      activity: true,
      meeting: true,
      question: true,
      review: true,
      reviewSubject: true,
      subLocation: true,
      fieldTour: true,
      responsibleUser: true,
      category: true,
      parent: true,
    },
  });
};

export const getLocationByCategoryId = async (categoryId: number) => {
  return await prisma.location.findMany({
    where: { categoryId },
    include: {
      finding: true,
      request: true,
      workshop: true,
      activity: true,
      meeting: true,
      question: true,
      review: true,
      reviewSubject: true,
      subLocation: true,
      fieldTour: true,
      responsibleUser: true,
      category: true,
      parent: true,
    },
  });
};

export const createLocation = async (data: {
  categoryId: number;
  parentId?: number;
  code: string;
  name: string;
  auditable: boolean;
  responsibleUserId?: number;
}) => {
  return await prisma.location.create({
    data: {
      category: { connect: { id: data.categoryId } },
      parent: data.parentId ? { connect: { id: data.parentId } } : undefined,
      code: data.code,
      name: data.name,
      auditable: data.auditable,
      responsibleUser: data.responsibleUserId
        ? { connect: { id: data.responsibleUserId } }
        : undefined,
    },
  });
};

export const updateLocation = async (
  id: number,
  data: {
    categoryId: number;
    parentId?: number;
    code: string;
    name: string;
    auditable: boolean;
    responsibleUserId?: number;
  }
) => {
  return await prisma.location.update({
    where: { id },
    data: {
      parent: { connect: { id: data.parentId } },
      code: data.code,
      name: data.name,
      auditable: data.auditable,
      category: { connect: { id: data.categoryId } },
      responsibleUser: {
        connect: { id: data?.responsibleUserId },
      },
    },
  });
};

export const deleteLocation = async (id: number) => {
  return await prisma.location.delete({
    where: { id },
  });
};
