import { Router } from "express";
import { TaskController } from "../controllers/Task.controller";

export const TaskRouter = Router();

TaskRouter.get("/", TaskController.getAll);
TaskRouter.post("/", TaskController.create);
TaskRouter.delete("/:id", TaskController.delete);
TaskRouter.patch("/:id", TaskController.update);