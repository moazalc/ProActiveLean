import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createChecklistAnswer = async (data: {
  questionId: number;
  checkbox?: boolean;
  createdBy: number;
  activityId: number;
}) => {
  return await prisma.checklistAnswer.create({
    data: {
      question: {
        connect: {
          id: data.questionId,
        },
      },
      createBy: {
        connect: {
          id: data.createdBy,
        },
      },
      activity: {
        connect: {
          id: data.activityId,
        },
      },
      checkbox: data.checkbox,
    },
  });
};

export const getChecklistAnswers = async () => {
  return await prisma.checklistAnswer.findMany({
    include: {
      question: true,
      createBy: true,
      activity: true,
    },
  });
};

export const getChecklistAnswerById = async (id: number) => {
  return await prisma.checklistAnswer.findUnique({
    where: { id },
    include: {
      question: true,
      createBy: true,
      activity: true,
    },
  });
};

export const updateChecklistAnswer = async (
  id: number,
  data: {
    questionId: number;
    checkbox?: boolean;
    activityId: number;
  }
) => {
  return await prisma.checklistAnswer.update({
    where: { id },
    data: {
      checkbox: data.checkbox,
      question: {
        connect: {
          id: data.questionId,
        },
      },
      activity: {
        connect: {
          id: data.activityId,
        },
      },
    },
  });
};

export const deleteChecklistAnswer = async (id: number) => {
  return await prisma.checklistAnswer.delete({
    where: { id },
  });
};
