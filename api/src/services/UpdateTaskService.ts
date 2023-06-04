import { Repository, UpdateResult } from "typeorm";
import { Task } from "../database/entities/Task.entity";

export interface UpdateTaskDTO {
  id: string;
  title?: string;
  description?: string;
}

export class UpdateTaskService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute({
    id,
    title,
    description,
  }: UpdateTaskDTO): Promise<UpdateResult> {
    const task = this.taskRepository.update({ id }, { title, description });
    return task;
  }
}
