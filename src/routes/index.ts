import { Router } from "express";
import { generateAttendanceQR, helloWorld, registerAttendance } from "../controllers/user.controller.js";

const routes = Router();

routes.post("/qr", generateAttendanceQR);
routes.post("/register", registerAttendance);

export default routes;