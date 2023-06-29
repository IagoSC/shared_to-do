import { NextFunction, Request, Response } from "express";
import { dataSource } from "../database";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";

const groupRepository = dataSource.getRepository(Group);

export const GroupController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, group } = req.body;
    try {
      const groupResult = await new CreateGroupService(groupRepository).execute(
        {
          name: "My tasks",
          description: "My personal group of tasks",
          users: [userId],
          isDefault: true,
        }
      );

      res.status(201).send({ group: groupResult });
    } catch (err) {
      next(err);
    }
  },
};
