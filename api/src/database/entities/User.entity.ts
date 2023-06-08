import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskGroup } from "./TaskGroup.entity";

@Entity("users")
export class User {
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToMany(() => TaskGroup, (taskGroup) => taskGroup.users)
  @JoinTable({
    name: "users_task_groups",
    inverseJoinColumn: { name: "task_group_id", referencedColumnName: "id" },
    joinColumn: { name: "user_id", referencedColumnName: "id" },
  })
  taskGroups?: TaskGroup[];
}
