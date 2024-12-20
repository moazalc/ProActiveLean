import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAnswer = async (data: {
  questionId: number;
  answer: boolean;
  answeredByUserId: number;
  activityId: number;
}) => {
  return await prisma.answer.create({
    data: {
      answer: data.answer,
      question: { connect: { id: data.questionId } },
      answeredBy: { connect: { id: data.answeredByUserId } },
      activity: { connect: { id: data.activityId } },
    },
  });
};

export const getAnswerById = async (id: number) => {
  return await prisma.answer.findUnique({
    where: { id },
  });
};

export const updateAnswer = async (id: number, data: { answer?: boolean }) => {
  return await prisma.answer.update({
    where: { id },
    data: {
      answer: data.answer,
    },
  });
};

export const deleteAnswer = async (id: number) => {
  return await prisma.answer.delete({
    where: { id },
  });
};
