import {
  findingCategory,
  findingStatus,
  fiveSCategory,
  hseCategory,
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();

export const createFinding = async (data: {
  category: findingCategory;
  fiveSCategory?: fiveSCategory;
  hseCategory?: hseCategory;
  workshopId?: number;
  answerId?: number;
  fieldTourId?: number;
  checklistAnswerId?: number;
  status: findingStatus;
  relatedPlaceId: number;
  createdDate: Date;
  dateToBeCompleted: Date;
  findingUserId: number;
  imgBefore?: string;
  findingDescription: string;
  question?: string;
  finding?: string;
  completionDate?: Date;
  actionTaken?: string;
  actionUserId?: number;
  imgAfter?: string;
}) => {
  return await prisma.finding.create({
    data: {
      category: data.category,
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      workshop: data.workshopId
        ? { connect: { id: data.workshopId } }
        : undefined,
      answer: data.answerId ? { connect: { id: data.answerId } } : undefined,
      fieldTour: data.fieldTourId
        ? { connect: { id: data.fieldTourId } }
        : undefined,
      checklistAnswer: data.checklistAnswerId
        ? { connect: { id: data.checklistAnswerId } }
        : undefined,
      status: data.status,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      createdDate: new Date(data.createdDate),
      dateToBeCompleted: new Date(data.dateToBeCompleted),
      findingUser: { connect: { id: data.findingUserId } },
      imgBefore: data.imgBefore,
      findingDescription: data.findingDescription,
      question: data.question,
      finding: data.finding,
      completionDate: data.completionDate
        ? new Date(data.completionDate)
        : undefined,
      actionTaken: data.actionTaken,
      actionUser: data.actionUserId
        ? { connect: { id: data.actionUserId } }
        : undefined,
      imgAfter: data.imgAfter,
    },
  });
};

export const getFindings = async () => {
  return await prisma.finding.findMany();
};

export const getFindingById = async (id: number) => {
  return await prisma.finding.findUnique({
    where: {
      id: id,
    },
  });
};

export const updateFinding = async (
  id: number,
  data: {
    category: findingCategory;
    fiveSCategory?: fiveSCategory;
    hseCategory?: hseCategory;
    workshopId?: number;
    answerId?: number;
    fieldTourId?: number;
    checklistAnswerId?: number;
    status: findingStatus;
    relatedPlaceId: number;
    createdDate: Date;
    dateToBeCompleted: Date;
    findingUserId: number;
    imgBefore?: string;
    findingDescription: string;
    question?: string;
    finding?: string;
    completionDate?: Date;
    actionTaken?: string;
    actionUserId?: number;
    imgAfter?: string;
  }
) => {
  return await prisma.finding.update({
    where: {
      id: id,
    },
    data: {
      category: data.category,
      fiveSCategory: data.fiveSCategory,
      hseCategory: data.hseCategory,
      workshop: data.workshopId
        ? { connect: { id: data.workshopId } }
        : undefined,
      answer: data.answerId ? { connect: { id: data.answerId } } : undefined,
      fieldTour: data.fieldTourId
        ? { connect: { id: data.fieldTourId } }
        : undefined,
      checklistAnswer: data.checklistAnswerId
        ? { connect: { id: data.checklistAnswerId } }
        : undefined,
      status: data.status,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      createdDate: new Date(data.createdDate),
      dateToBeCompleted: new Date(data.dateToBeCompleted),
      findingUser: { connect: { id: data.findingUserId } },
      imgBefore: data.imgBefore,
      findingDescription: data.findingDescription,
      question: data.question,
      finding: data.finding,
      completionDate: data.completionDate
        ? new Date(data.completionDate)
        : undefined,
      actionTaken: data.actionTaken,
      actionUser: data.actionUserId
        ? { connect: { id: data.actionUserId } }
        : undefined,
      imgAfter: data.imgAfter,
    },
  });
};

export const deleteFinding = async (id: number) => {
  return await prisma.finding.delete({
    where: {
      id: id,
    },
  });
};
