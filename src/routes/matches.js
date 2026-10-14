import { Router } from "express";
import { matchController } from "../controllers/matchController.js";

export const matchRouter = Router();

matchRouter.get("/", matchController.getMatches);

matchRouter.post("/", matchController.createMatches);