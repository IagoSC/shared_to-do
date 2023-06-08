import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

interface IConstructorTaskGroup {
  name: string;
  description: string;
  users: User[];
  isDefault?: boolean;
}

@Entity("task_groups")
export class TaskGroup {
  constructor({
    name,
    description,
    users,
    isDefault = false,
  }: IConstructorTaskGroup) {
    this.name = name;
    this.description = description;
    this.isDefault = isDefault;
    this.users = users;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "is_default" })
  isDefault: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => Task, (task) => task.group)
  @JoinColumn()
  tasks?: Task[];

  @ManyToMany(() => User, (user) => user.taskGroups, { cascade: true })
  users!: User[];
}
