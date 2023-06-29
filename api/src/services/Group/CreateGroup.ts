import { Repository } from "typeorm";
import { Group } from "../../database/entities/Group.entity";
import { User } from "../../database/entities/User.entity";

export interface CreateGroupDTO {
  name: string;
  users: User[];
  isDefault?: boolean;
  description: string;
}

export class CreateGroupService {
  constructor(private groupRepository: Repository<Group>) {}

  async execute({
    name,
    users,
    isDefault,
    description,
  }: CreateGroupDTO): Promise<Group> {
    const result = await this.groupRepository.save(group);
    return group;
  }
}
