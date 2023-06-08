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
  isPrivate?: boolean;
}

@Entity("task_groups")
export class TaskGroup {
  constructor({ name, description, isPrivate = false }: IConstructorTaskGroup) {
    this.name = name;
    this.description = description;
    this.isPrivate = isPrivate;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("is_private")
  isPrivate: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Task, (task) => task.group)
  @JoinColumn()
  tasks?: Task[];

  @ManyToMany(() => User)
  @JoinColumn()
  users!: User[];
}
