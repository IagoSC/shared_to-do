import { Repository } from "typeorm";
import { Group } from "../../database/entities/Group.entity";
import { UserGroup } from "../../database/entities/UserGroup.entity";

export interface GetMyGroupsDTO {
  userId: string;
}

export class GetMyGroupsService {
  constructor(
    private groupRepository: Repository<Group>,
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async execute({ userId }: GetMyGroupsDTO): Promise<Group[]> {
    const userGroups = await this.userGroupRepository.findBy({ userId });

    const myGroups = await this.groupRepository.query(`
        SELECT * FROM groups WHERE groups.id IN (${userGroups.map(
          (el) => `'${el.groupId}'`
        )})
    `);

    return myGroups;
  }
}
