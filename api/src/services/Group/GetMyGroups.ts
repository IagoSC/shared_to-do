import { Repository, In } from "typeorm";
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

    return await this.groupRepository
      .createQueryBuilder("g")
      .leftJoinAndMapMany("g.tasks", "tasks", "t", "t.group_id = g.id")
      .where({ id: In(userGroups.map((el) => el.groupId)) })
      .getMany();
  }
}
