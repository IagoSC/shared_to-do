import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at!: Date;
}
