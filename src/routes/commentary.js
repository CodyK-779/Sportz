import { Router } from "express";
import { commentaryController } from "../controllers/commentaryController.js";

export const commentaryRouter = Router({ mergeParams: true });

commentaryRouter.get("/", commentaryController.getMatchCommentary);

commentaryRouter.post("/", commentaryController.createCommentary);