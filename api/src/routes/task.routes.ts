import { Router } from "express";
import { TaskController } from "../controllers/Task.controller";

export const TaskRouter = Router();

TaskRouter.get("/:id", TaskController.getById);
TaskRouter.post("/", TaskController.create);
TaskRouter.delete("/:id", TaskController.delete);
TaskRouter.put("/:id", TaskController.setCompletion);
TaskRouter.patch("/:id", TaskController.update);