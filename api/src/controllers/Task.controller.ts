import { NextFunction, Request, Response } from "express";
import { Task } from "../database/entities/Task.entity";
import { dataSource } from "../database";
import { GetAllTasksService } from "../services/Task/GetAllTasks";
import { CreateTaskService } from "../services/Task/CreateTask";
import { DeleteTaskService } from "../services/Task/DeleteTask";
import { UpdateTaskService } from "../services/Task/UpdateTask";
import { User } from "../database/entities/User.entity";
import { GetUserDefaultGroupService } from "../services/User/GetUserDefaultGroupService";

const taskRepository = dataSource.getRepository(Task);
const userRepository = dataSource.getRepository(User);

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
    const { task, userId } = req.body;
    try {
      if (!task.groupId) {
        const { id: defaultTaskGroupId } = await new GetUserDefaultGroupService(
          userRepository
        ).execute({ userId });

        task.groupId = defaultTaskGroupId;
      }
      const taskResult = await new CreateTaskService(taskRepository).execute(
        task
      );
      res.status(201).send(taskResult);
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
