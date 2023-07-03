import { AppError } from "../../utils/appError";
import { Repository, In } from "typeorm";
import { User } from "../../database/entities/User.entity";

export interface FindUsersByEmailDTO {
  users: string[];
}

export class FindUsersByEmailService {
  constructor(private userRepository: Repository<User>) {}

  async execute({ users }: FindUsersByEmailDTO): Promise<User[]> {
    return this.userRepository.find({
      where: { email: In(users) },
    });
  }
}
