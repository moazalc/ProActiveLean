import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const createChecklistActivity = async (data: {
//   userId: number;
//   locationId: number;
//   assignmentId: number;
// }) => {
//   return await prisma.checklistActivity.create({
//     data: {
//       userId: data.userId,
//       locationId: data.locationId,
//       assignmentId: data.assignmentId,
//     },
//   });
// };
export const createChecklistActivity = async (data: {
  userId: number;
  locationId: number;
  assignmentId: number;
  isCompleted: boolean;
  checklist: {
    categoryId: number;
    questions: {
      questionId: number;
      answer: boolean;
      comment?: string;
      photo?: string;
    }[];
  }[];
}) => {
  let checklistActivity;
  try {
    checklistActivity = await prisma.checklistActivity.create({
      data: {
        user: { connect: { id: data.userId } },
        location: { connect: { id: data.locationId } },
        assignment: { connect: { id: data.assignmentId } },
        completed: data.isCompleted,
      },
    });
    for (const category of data.checklist) {
      for (const question of category.questions) {
        const answer = await prisma.checklistAnswer.create({
          data: {
            activity: { connect: { id: checklistActivity.id } },
            question: { connect: { id: question.questionId } },
            checkbox: question.answer,
            createBy: { connect: { id: data.userId } },
          },
        });
        if (question.comment) {
          await prisma.finding.create({
            data: {
              status: "Open",
              findingDescription: question.comment,
              findingUser: { connect: { id: data.userId } },
              relatedPlace: { connect: { id: data.locationId } },
              category: "Checklist",
              checklistAnswer: { connect: { id: answer.id } },
              dateToBeCompleted: new Date(),
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error creating checklist activity:", error);
    throw error;
  }
  return checklistActivity;
};

export const getChecklistActivityById = async (id: number) => {
  return await prisma.checklistActivity.findUnique({
    where: { id },
    include: {
      user: true,
      location: true,
      assignment: true,
      checklistAnswer: true,
    },
  });
};

export const getChecklistActivities = async () => {
  return await prisma.checklistActivity.findMany({
    include: {
      user: true,
      location: true,
      assignment: true,
      checklistAnswer: true,
    },
  });
};

export const updateChecklistActivity = async (
  id: number,
  data: {
    userId?: number;
    locationId?: number;
    assignmentId?: number;
  }
) => {
  return await prisma.checklistActivity.update({
    where: { id },
    data: {
      userId: data.userId,
      locationId: data.locationId,
      assignmentId: data.assignmentId,
    },
  });
};

export const deleteChecklistActivity = async (id: number) => {
  return await prisma.checklistActivity.delete({
    where: { id },
  });
};
