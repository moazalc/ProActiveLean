import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

export const createUser = async (data: {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roleId: number;
  avatar?: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  return await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: {
        connect: { id: data.roleId },
      },
      avatar: data.avatar,
      createdAt: new Date(),
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      role: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (
  id: number,
  data: Partial<{
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    roleId: number;
    avatar?: string;
    lastLogin?: Date;
  }>
) => {
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  }
  return await prisma.user.update({
    where: { id },
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: {
        connect: { id: data.roleId },
      },
      avatar: data.avatar,
      lastLogin: data.lastLogin,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
