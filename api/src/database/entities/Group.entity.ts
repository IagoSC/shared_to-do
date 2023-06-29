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

interface IConstructorGroup {
  name: string;
  description: string;
  isDefault?: boolean;
}

@Entity("groups")
export class Group {
  constructor({ name, description, isDefault = false }: IConstructorGroup) {
    this.name = name;
    this.description = description;
    this.isDefault = isDefault;
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

  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  users!: User[];
}
