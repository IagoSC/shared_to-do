import { NextFunction, Request, Response } from "express";
import { Task } from "../database/entities/Task.entity";
import { dataSource } from "../database";
import { GetTaskByIdService } from "../services/Task/GetTaskById";
import { CreateTaskService } from "../services/Task/CreateTask";
import { DeleteTaskService } from "../services/Task/DeleteTask";
import { UpdateTaskService } from "../services/Task/UpdateTask";
import { User } from "../database/entities/User.entity";
import { GetUserDefaultGroupService } from "../services/User/GetUserDefaultGroupService";
import { SetTaskCompletionService } from "../services/Task/SetTaskCompletion";

const taskRepository = dataSource.getRepository(Task);
const userRepository = dataSource.getRepository(User);

export const TaskController = {
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    try {
      const tasks = await new GetTaskByIdService(taskRepository).execute(
        taskId
      );
      res.status(200).send(tasks);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: userId } = req.headers;

    const { task } = req.body;
    try {
      if (!task.groupId) {
        const { id: defaultGroupId } = await new GetUserDefaultGroupService(
          userRepository
        ).execute({ userId: userId as string });

        task.groupId = defaultGroupId;
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

  setCompletion: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isFinished } = req.body;

    try {
      const result = await new SetTaskCompletionService(taskRepository).execute(
        {
          id,
          isFinished,
        }
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
