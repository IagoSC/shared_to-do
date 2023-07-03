import { Repository, In } from "typeorm";
import { Group } from "../../database/entities/Group.entity";
import { UserGroup } from "../../database/entities/UserGroup.entity";
import { AppError } from "../../utils/appError";

export interface GetMyGroupsDTO {
  userId: string;
}

export class GetMyGroupsService {
  constructor(
    private groupRepository: Repository<Group>,
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async execute({ userId }: GetMyGroupsDTO): Promise<Group[]> {
    if (!userId) {
      throw new AppError("No user", 401);
    }

    const userGroups = await this.userGroupRepository.findBy({ userId });

    return await this.groupRepository
      .createQueryBuilder("g")
      .leftJoinAndMapMany("g.tasks", "tasks", "t", "t.group_id = g.id")
      .where({ id: In(userGroups.map((el) => el.groupId)) })
      .getMany();
  }
}
