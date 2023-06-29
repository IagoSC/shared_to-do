import { Repository } from "typeorm";
import { Group } from "../../database/entities/Group.entity";
import { User } from "../../database/entities/User.entity";
import { UserGroup } from "../../database/entities/UserGroup.entity";

export interface CreateGroupDTO {
  name: string;
  usersIds: string[];
  isDefault?: boolean;
  description: string;
}

export class CreateGroupService {
  constructor(
    private groupRepository: Repository<Group>,
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async execute({
    name,
    usersIds,
    isDefault,
    description,
  }: CreateGroupDTO): Promise<Group> {
    const newGroup = new Group({ name, description, isDefault });

    await this.groupRepository.save(newGroup);

    const newUserGroups = usersIds.map((userId) => {
      const newUserGroup = new UserGroup({ userId, groupId: newGroup.id });
      return this.userGroupRepository.save(newUserGroup);
    });
    await Promise.all(newUserGroups);

    return newGroup;
  }
}
