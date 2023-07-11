import { QueryBuilder, Repository } from "typeorm";
import { Group } from "../../database/entities/Group.entity";
import { UserGroup } from "../../database/entities/UserGroup.entity";
import { AppError } from "../../utils/appError";

export interface UpdateGroupDTO {
  groupId: string;
  name: string;
  usersIds: string[];
  description: string;
}

export class UpdateGroupService {
  constructor(
    private groupRepository: Repository<Group>,
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async execute({
    groupId,
    name,
    usersIds,
    description,
  }: UpdateGroupDTO): Promise<Group> {
    const group = await this.groupRepository.findOneBy({ id: groupId });

    if (!group || !groupId) throw new AppError("Group doesn't exist");

    const newUserGroups = usersIds.map((userId) => {
      const newUserGroup = new UserGroup({ userId, groupId: group.id });
      console.log("BBBBB");
      return this.userGroupRepository.upsert(newUserGroup, [
        "userId",
        "groupId",
      ]);
    });
    await Promise.all(newUserGroups);
    console.log("CCC");

    group.name = name;
    group.description = description;

    this.groupRepository.save(group);

    return group;
  }
}
