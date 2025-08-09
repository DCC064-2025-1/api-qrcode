import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import qrcode from "qrcode";

export async function helloWorld(req: Request, res: Response) {
  try {
    const code = "Hello World!";

    try {
      const qrcodeUrl = await qrcode.toDataURL(code, {
        errorCorrectionLevel: "H",
        type: "image/png",
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      res.status(200).json({ qrcodeUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to generate QR code" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}