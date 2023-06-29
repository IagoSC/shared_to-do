import { Repository } from "typeorm";
import { Task } from "../../database/entities/Task.entity";

export class GetAllTasksService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
