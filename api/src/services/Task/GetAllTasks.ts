import { Repository } from "typeorm";
import { Task } from "../../database/entities/Task.entity";

export class GetAllTasksService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute(taskId: string): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id: taskId } });
  }
}
