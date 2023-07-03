import { NextFunction, Request, Response } from "express";
import { dataSource } from "../database";
import { Group } from "../database/entities/Group.entity";
import { CreateGroupService } from "../services/Group/CreateGroup";
import { UserGroup } from "../database/entities/UserGroup.entity";
import { GetMyGroupsService } from "../services/Group/GetMyGroups";
import { User } from "../database/entities/User.entity";
import { FindUsersByEmailService } from "../services/User/FindUsersByEmailService";
import { DeleteGroupService } from "../services/Group/DeleteGroupService";

const groupRepository = dataSource.getRepository(Group);
const userGroupRepository = dataSource.getRepository(UserGroup);
const userRepository = dataSource.getRepository(User);

export const GroupController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: userId } = req.headers;
    const { group, users } = req.body;
    try {
      const selectedUsers = await new FindUsersByEmailService(
        userRepository
      ).execute({
        users,
      });

      console.log(selectedUsers);

      const groupResult = await new CreateGroupService(
        groupRepository,
        userGroupRepository
      ).execute({
        name: group.name,
        description: group.description,
        usersIds: [userId as string, ...selectedUsers.map((el) => el.id)],
        isDefault: false,
      });

      res.status(201).send({ group: groupResult });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    try {
      await new DeleteGroupService(
        groupRepository,
        userGroupRepository
      ).execute({ groupId });

      return res.status(200).send({ success: true });
    } catch (err) {
      next(err);
    }
  },
  getMyGroups: async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: userId } = req.headers;

    try {
      const myGroups = await new GetMyGroupsService(
        groupRepository,
        userGroupRepository
      ).execute({
        userId: userId as string,
      });
      return res.status(200).send({ groups: myGroups });
    } catch (err) {
      next(err);
    }
  },
};
