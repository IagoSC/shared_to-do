import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group.entity";

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

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({
    name: "users_groups",
    inverseJoinColumn: { name: "group_id", referencedColumnName: "id" },
    joinColumn: { name: "user_id", referencedColumnName: "id" },
  })
  groups?: Group[];
}
