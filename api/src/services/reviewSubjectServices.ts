import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReviewSubject = async (data: {
  name: string;
  relatedPlaceId: number;
  createdBy: number;
}) => {
  return await prisma.reviewSubject.create({
    data: {
      name: data.name,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      createBy: { connect: { id: data.createdBy } },
    },
  });
};

export const getReviewSubjectsByPlaceId = async (locationId: number) => {
  return await prisma.reviewSubject.findMany({
    where: { relatedPlaceId: locationId },
  });
};

export const getReviewSubjectById = async (id: number) => {
  return await prisma.reviewSubject.findUnique({
    where: { id },
  });
};

export const updateReviewSubject = async (
  id: number,
  data: {
    name?: string;
    relatedPlaceId?: number;
  }
) => {
  return await prisma.reviewSubject.update({
    where: { id },
    data: {
      name: data.name,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
    },
  });
};

export const deleteReviewSubject = async (id: number) => {
  return await prisma.reviewSubject.delete({
    where: { id },
  });
};

export const getReviewSubjects = async () => {
  return await prisma.reviewSubject.findMany({
    include: {
      relatedPlace: true,
      createBy: true,
    },
  });
};
