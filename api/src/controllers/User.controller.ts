import { NextFunction, Request, Response } from "express";
import { User } from "../database/entities/User.entity";
import { dataSource } from "../database";
import { CreateUserService } from "../services/User/CreateUser";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";
import { UserGroup } from "../database/entities/UserGroup.entity";
import { FindUsersByEmailService } from "../services/User/FindUsersByEmailService";
import { AppError } from "../utils/appError";

const userRepository = dataSource.getRepository(User);
const groupRepository = dataSource.getRepository(Group);
const userGroupRepository = dataSource.getRepository(UserGroup);

export const UserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
      const userResult = await new CreateUserService(userRepository).execute(
        user
      );

      await new CreateGroupService(
        groupRepository,
        userGroupRepository
      ).execute({
        name: "My tasks",
        description: "My personal group of tasks",
        usersIds: [userResult.id],
        isDefault: true,
      });

      res.status(201).send({ user: userResult });
    } catch (err) {
      next(err);
    }
  },
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      const user = await new FindUsersByEmailService(userRepository).execute({
        users: [email],
      });
      if (!user || !user.length) throw new AppError("User not found", 404);
      res.status(200).send({ user: user[0] });
    } catch (err) {
      next(err);
    }
  },
};
