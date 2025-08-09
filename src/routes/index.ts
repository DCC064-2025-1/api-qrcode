import { Router } from "express";
import { helloWorld } from "../controllers/user.controller.js";

const routes = Router();

routes.post("/qr", helloWorld);

export default routes;