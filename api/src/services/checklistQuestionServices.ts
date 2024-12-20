import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getChecklistQuestions = async () => {
  return await prisma.checklistQuestion.findMany({
    include: {
      answers: true,
      createBy: true,
      updateBy: true,
      checklistCategory: true,
    },
  });
};

export const getChecklistQuestionById = async (id: number) => {
  return await prisma.checklistQuestion.findUnique({
    where: {
      id: id,
    },
    include: {
      answers: true,
      createBy: true,
      updateBy: true,
      checklistCategory: true,
    },
  });
};

export const createChecklistQuestion = async (data: {
  question: string;
  checklistCategoryId: number;
  createdBy: number;
}) => {
  return await prisma.checklistQuestion.create({
    data: {
      question: data.question,
      createdBy: data.createdBy,
      checklistCategoryId: data.checklistCategoryId,
    },
  });
};

export const updateChecklistQuestion = async (
  id: number,
  data: {
    question: string;
    checklistCategoryId: number;
    updatedBy: number;
  }
) => {
  return await prisma.checklistQuestion.update({
    where: {
      id: id,
    },
    data: {
      question: data.question,
      updatedBy: data.updatedBy,
      checklistCategoryId: data.checklistCategoryId,
    },
  });
};

export const deleteChecklistQuestion = async (id: number) => {
  return await prisma.checklistQuestion.delete({
    where: {
      id: id,
    },
  });
};
