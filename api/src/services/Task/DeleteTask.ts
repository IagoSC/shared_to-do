import { DeleteResult, Repository } from "typeorm";
import { Task } from "../../database/entities/Task.entity";

export interface DeleteTaskDTO {
  id: string;
}

export class DeleteTaskService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute({ id }: DeleteTaskDTO): Promise<DeleteResult> {
    const task = await this.taskRepository.delete(id);
    return task;
  }
}
