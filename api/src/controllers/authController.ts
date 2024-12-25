import { Request, Response } from "express";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { env } from "process";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const privateKey = fs.readFileSync("/path/to/private.key", "utf8");

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate jwt token
    const token = jwt.sign({ id: user.id }, privateKey);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return 0;
};
