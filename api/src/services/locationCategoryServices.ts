import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLocationCategories = async () => {
  return await prisma.locationCategory.findMany({
    include: {
      subCategories: true,
      parent: true,
    },
  });
};

export const getLocationCategoryById = async (id: number) => {
  return await prisma.locationCategory.findUnique({
    where: {
      id,
    },
    include: {
      subCategories: true,
      parent: true,
    },
  });
};

export const createLocationCategory = async (
  name: string,
  parentId?: number
) => {
  return await prisma.locationCategory.create({
    data: {
      name,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
  });
};

export const updateLocationCategory = async (
  id: number,
  name: string,
  parentId?: number
) => {
  return await prisma.locationCategory.update({
    where: { id },
    data: {
      name,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
  });
};

export const deleteLocationCategory = async (id: number) => {
  return await prisma.locationCategory.delete({
    where: { id },
  });
};
