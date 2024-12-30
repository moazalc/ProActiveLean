import {
  PrismaClient,
  requestCategory,
  requestStatus,
  fiveSCategory,
  hseCategory,
} from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createRequest = async (data: {
  category: requestCategory;
  status: requestStatus;
  relatedPlaceId: number;
  createdDate: Date;
  dateToBeCompleted: Date;
  requestUserId: number;
  imgBefore?: string;
  requestDescription: string;
  question?: string;
  request?: string;
  extensionDateRequest?: Date;
  completionDate?: Date;
  actionTaken?: string;
  actionUserId?: number;
  imgAfter?: string;
}) => {
  return await prisma.request.create({
    data: {
      category: data.category,
      status: data.status,
      relatedPlace: { connect: { id: data.relatedPlaceId } },
      requestUser: { connect: { id: data.requestUserId } },
      actionUser: { connect: { id: data.actionUserId } },
      createdDate: data.createdDate,
      dateToBeCompleted: data.dateToBeCompleted,
      imgBefore: data.imgBefore,
      requestDescription: data.requestDescription,
      question: data.question,
      request: data.request,
      extensionDateRequest: data.extensionDateRequest,
      completionDate: data.completionDate,
      actionTaken: data.actionTaken,
      imgAfter: data.imgAfter,
    },
    include: {
      actionUser: true,
      requestUser: true,
      relatedPlace: true,
    },
  });
};

export const getAllRequests = async () => {
  return await prisma.request.findMany({
    include: {
      actionUser: true,
      requestUser: true,
      relatedPlace: true,
    },
  });
};

export const getRequestById = async (id: number) => {
  return await prisma.request.findUnique({
    where: {
      id,
    },
    include: {
      actionUser: true,
      requestUser: true,
      relatedPlace: true,
    },
  });
};

export const updateRequest = async (
  id: number,
  data: {
    category?: requestCategory;
    status?: requestStatus;
    relatedPlaceId?: number;
    createdDate?: Date;
    dateToBeCompleted?: Date;
    requestUserId?: number;
    imgBefore?: string;
    requestDescription?: string;
    question?: string;
    request?: string;
    extensionDateRequest?: Date;
    completionDate?: Date;
    actionTaken?: string;
    actionUserId?: number;
    imgAfter?: string;
  }
) => {
  return await prisma.request.update({
    where: {
      id,
    },
    data: {
      category: data.category,
      status: data.status,
      relatedPlace: data.relatedPlaceId
        ? { connect: { id: data.relatedPlaceId } }
        : undefined,
      requestUser: data.requestUserId
        ? { connect: { id: data.requestUserId } }
        : undefined,
      actionUser: data.actionUserId
        ? { connect: { id: data.actionUserId } }
        : undefined,
      createdDate: data.createdDate,
      dateToBeCompleted: data.dateToBeCompleted,
      imgBefore: data.imgBefore,
      requestDescription: data.requestDescription,
      question: data.question,
      request: data.request,
      extensionDateRequest: data.extensionDateRequest,
      completionDate: data.completionDate,
      actionTaken: data.actionTaken,
      imgAfter: data.imgAfter,
    },
    include: {
      actionUser: true,
      requestUser: true,
      relatedPlace: true,
    },
  });
};

export const deleteRequest = async (id: number) => {
  return await prisma.request.delete({
    where: {
      id,
    },
  });
};
