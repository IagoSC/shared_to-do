import { NextFunction, Request, Response } from "express";
import { dataSource } from "../database";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";
import { UserGroup } from "../database/entities/UserGroup.entity";

const groupRepository = dataSource.getRepository(Group);
const userGroupRepository = dataSource.getRepository(UserGroup);

export const GroupController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, group } = req.body;
    try {
      const groupResult = await new CreateGroupService(
        groupRepository,
        userGroupRepository
      ).execute({
        name: group.name,
        description: group.description,
        usersIds: [userId],
        isDefault: false,
      });

      res.status(201).send({ group: groupResult });
    } catch (err) {
      next(err);
    }
  },
};
