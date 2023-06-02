import * as taskController from "../controller/taskController";
import { Router } from "express";

export const TaskRouter = Router();

TaskRouter.get("/", taskController.getAll);
TaskRouter.post("/", taskController.createTask);
TaskRouter.put("/:taskId", taskController.updateTask);
