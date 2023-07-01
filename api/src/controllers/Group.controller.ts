import { NextFunction, Request, Response } from "express";
import { dataSource } from "../database";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";
import { UserGroup } from "../database/entities/UserGroup.entity";
import { GetMyGroupsService } from "../services/Group/GetMyGroups";

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
  getMyGroups: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
      const myGroups = await new GetMyGroupsService(
        groupRepository,
        userGroupRepository
      ).execute({
        userId,
      });
      return res.status(200).send({ groups: myGroups });
    } catch (err) {
      next(err);
    }
  },
};
