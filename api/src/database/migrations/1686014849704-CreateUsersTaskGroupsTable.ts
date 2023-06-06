import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTaskGroupsTable1686014849704
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users_task_groups" (
            "user_id" uuid NOT NULL,
            "task_group_id" uuid NOT NULL,
            UNIQUE ("user_id", "task_group_id"),
            CONSTRAINT "user_task_group_pk" PRIMARY KEY ("user_id", "task_group_id"),
            CONSTRAINT "user_fk_user_task_group" 
              FOREIGN KEY ("user_id") REFERENCES users ("id"),
            CONSTRAINT "task_group_fk_user_task_group" 
              FOREIGN KEY ("task_group_id") REFERENCES task_groups ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_task_groups");
  }
}
