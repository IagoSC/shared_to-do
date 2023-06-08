import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskGroup } from "./TaskGroup.entity";

@Entity("tasks")
export class Task {
  constructor(title: string, description: string, groupId: string) {
    this.title = title;
    this.description = description;
    this.groupId = groupId;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ name: "group_id", type: "uuid" })
  groupId!: string;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.tasks)
  @JoinColumn()
  group!: TaskGroup;
}
