import { Repository } from "typeorm";
import { User } from "../../database/entities/User.entity";
import { AppError } from "../../utils/appError";
import { TaskGroup } from "../../database/entities/TaskGroup.entity";

export interface UserDefaultGroupDTO {
  userId: string;
}

export class GetUserDefaultGroupService {
  constructor(private userRepository: Repository<User>) {}

  async execute({ userId }: UserDefaultGroupDTO): Promise<TaskGroup> {
    console.log("Get Groups for user", userId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["taskGroups"],
    });

    if (!user) throw new AppError(`User not found for id: ${userId}`, 404);

    const defaultTaskGroup = user.taskGroups?.find((tg) => tg.isDefault);
    if (!defaultTaskGroup) throw new AppError(`User has no default taskGroup`);

    return defaultTaskGroup;
  }
}
