import { Router } from "express";
import { helloWorld } from "../controllers/user.controller.js";

const routes = Router();

routes.get("/hello", helloWorld);

export default routes;