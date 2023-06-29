import { NextFunction, Request, Response } from "express";
import { User } from "../database/entities/User.entity";
import { dataSource } from "../database";
import { CreateUserService } from "../services/User/CreateUser";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";

const userRepository = dataSource.getRepository(User);
const groupRepository = dataSource.getRepository(Group);

export const UserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
        const userResult = await new CreateUserService(userRepository).execute(
          user
        );

        const groupResult = await new CreateGroupService(
          groupRepository
        ).execute({
          name: "My tasks",
          description: "My personal group of tasks",
          users: [userResult],
          isDefault: true,
        });

        res.status(201).send({ user: userResult, group: groupResult });
    } catch (err) {
      next(err);
    }
  },
};
