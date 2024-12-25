import { PrismaClient, checklistAssignmentType } from "@prisma/client";
const prisma = new PrismaClient();

export const createChecklistAssignment = async (data: {
  createdByUserId: number;
  appointedUserId: number;
  type: checklistAssignmentType;
  locationCategoryId: number;
  dateDue: Date;
}) => {
  return await prisma.checklistAssignment.create({
    data: {
      type: data.type,
      userBy: { connect: { id: data.createdByUserId } },
      user: { connect: { id: data.appointedUserId } },
      locationCategory: { connect: { id: data.locationCategoryId } },
      dateDue: data.dateDue,
      status: false,
    },
  });
};

export const getChecklistAssignments = async () => {
  return await prisma.checklistAssignment.findMany({
    include: {
      userBy: true,
      user: true,
      locationCategory: true,
      checklistActivity: {
        include: {
          checklistAnswer: {
            include: {
              question: true,
            },
          },
        },
      },
    },
  });
};

export const getChecklistAssignmentById = async (id: number) => {
  return await prisma.checklistAssignment.findUnique({
    where: { id },
  });
};

export const updateChecklistAssignment = async (
  id: number,
  data: {
    createdByUserId?: number;
    appointedUserId?: number;
    type?: checklistAssignmentType;
    locationCategoryId?: number;
    dateDue?: Date;
    status?: boolean;
  }
) => {
  return await prisma.checklistAssignment.update({
    where: { id },
    data: {
      type: data.type,
      userBy: data.createdByUserId
        ? { connect: { id: data.createdByUserId } }
        : undefined,
      user: data.appointedUserId
        ? { connect: { id: data.appointedUserId } }
        : undefined,
      locationCategory: data.locationCategoryId
        ? { connect: { id: data.locationCategoryId } }
        : undefined,
      dateDue: data.dateDue,
      status: data.status,
    },
  });
};

export const deleteChecklistAssignment = async (id: number) => {
  return await prisma.checklistAssignment.delete({
    where: { id },
  });
};
