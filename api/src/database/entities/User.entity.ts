import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  email: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToMany(() => TaskGroup)
  @JoinColumn()
  taskGroups?: TaskGroup[];
}
