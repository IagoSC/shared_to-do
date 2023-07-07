import { Repository, UpdateResult } from "typeorm";
import { Task } from "../../database/entities/Task.entity";

export interface SetTaskCompletionDTO {
  id: string;
  isFinished: boolean;
}

export class SetTaskCompletionService {
  constructor(private taskRepository: Repository<Task>) {}

  async execute({
    id,
    isFinished,
  }: SetTaskCompletionDTO): Promise<UpdateResult> {
    const finishedAt = isFinished ? new Date().toDateString() : null;
    const task = await this.taskRepository.update(
      { id },
      { isFinished, finishedAt: finishedAt ?? undefined }
    );
    return task;
  }
}
