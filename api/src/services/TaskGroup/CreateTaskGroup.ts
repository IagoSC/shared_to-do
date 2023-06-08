import { Repository } from "typeorm";
import { TaskGroup } from "../../database/entities/TaskGroup.entity";
import { User } from "../../database/entities/User.entity";

export interface CreateTaskGroupDTO {
  name: string;
  users: User[];
  isDefault?: boolean;
  description: string;
}

export class CreateTaskGroupService {
  constructor(private taskGroupRepository: Repository<TaskGroup>) {}

  async execute({
    name,
    users,
    isDefault,
    description,
  }: CreateTaskGroupDTO): Promise<TaskGroup> {
    const taskGroup = new TaskGroup({ name, description, isDefault, users });
    const result = await this.taskGroupRepository.save(taskGroup);
    return taskGroup;
  }
}
