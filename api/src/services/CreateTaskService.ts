import { Repository } from "typeorm";
import { Task } from "../database/entities/Task.entity";

export interface CreateTaskDTO {
  title: string;
  description: string;
}

export class CreateTaskService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute({ title, description }: CreateTaskDTO): Promise<Task> {
    const task = this.taskRepository.create({ title, description });
    const result = await this.taskRepository.insert(task);
    return task;
  }
}
