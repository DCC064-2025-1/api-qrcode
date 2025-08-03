import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function helloWorld(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "Hello World!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
