import { Repository } from "typeorm";
import { User } from "../../database/entities/User.entity";
import { AppError } from "../../utils/appError";
import { Group } from "../../database/entities/Group.entity";

export interface UserDefaultGroupDTO {
  userId: string;
}

export class GetUserDefaultGroupService {
  constructor(private userRepository: Repository<User>) {}

  async execute({ userId }: UserDefaultGroupDTO): Promise<Group> {
    console.log("Get Groups for user", userId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["groups"],
    });

    if (!user) throw new AppError(`User not found for id: ${userId}`, 404);

    const defaultGroup = user.groups?.find((tg) => tg.isDefault);
    if (!defaultGroup) throw new AppError(`User has no default group`);

    return defaultGroup;
  }
}
