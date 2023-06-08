import { NextFunction, Request, Response } from "express";
import { User } from "../database/entities/User.entity";
import { dataSource } from "../database";
import { CreateUserService } from "../services/User/CreateUser";
import { TaskGroup } from "../database/entities/TaskGroup.entity";
import { CreateTaskGroupService } from "../services/TaskGroup/CreateTaskGroup";

const userRepository = dataSource.getRepository(User);
const taskGroupRepository = dataSource.getRepository(TaskGroup);

export const UserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
        const userResult = await new CreateUserService(userRepository).execute(
          user
        );

        const taskGroupResult = await new CreateTaskGroupService(
          taskGroupRepository
        ).execute({
          name: "My tasks",
          description: "My personal group of tasks",
          users: [userResult],
          isDefault: true,
        });

      res.status(201).send({ user: userResult, taskGroup: taskGroupResult });
    } catch (err) {
      next(err);
    }
  },
};
