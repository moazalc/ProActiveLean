import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getChecklistCategories = async () => {
  return await prisma.checklistCategory.findMany({
    include: { checklistQuestion: true, locationCategory: true },
  });
};

export const getChecklistCategoryById = async (id: number) => {
  return await prisma.checklistCategory.findUnique({
    where: { id },
    include: { checklistQuestion: true },
  });
};

export const createChecklistCategory = async (
  name: string,
  locationCategoryId: number,
  questions: { question: string }[],
  userId: number
) => {
  // Create the checklist category
  const category = await prisma.checklistCategory.create({
    data: {
      name,
      locationCategory: {
        connect: { id: locationCategoryId },
      },
    },
  });

  // Create checklist questions with the appropriate relation to user
  const questionPromises = questions.map((q) =>
    prisma.checklistQuestion.create({
      data: {
        question: q.question,
        checklistCategory: {
          connect: { id: category.id },
        },
        createBy: { connect: { id: userId } },
      },
    })
  );

  // Wait for all questions to be created
  await Promise.all(questionPromises);

  return category;
};

export const updateChecklistCategory = async (
  id: number,
  name: string,
  locationCategoryId: number,
  questions: { id: number; question: string }[],
  userId: number
) => {
  return await prisma.checklistCategory.update({
    where: { id },
    data: {
      name,
      locationCategory: {
        connect: { id: locationCategoryId },
      },
      checklistQuestion: {
        upsert: questions.map((question) => ({
          where: { id: question.id || 0 }, // Use 0 or another non-existing ID for new questions
          update: { question: question.question, createdBy: userId },
          create: { question: question.question, createdBy: userId },
        })),
      },
    },
  });
};

export const deleteChecklistCategory = async (id: number) => {
  try {
    await prisma.checklistQuestion.deleteMany({
      where: { checklistCategory: { id } },
    });
  } catch (e) {
    console.log(e);
  }
  return await prisma.checklistCategory.delete({
    where: { id },
  });
};

export const getChecklistCategoryByLocationCategoryId = async (
  locationCategoryId: number
) => {
  return await prisma.checklistCategory.findMany({
    where: { locationCategoryId },
    include: { checklistQuestion: true },
  });
};
