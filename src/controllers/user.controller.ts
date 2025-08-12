import type { Request, Response } from "express";
import qrcode from "qrcode";
import { randomBytes } from "crypto";
import { prisma } from "../lib/prisma.js";

// "Banco" temporário de tokens em memória
const attendanceTokens = new Map<string, { courseId: string; expiresAt: Date }>();

export async function generateAttendanceQR(req: Request, res: Response) {
  try {
    const { matricula, password, courseId } = req.body;

    if (!matricula || !password || !courseId) {
      return res.status(400).json({ error: "matricula, password e courseId são obrigatórios" });
    }

    // Validação login professor
    const user = await prisma.user.findUnique({ where: { matricula } });
    if (!user || user.password !== password || user.role !== "TEACHER") {
     return res.status(401).json({ error: "Credenciais inválidas ou usuário não é professor" });
    }

    // Gera token único
    const token = randomBytes(8).toString("hex");
    console.log(token);
    // Define expiração (5 minutos)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Armazena token na memória
    attendanceTokens.set(token, { courseId, expiresAt });

    // Gera QR Code
    const qrcodeUrl = await qrcode.toDataURL(token, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return res.status(200).json({ qrcodeUrl, expiresAt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao gerar QR Code" });
  }
}

export async function registerAttendance(req: Request, res: Response) {
  try {
    const { token, studentId } = req.body;
    if (!token || !studentId) {
      return res.status(400).json({ error: "token e studentId são obrigatórios" });
    }

    // Recupera dados do token
    const tokenData = attendanceTokens.get(token);
    if (!tokenData) {
      return res.status(404).json({ error: "Token inválido" });
    }

    // Verifica se expirou
    if (new Date() > tokenData.expiresAt) {
      attendanceTokens.delete(token);
      return res.status(410).json({ error: "Token expirado" });
    }

    // Registra no banco
    await prisma.attendance.create({
      data: {
        studentId,
        courseId: tokenData.courseId,
      },
    });

    return res.status(201).json({ message: "Presença registrada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar presença" });
  }
}