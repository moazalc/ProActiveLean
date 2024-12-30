import { fiveSCategory, hseCategory, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createQuestion = async (data: {
  is5s: boolean;
  fiveSCategory?: fiveSCategory;
  hseCategory?: hseCategory;
  question: string;
  relatedPlaceId: number;
  parentId?: number;
  createdByUserId: number;
}) => {
  return await prisma.question.create({
    data: {
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      question: data.question,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      parent: data.parentId ? { connect: { id: data.parentId } } : undefined,
      user: { connect: { id: data.createdByUserId } },
    },
  });
};

export const getQuestions = async () => {
  return await prisma.question.findMany({
    include: {
      subQuestions: true,
      relatedPlace: true,
      answers: true,
      user: true,
    },
  });
};

export const getQuestionById = async (id: number) => {
  return await prisma.question.findUnique({
    where: { id },
    include: {
      subQuestions: true,
      relatedPlace: true,
      answers: true,
      user: true,
    },
  });
};

export const updateQuestion = async (
  id: number,
  data: Partial<{
    fiveSCategory?: fiveSCategory;
    hseCategory?: hseCategory;
    question: string;
    relatedPlaceId: number;
    parentId?: number;
    createdByUserId: number;
  }>
) => {
  return await prisma.question.update({
    where: { id },
    data: {
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      question: data.question,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      parent: data.parentId ? { connect: { id: data.parentId } } : undefined,
      user: { connect: { id: data.createdByUserId } },
    },
  });
};

export const deleteQuestion = async (id: number) => {
  return await prisma.question.delete({
    where: { id },
  });
};
