import { NextFunction, Request, Response } from "express";
import { Task } from "../database/entities/Task.entity";
import { dataSource } from "../database";
import { GetAllTasksService } from "../services/GetAllTasksService";
import { CreateTaskService } from "../services/CreateTaskService";
import { DeleteTaskService } from "../services/DeleteTaskService";
import { UpdateTaskService } from "../services/UpdateTaskService";

const taskRepository = dataSource.getRepository(Task);

export const TaskController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await new GetAllTasksService(taskRepository).execute();
      res.status(200).send(tasks);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { task } = req.body;
    try {
      const tasks = await new CreateTaskService(taskRepository).execute(task);
      res.status(201).send(tasks);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    try {
      const task = await new DeleteTaskService(taskRepository).execute({ id });
      res.status(200).send(task);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
      const result = await new UpdateTaskService(taskRepository).execute({
        id,
        ...task,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
