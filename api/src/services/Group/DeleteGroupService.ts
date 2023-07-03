import { Group } from "../../database/entities/Group.entity";
import { UserGroup } from "../../database/entities/UserGroup.entity";
import { Repository, In, DeleteResult } from "typeorm";

export interface DeleteGroupServiceDTO {
  groupId: string;
}

export class DeleteGroupService {
  constructor(
    private groupRepository: Repository<Group>,
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async execute({ groupId }: DeleteGroupServiceDTO): Promise<DeleteResult> {
    await this.userGroupRepository.delete({ groupId: groupId });
    return this.groupRepository.delete({ id: groupId });
  }
}
