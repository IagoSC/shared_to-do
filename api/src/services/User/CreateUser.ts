import { Repository } from "typeorm";
import { User } from "../../database/entities/User.entity";

export interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUserService {
  constructor(private userRepository: Repository<User>) {}

  async execute({ name, email }: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({ name, email });
    await this.userRepository.insert(user);
    return user;
  }
}
