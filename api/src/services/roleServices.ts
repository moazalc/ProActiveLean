import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRoles = async () => {
  return await prisma.role.findMany({
    include: {
      users: true,
    },
  });
};

export const getRoleById = async (id: number) => {
  return await prisma.role.findUnique({
    where: {
      id: id,
    },
    include: {
      users: true,
    },
  });
};

export const createRole = async (role: {
  name: string;
  isAdmin: boolean;
  isAuditor: boolean;
  canAnswer: boolean;
}) => {
  return await prisma.role.create({
    data: role,
  });
};

export const updateRole = async (
  id: number,
  role: {
    name?: string;
    isAdmin?: boolean;
    isAuditor?: boolean;
    canAnswer?: boolean;
  }
) => {
  return await prisma.role.update({
    where: {
      id: id,
    },
    data: role,
  });
};

export const deleteRole = async (id: number) => {
  return await prisma.role.delete({
    where: {
      id: id,
    },
  });
};
